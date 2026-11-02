import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenHeader from "../../design-system/components/ScreenHeader";
import SGSectionHeader from "../../design-system/components/SGSectionHeader";
import useCareerLanguage from "../career/careerI18n";
import { CareerPage, LanguageBar, useCareerInterstitial } from "../career/careerUi";
import { byStatus, checkJob, STATUS } from "./eligibility";
import { openJob } from "./CoursesScreen";
import { JOB_CATEGORIES, JOBS, jobsForState } from "./jobsCatalog";
import { FollowedCountdowns, UpcomingDates } from "./ExamCountdown";
import JobRow from "./JobRow";
import SGSelect from "../../design-system/components/SGSelect";
import { BRANCHES, BSC_SUBJECTS, COURSES, goalProgress, INTER_GROUP_CHOICES, isProfileOutdated, JOB_EXAMS, STAGES } from "./jobsData";
import useJobStore from "./useJobStore";

const AGE_MIN = 17;
const AGE_MAX = 40;
const INTER_STAGES = [
  { id: "early", label: "First year of Inter" },
  { id: "final", label: "Second year of Inter" },
  { id: "completed", label: "Inter passed" },
];

const AGES = Array.from({ length: AGE_MAX - AGE_MIN + 1 }, (_, index) => AGE_MIN + index);

function ProfileForm({ initial, classValue, onSave, t }) {
  const isBTech = classValue === "BTech";
  const isInter = classValue === "Inter";
  const courses = COURSES.filter((item) => (classValue === "Degree" ? item.id !== "btech" : true));
  const [interGroup, setInterGroup] = useState(initial?.interGroup || null);
  const [course, setCourse] = useState(isBTech ? "btech" : isInter ? "inter" : initial?.course || null);
  const [branch, setBranch] = useState(initial?.branch || null);
  const [stage, setStage] = useState(initial?.stage || null);
  const [age, setAge] = useState(initial?.age ?? null);
  const branchChoices = course === "btech" ? BRANCHES : course === "bsc" ? BSC_SUBJECTS : null;
  const ready = course && stage && (!branchChoices || branch) && (!isInter || interGroup);
  const toOptions = (items) => items.map((item) => ({ value: item.id, label: t(item.label) }));

  return (
    <>
      <Text className="mb-4 text-[15px] leading-[22px] font-sg-medium text-sg-muted">
        {t("Tell us about your studies. We show only the jobs that fit.")}
      </Text>

      {isInter || isBTech ? null : (
        <SGSelect
          label={t("What are you studying?")}
          placeholder={t("Tap to choose")}
          value={course}
          options={toOptions(courses)}
          onChange={(next) => {
            setCourse(next);
            setBranch(null);
          }}
        />
      )}
      {branchChoices ? (
        <SGSelect
          label={t(course === "bsc" ? "Which subject?" : "Which branch?")}
          placeholder={t("Tap to choose")}
          value={branch}
          options={toOptions(branchChoices)}
          onChange={setBranch}
        />
      ) : null}
      <SGSelect
        label={t(isInter ? "Your Inter group" : "Your Inter group (optional)")}
        placeholder={t("Tap to choose")}
        value={interGroup}
        options={toOptions(INTER_GROUP_CHOICES)}
        onChange={setInterGroup}
      />
      <SGSelect
        label={t(isInter ? "Where are you in Inter?" : "Where are you in your degree?")}
        placeholder={t("Tap to choose")}
        value={stage}
        options={toOptions(isInter ? INTER_STAGES : STAGES)}
        onChange={setStage}
      />
      <SGSelect
        label={t("Your age (optional)")}
        placeholder={t("Used only on this phone, to check age limits.")}
        value={age}
        options={AGES.map((item) => ({ value: item, label: String(item) }))}
        onChange={setAge}
      />

      <Pressable
        disabled={!ready}
        onPress={() => onSave({ course, branch: branchChoices ? branch : null, interGroup, stage, age })}
        accessibilityRole="button"
        accessibilityState={{ disabled: !ready }}
        className={`mt-1 min-h-[56px] items-center justify-center rounded-[16px] px-4 ${ready ? "bg-[#F2B632]" : "bg-sg-bg2"}`}
      >
        <Text className={`text-[17px] font-sg-bold ${ready ? "text-[#14342A]" : "text-sg-muted"}`}>{t("See jobs for me")}</Text>
      </Pressable>
    </>
  );
}

export function GoalCard({ exam, goal, profile, onPress, t }) {
  const { done, total, percent } = goalProgress(exam, goal, profile);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="mb-2.5 rounded-[18px] p-4 active:opacity-90"
      style={{ backgroundColor: exam.color }}
    >
      <View className="flex-row items-center">
        <Text className="flex-1 text-[19px] leading-[26px] font-sg-display text-[#F4EFE2]">{exam.name}</Text>
        <Text className="text-[15px] font-sg-bold text-[#F4EFE2]">{percent}%</Text>
      </View>
      <View className="mt-2 h-2 overflow-hidden rounded-full bg-[#F4EFE2]/25">
        <View className="h-full rounded-full bg-[#F2B632]" style={{ width: `${percent}%` }} />
      </View>
      <Text className="mt-1.5 text-[13px] leading-[19px] font-sg-medium text-[#F4EFE2]">
        {t("{done} of {total} topics done", { done, total })}
      </Text>
    </Pressable>
  );
}

export default function JobsHomeScreen({ navigation, route }) {
  const { stateBoard, classValue, category: initialCategory } = route?.params || {};
  const { lang, t, setLanguage } = useCareerLanguage(stateBoard);
  const { ready, profile, goals, saveProfile } = useJobStore();
  const showAd = useCareerInterstitial();
  const [editing, setEditing] = useState(false);
  const [category, setCategory] = useState(initialCategory || null);
  const [showClosed, setShowClosed] = useState(false);
  const outdated = isProfileOutdated(profile, classValue);
  const showForm = ready && (!profile || editing || outdated);

  const open = (job) => {
    showAd();
    openJob(navigation, job, stateBoard);
  };
  const openExam = (exam) => open(JOBS.find((job) => job.examId === exam.id));
  const openCourses = () => {
    showAd();
    navigation.navigate("CoursesScreen", { stateBoard });
  };

  const stateJobs = jobsForState(stateBoard);
  const countOpen = (id) =>
    stateJobs.filter(
      (job) =>
        (!id || job.category === id) &&
        checkJob(job, profile, JOB_EXAMS.find((exam) => exam.id === job.examId)).status !== STATUS.NOT_ELIGIBLE
    ).length;
  const results = stateJobs
    .filter((job) => !category || job.category === category)
    .map((job) => ({ job, result: checkJob(job, profile, JOB_EXAMS.find((exam) => exam.id === job.examId)) }))
    .sort(byStatus);
  const openJobs = results.filter(({ result }) => result.status !== STATUS.NOT_ELIGIBLE);
  const closedJobs = results.filter(({ result }) => result.status === STATUS.NOT_ELIGIBLE);
  const courseLabel = profile?.course === "inter" ? "Inter" : COURSES.find((item) => item.id === profile?.course)?.label;
  const branchLabel = [...BRANCHES, ...BSC_SUBJECTS].find((item) => item.id === profile?.branch)?.label;
  const stageLabel = (profile?.course === "inter" ? INTER_STAGES : STAGES).find((item) => item.id === profile?.stage)?.label;
  const myGoals = JOB_EXAMS.filter((exam) => goals[exam.id]);

  return (
    <CareerPage>
      <ScreenHeader
        tone="teal"
        icon="briefcase"
        title={t("Your dream job")}
        subtitle={t("See which jobs you can apply for and prepare for them.")}
        right={<LanguageBar lang={lang} onChange={setLanguage} />}
      />

      {!ready ? null : showForm ? (
        <ProfileForm
          initial={outdated ? null : profile}
          classValue={classValue}
          t={t}
          onSave={(next) => {
            saveProfile(next);
            setEditing(false);
          }}
        />
      ) : (
        <>
          <View className="mb-5 flex-row items-center rounded-[18px] bg-sg-board px-4 py-3">
            <View className="flex-1 pr-2">
              <Text className="text-[16px] leading-[23px] font-sg-bold text-[#F4EFE2]">
                {[t(courseLabel), branchLabel ? t(branchLabel) : null].filter(Boolean).join(" · ")}
              </Text>
              <Text className="text-[13px] leading-[19px] font-sg-medium text-[#B5C6BB]">{t(stageLabel)}</Text>
            </View>
            <Pressable onPress={() => setEditing(true)} accessibilityRole="button" hitSlop={8} className="min-h-[44px] justify-center px-2">
              <Text className="text-[15px] font-sg-bold text-[#F2B632]">{t("Change")}</Text>
            </Pressable>
          </View>

          {myGoals.length ? (
            <>
              <SGSectionHeader title={t("My goals")} className="mb-3" />
              {myGoals.map((exam) => (
                <GoalCard key={exam.id} exam={exam} goal={goals[exam.id]} profile={profile} t={t} onPress={() => openExam(exam)} />
              ))}
              <View className="h-4" />
            </>
          ) : null}

          <FollowedCountdowns navigation={navigation} stateBoard={stateBoard} />
          <UpcomingDates
            jobs={stateJobs.filter(
              (job) => checkJob(job, profile, JOB_EXAMS.find((exam) => exam.id === job.examId)).status !== STATUS.NOT_ELIGIBLE
            )}
            onOpen={open}
            t={t}
          />

          <SGSectionHeader title={t("Jobs for you")} subtitle={t("Tap one to see who can apply")} className="mb-3" />
          <SGSelect
            sheetTitle={t("Jobs for you")}
            value={category}
            onChange={setCategory}
            options={[
              { value: null, label: t("All jobs"), hint: String(countOpen(null)) },
              ...JOB_CATEGORIES.filter((item) => countOpen(item.id)).map((item) => ({
                value: item.id,
                label: t(item.label),
                hint: String(countOpen(item.id)),
              })),
            ]}
          />

          {openJobs.map(({ job, result }) => (
            <JobRow key={job.id} job={job} result={result} t={t} onPress={() => open(job)} />
          ))}

          {closedJobs.length ? (
            <Pressable
              onPress={() => setShowClosed((value) => !value)}
              accessibilityRole="button"
              className="mb-2.5 min-h-[48px] flex-row items-center justify-center"
            >
              <Text className="text-[14px] font-sg-bold text-[#0F6E78]">
                {t(showClosed ? "Hide jobs not open to you" : "Show {count} jobs not open to you", { count: closedJobs.length })}
              </Text>
            </Pressable>
          ) : null}
          {showClosed
            ? closedJobs.map(({ job, result }) => <JobRow key={job.id} job={job} result={result} t={t} onPress={() => open(job)} />)
            : null}

          <Pressable
            onPress={openCourses}
            accessibilityRole="button"
            className="mt-2 min-h-[60px] flex-row items-center rounded-[18px] bg-[#F2B632] px-4 py-3 active:opacity-90"
          >
            <Ionicons name="school" size={24} color="#14342A" />
            <View className="mx-3 flex-1">
              <Text className="text-[16px] leading-[23px] font-sg-display text-[#14342A]">{t("All courses")}</Text>
              <Text className="text-[13px] leading-[19px] font-sg-semibold text-[#14342A]">
                {t("ITI, Polytechnic, Degree, B.Sc and B.Tech branches")}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#14342A" />
          </Pressable>
        </>
      )}
    </CareerPage>
  );
}
