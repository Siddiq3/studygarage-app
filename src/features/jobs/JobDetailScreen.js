import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Linking, Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenHeader from "../../design-system/components/ScreenHeader";
import SGEmptyState from "../../design-system/components/SGEmptyState";
import { useStreak } from "../../services/streak/useStreak";
import { buildJobsIndexUrl } from "../../utils/quizDataUrl";
import useCareerLanguage from "../career/careerI18n";
import { CareerPage, GoodToKnow } from "../career/careerUi";
import { checkJob, STATUS } from "./eligibility";
import { JOBS } from "./jobsCatalog";
import { examSyllabus, JOB_EXAMS, PRACTICE_ENABLED, topicKey } from "./jobsData";
import { ExamCountdownCard } from "./ExamCountdown";
import JobStatsCard from "./JobStatsCard";
import StatusPill from "./StatusPill";
import useJobStore from "./useJobStore";

const TABS = [
  { id: "about", label: "About" },
  { id: "syllabus", label: "Syllabus" },
  { id: "pattern", label: "Exam pattern" },
  { id: "practice", label: "Practice" },
];

const STATUS_DETAIL = {
  [STATUS.ELIGIBLE_NOW]: "Your degree meets the rule. Check the official notice for the current cycle before you apply.",
  [STATUS.FINAL_YEAR]: "You can apply in final year, but your result must be declared by the cut-off date.",
  [STATUS.AFTER_RESULT]: "You can apply once your final result is declared, on or before the cut-off date.",
  [STATUS.LATER]: "You can start preparing now. You can apply once you meet the degree rule.",
  [STATUS.AGE_LIMIT]: "This uses the general category limit. Other categories may get extra years, so check the notice.",
  [STATUS.AFTER_DEGREE]: "You need a degree for this job, so it opens after you finish one.",
  [STATUS.NOT_ELIGIBLE]: "This exam needs a specific degree or branch.",
  [STATUS.UNVERIFIED]: "We have not confirmed the official rules for this exam yet, so please read the official notice.",
};

function Fact({ label, value }) {
  return (
    <View className="mb-4">
      <Text className="text-[13px] leading-[19px] font-sg-bold text-sg-muted">{label}</Text>
      <Text className="mt-0.5 text-[16px] leading-[24px] font-sg-semibold text-sg-text">{value}</Text>
    </View>
  );
}

function About({ exam, result, t }) {
  return (
    <>
      <View className="mb-4 rounded-[18px] bg-sg-surface p-4">
        <Fact label={t("Age")} value={t(exam.ageText)} />
        <Fact label={t("Last cut-off date for your degree")} value={exam.cutoff} />
        <Fact label={t("Based on")} value={exam.notice} />
        {result.posts.length ? (
          <View className="mb-2">
            <Text className="mb-1 text-[13px] leading-[19px] font-sg-bold text-sg-muted">{t("Posts open with your degree")}</Text>
            {result.posts.map((post) => (
              <View key={post.org} className="mb-1 flex-row items-start">
                <Ionicons name="checkmark-circle" size={18} color="#1C7C55" style={{ marginTop: 2 }} />
                <Text className="ml-2 flex-1 text-[15px] leading-[22px] font-sg-semibold text-sg-text">
                  {post.org} ({t("up to {age} years", { age: post.age })})
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
      <JobStatsCard jobId={exam.id} t={t} />
      {result.needsBranchCheck ? (
        <GoodToKnow
          title={t("Check your branch")}
          text={t("The notice says Electrical Engineering. Confirm that your EEE degree is accepted before you apply.")}
        />
      ) : null}
      {exam.notes.map((note) => (
        <GoodToKnow key={note} title={t("Good to know")} text={t(note)} />
      ))}
    </>
  );
}

function Syllabus({ exam, profile, done, onToggle, t }) {
  const parts = examSyllabus(exam, profile);
  const total = parts.reduce((sum, part) => sum + part.topics.length, 0);
  const count = parts.reduce((sum, part) => sum + part.topics.filter((topic) => done[topicKey(part.title, topic)]).length, 0);

  return (
    <>
      <Text className="mb-1 text-[15px] leading-[22px] font-sg-bold text-sg-text">
        {t("{done} of {total} topics done", { done: count, total })}
      </Text>
      <View className="mb-4 h-2.5 overflow-hidden rounded-full bg-sg-bg2">
        <View className="h-full rounded-full" style={{ backgroundColor: exam.color, width: `${total ? (count / total) * 100 : 0}%` }} />
      </View>
      {parts.map((part) => (
        <View key={part.title} className="mb-4 overflow-hidden rounded-[18px] bg-sg-surface">
          <View className="px-4 py-3" style={{ backgroundColor: exam.color }}>
            <Text className="text-[17px] leading-[24px] font-sg-display text-[#F4EFE2]">{part.title}</Text>
          </View>
          {part.topics.map((topic) => {
            const key = topicKey(part.title, topic);
            const checked = Boolean(done[key]);
            return (
              <Pressable
                key={topic}
                onPress={() => onToggle(key)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked }}
                className="min-h-[48px] flex-row items-center border-t border-sg-border px-4 py-2 active:bg-sg-bg2"
              >
                <Ionicons name={checked ? "checkbox" : "square-outline"} size={22} color={checked ? "#1C7C55" : "#5F6A63"} />
                <Text className="ml-3 flex-1 text-[15px] leading-[22px] font-sg-medium text-sg-text">{topic}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </>
  );
}

function Pattern({ exam, t }) {
  return exam.pattern.map((stage) => (
    <View key={stage.title} className="mb-4 overflow-hidden rounded-[18px] bg-sg-surface">
      <View className="px-4 py-3" style={{ backgroundColor: exam.color }}>
        <Text className="text-[17px] leading-[24px] font-sg-display text-[#F4EFE2]">{stage.title}</Text>
      </View>
      <View className="p-4 pb-2">
        {stage.rows.map((row) => (
          <Text key={row} className="mb-2 text-[15px] leading-[22px] font-sg-medium text-sg-text">{row}</Text>
        ))}
        {stage.time ? <Fact label={t("Time")} value={stage.time} /> : null}
        {stage.negative ? <Fact label={t("Negative marking")} value={stage.negative} /> : null}
      </View>
    </View>
  ));
}

function Practice({ exam, history, stateBoard, navigation, t }) {
  const { markDailyQuizCompleted } = useStreak();
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    let active = true;
    fetch(buildJobsIndexUrl(exam.id))
      .then((response) => (response.ok ? response.json() : { results: [] }))
      .then((data) => active && setTopics(Array.isArray(data?.results) ? data.results : []))
      .catch(() => active && setTopics([]));
    return () => {
      active = false;
    };
  }, [exam.id]);

  if (!topics) return <ActivityIndicator color="#0F6E78" style={{ marginVertical: 24 }} />;
  if (!topics.length) {
    return (
      <SGEmptyState
        title={t("Practice questions are coming soon")}
        subtitle={t("We publish questions only after a person has checked them.")}
      />
    );
  }

  const start = (topic) => {
    markDailyQuizCompleted().catch(() => {});
    navigation.navigate("Quiz", {
      stateBoard,
      subject: topic.subject,
      chapter: topic.chapter,
      chapterSlug: topic.slug,
      chapterFile: topic.file,
      jobExamId: exam.id,
    });
  };

  return (
    <>
      <Text className="mb-3 text-[14px] leading-[21px] font-sg-medium text-sg-muted">
        {t("Original practice questions checked by a person. These are not past exam questions.")}
      </Text>
      {topics.map((topic) => {
        const last = [...history].reverse().find((item) => item.chapter === topic.chapter && item.subject === topic.subject);
        return (
          <Pressable
            key={`${topic.subject}-${topic.slug}`}
            onPress={() => start(topic)}
            accessibilityRole="button"
            className="mb-2.5 min-h-[72px] flex-row items-center rounded-[18px] bg-sg-surface p-4 active:bg-sg-bg2"
          >
            <View className="flex-1 pr-2">
              <Text className="text-[17px] leading-[24px] font-sg-display text-sg-text">{topic.chapter}</Text>
              <Text className="text-[13px] leading-[19px] font-sg-medium text-sg-muted">{topic.subject}</Text>
              {last ? (
                <Text className="mt-0.5 text-[13px] leading-[19px] font-sg-bold text-[#1C7C55]">
                  {t("Last time: {correct} correct, {incorrect} wrong", last)}
                </Text>
              ) : null}
            </View>
            <Ionicons name="play-circle" size={34} color={exam.color} />
          </Pressable>
        );
      })}
    </>
  );
}

function OfficialSource({ exam, t }) {
  return (
    <Pressable
      onPress={() => Linking.openURL(exam.source).catch(() => {})}
      accessibilityRole="link"
      className="mb-3 min-h-[52px] flex-row items-center rounded-[16px] bg-sg-surface px-4 py-3 active:opacity-70"
    >
      <View className="flex-1 pr-2">
        <Text className="text-[15px] font-sg-bold text-[#0F6E78]">{t("Read the official notice")}</Text>
        {exam.lastVerified ? (
          <Text className="mt-0.5 text-[13px] leading-[19px] font-sg-medium text-sg-muted">
            {t("Last verified: {date}", { date: exam.lastVerified })}
          </Text>
        ) : null}
      </View>
      <Ionicons name="open-outline" size={20} color="#0F6E78" />
    </Pressable>
  );
}

export default function JobDetailScreen({ navigation, route }) {
  const { examId, stateBoard, initialTab, previewProfile } = route?.params || {};
  const { t } = useCareerLanguage(stateBoard);
  const { profile, goals, addGoal, removeGoal, toggleTopic } = useJobStore();
  const [tab, setTab] = useState(initialTab || "about");
  const exam = JOB_EXAMS.find((item) => item.id === examId);

  if (!exam) {
    return (
      <CareerPage contentClassName="px-4">
        <ScreenHeader tone="teal" title={t("Your dream job")} />
        <SGEmptyState title={t("Job not found")} subtitle={t("Go back and pick another one.")} />
      </CareerPage>
    );
  }

  const result = checkJob(JOBS.find((item) => item.examId === exam.id), previewProfile || profile, exam);
  const goal = goals[exam.id];
  const canPlan = !previewProfile && exam.verified && result.status !== STATUS.NOT_ELIGIBLE;

  const toggleGoal = () => {
    if (!goal) {
      addGoal(exam.id);
      return;
    }
    if (!Object.keys(goal.topicsDone).length) {
      removeGoal(exam.id);
      return;
    }
    Alert.alert(t("Remove this goal?"), t("Your syllabus progress for this job will be deleted."), [
      { text: t("Keep goal"), style: "cancel" },
      { text: t("Remove"), style: "destructive", onPress: () => removeGoal(exam.id) },
    ]);
  };

  return (
    <CareerPage>
      <ScreenHeader tone="teal" icon={exam.icon} title={exam.name} subtitle={t(exam.full)} />

      <StatusPill status={result.status} t={t} />
      <Text className="mb-4 mt-2 text-[15px] leading-[22px] font-sg-medium text-sg-text">{t(STATUS_DETAIL[result.status])}</Text>
      <Text className="mb-4 text-[15px] leading-[22px] font-sg-medium text-sg-muted">{t(exam.about)}</Text>

      <ExamCountdownCard jobId={exam.id} t={t} />

      {canPlan ? (
        <Pressable
          onPress={toggleGoal}
          accessibilityRole="button"
          className={`mb-5 min-h-[52px] flex-row items-center justify-center rounded-[16px] px-4 ${goal ? "bg-sg-bg2" : "bg-sg-board"}`}
        >
          <Ionicons name={goal ? "flag" : "flag-outline"} size={18} color={goal ? "#1D2A24" : "#F2B632"} />
          <Text className={`ml-2 text-[16px] font-sg-bold ${goal ? "text-sg-text" : "text-[#F2B632]"}`}>
            {t(goal ? "Remove from my goals" : "Add to my goals")}
          </Text>
        </Pressable>
      ) : null}

      {exam.verified ? (
        <>
          <View accessibilityRole="tablist" className="mb-5 flex-row rounded-[18px] bg-sg-board p-1.5">
            {TABS.filter((item) => PRACTICE_ENABLED || item.id !== "practice").map((item) => {
              const active = tab === item.id;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => setTab(item.id)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: active }}
                  className={`min-h-[52px] flex-1 items-center justify-center rounded-[13px] px-1 ${active ? "bg-[#F2B632]" : ""}`}
                >
                  <Text className={`text-center text-[13px] leading-[19px] font-sg-bold ${active ? "text-sg-board" : "text-[#F4EFE2]"}`}>
                    {t(item.label)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {tab === "about" ? <About exam={exam} result={result} t={t} /> : null}
          {tab === "syllabus" ? (
            <Syllabus
              exam={exam}
              profile={profile}
              done={goal?.topicsDone || {}}
              onToggle={(key) => toggleTopic(exam.id, key)}
              t={t}
            />
          ) : null}
          {tab === "pattern" ? <Pattern exam={exam} t={t} /> : null}
          {tab === "practice" ? (
            <Practice exam={exam} history={goal?.quizHistory || []} stateBoard={stateBoard} navigation={navigation} t={t} />
          ) : null}
        </>
      ) : null}

      {exam.verified ? null : <JobStatsCard jobId={exam.id} t={t} />}
      <OfficialSource exam={exam} t={t} />
    </CareerPage>
  );
}
