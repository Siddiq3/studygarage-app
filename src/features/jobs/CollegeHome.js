import React from "react";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import SGSectionHeader from "../../design-system/components/SGSectionHeader";
import useCareerLanguage from "../career/careerI18n";
import { useCareerInterstitial } from "../career/careerUi";
import { checkJob, STATUS } from "./eligibility";
import { JOB_CATEGORIES, jobsForState } from "./jobsCatalog";
import { goalProgress, isProfileOutdated, JOB_EXAMS, PRACTICE_ENABLED } from "./jobsData";
import { FollowedCountdowns } from "./ExamCountdown";
import { GoalCard } from "./JobsHomeScreen";
import useJobStore from "./useJobStore";

// One clear next step: set up, choose a goal, or carry on with the goal already started.
export function CollegeHero({ navigation, stateBoard, classValue }) {
  const { t } = useCareerLanguage(stateBoard);
  const { ready, profile, goals } = useJobStore();
  const hasProfile = profile && !isProfileOutdated(profile, classValue);
  const goalExam = hasProfile ? JOB_EXAMS.find((exam) => goals[exam.id]) : null;
  const progress = goalExam ? goalProgress(goalExam, goals[goalExam.id], profile) : null;

  const open = () =>
    goalExam
      ? navigation.navigate("JobDetailScreen", { examId: goalExam.id, stateBoard })
      : navigation.navigate("JobsHomeScreen", { stateBoard, classValue });

  const title = goalExam ? goalExam.name : hasProfile ? "Pick a job to prepare for" : "Find your dream job";
  const detail = goalExam
    ? t("{done} of {total} topics done", progress)
    : hasProfile
    ? "Add one or more jobs as your goals and track each syllabus."
    : "Tell us what you study and see the jobs you can apply for.";
  const action = goalExam ? "Continue preparing" : hasProfile ? "See jobs for me" : "Get started";

  return (
    <View className="mt-1" style={{ opacity: ready ? 1 : 0 }}>
      <Text className="text-[34px] leading-[42px] font-sg-display tracking-[-0.7px] text-[#F4EFE2]">{t(title)}</Text>
      <Text className="mt-1.5 text-[15px] leading-[22px] font-sg-medium text-[#B5C6BB]">{t(detail)}</Text>
      {goalExam ? (
        <View className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#F4EFE2]/16">
          <View className="h-full rounded-full bg-[#F2B632]" style={{ width: `${progress.percent}%` }} />
        </View>
      ) : null}
      <Pressable
        onPress={open}
        accessibilityRole="button"
        className="mt-4 min-h-[52px] flex-row items-center justify-center rounded-[14px] bg-[#F2B632] px-4 active:opacity-90"
      >
        <Text className="text-[16px] font-sg-bold text-[#14342A]">{t(action)}</Text>
        <Ionicons name="arrow-forward" size={18} color="#14342A" style={{ marginLeft: 8 }} />
      </Pressable>
      {goalExam && PRACTICE_ENABLED ? (
        <Pressable
          onPress={() => navigation.navigate("JobDetailScreen", { examId: goalExam.id, stateBoard, initialTab: "practice" })}
          accessibilityRole="button"
          className="mt-2 min-h-[48px] flex-row items-center justify-center rounded-[14px] border border-[#F4EFE2]/30 px-4 active:opacity-70"
        >
          <Ionicons name="flash" size={16} color="#F2B632" />
          <Text className="ml-2 text-[15px] font-sg-bold text-[#F4EFE2]">{t("Practice quiz and earn coins")}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function CollegeBody({ navigation, stateBoard, classValue, onCommunity, promo }) {
  const { t } = useCareerLanguage(stateBoard);
  const { profile, goals } = useJobStore();
  const showAd = useCareerInterstitial();
  const hasProfile = profile && !isProfileOutdated(profile, classValue);

  const open = (exam) => {
    showAd();
    navigation.navigate("JobDetailScreen", { examId: exam.id, stateBoard });
  };
  const openCategory = (category) => {
    showAd();
    navigation.navigate("JobsHomeScreen", { stateBoard, classValue, category });
  };

  const goalExams = hasProfile ? JOB_EXAMS.filter((exam) => goals[exam.id]) : [];

  const tiles = JOB_CATEGORIES.map((category) => ({
    category,
    count: jobsForState(stateBoard).filter((job) => job.category === category.id).filter((job) => {
      const { status } = checkJob(job, profile, JOB_EXAMS.find((exam) => exam.id === job.examId));
      return status !== STATUS.NOT_ELIGIBLE;
    }).length,
  })).filter((tile) => tile.count);

  return (
    <>
      <FollowedCountdowns navigation={navigation} stateBoard={stateBoard} />

      {/* The first goal is already the hero, so only the others are repeated here. */}
      {goalExams.length > 1 ? (
        <View className="mb-4">
          <SGSectionHeader title={t("My goals")} className="mb-3" />
          {goalExams.slice(1).map((exam) => (
            <GoalCard key={exam.id} exam={exam} goal={goals[exam.id]} profile={profile} t={t} onPress={() => open(exam)} />
          ))}
        </View>
      ) : null}

      {hasProfile ? (
        <View className="mb-4">
          <SGSectionHeader title={t("Jobs for you")} subtitle={t("Tap one to see who can apply")} className="mb-3" />
          <View className="flex-row flex-wrap justify-between">
            {tiles.map(({ category, count }, index) => {
              return (
                <Pressable
                  key={category.id}
                  onPress={() => openCategory(category.id)}
                  accessibilityRole="button"
                  className={`mb-2.5 min-h-[96px] justify-between rounded-[18px] p-3.5 active:opacity-80 ${
                    tiles.length % 2 && index === tiles.length - 1 ? "w-full" : "w-[48.5%]"
                  }`}
                  style={{ backgroundColor: category.color }}
                >
                  <Ionicons name={category.icon} size={24} color="#F4EFE2" />
                  <View className="mt-2">
                    <Text className="text-[16px] leading-[22px] font-sg-display text-[#F4EFE2]">{t(category.label)}</Text>
                    <Text className="text-[13px] leading-[19px] font-sg-medium text-[#F4EFE2]">{t("{count} jobs", { count })}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : null}

      <Pressable
        onPress={() => navigation.navigate("CoursesScreen", { stateBoard })}
        accessibilityRole="button"
        className="mb-4 min-h-[56px] flex-row items-center rounded-[16px] bg-[#F2B632] px-4 active:opacity-90"
      >
        <Ionicons name="school" size={20} color="#14342A" />
        <Text className="ml-2.5 flex-1 text-[15px] font-sg-bold text-[#14342A]">{t("All courses")}</Text>
        <Ionicons name="arrow-forward" size={18} color="#14342A" />
      </Pressable>

      {promo}

      <Pressable
        onPress={onCommunity}
        accessibilityRole="button"
        className="mb-4 min-h-[56px] flex-row items-center rounded-[16px] bg-sg-surface px-4 active:opacity-80"
      >
        <Ionicons name="logo-whatsapp" size={20} color="#17694F" />
        <Text className="ml-2.5 flex-1 text-[15px] font-sg-bold text-sg-text">{t("Join the community")}</Text>
        <Ionicons name="arrow-forward" size={18} color="#5F6A63" />
      </Pressable>
    </>
  );
}
