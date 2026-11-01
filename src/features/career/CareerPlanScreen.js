import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenHeader from "../../design-system/components/ScreenHeader";
import SGSectionHeader from "../../design-system/components/SGSectionHeader";
import { CAREER_OPTIONS, optionName } from "./careerData";
import useCareerLanguage, { CAREER_LANGUAGES } from "./careerI18n";
import { BEST_BY_GROUP, CAREER_GOALS, GOAL_FIELDS, goalColor, INTER_GROUPS } from "./careerGoals";
import { CareerPage, useCareerInterstitial } from "./careerUi";

const GROUP_KEY = "career_inter_group";

const JOURNEY = [
  { icon: "flag", label: "10th" },
  { icon: "git-branch", label: "Inter or course" },
  { icon: "school", label: "Degree" },
  { icon: "briefcase", label: "Job" },
];

const optionById = (id) => CAREER_OPTIONS.find((item) => item.id === id);

// Lives in the header: it is set once, so it should not push the content down.
function LanguageBar({ lang, onChange }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="radiogroup"
      className="mt-4"
      style={{ marginHorizontal: -20 }}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    >
      {CAREER_LANGUAGES.map((item) => {
        const active = lang === item.key;
        return (
          <Pressable
            key={item.key}
            onPress={() => onChange(item.key)}
            accessibilityRole="radio"
            accessibilityState={{ checked: active }}
            className={`mr-2 min-h-[44px] justify-center rounded-[14px] px-3.5 ${
              active ? "bg-[#F4EFE2]" : "bg-[#14342A]/25"
            }`}
          >
            <Text className={`text-[15px] font-sg-bold ${active ? "text-[#0F6E78]" : "text-[#F4EFE2]"}`}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

// The most common student does not know yet, so this comes before everything else.
function HelpMeChoose({ onPress, t }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="mb-6 flex-row items-center rounded-[22px] bg-[#F2B632] p-5 active:opacity-90"
    >
      <View className="flex-1 pr-3">
        <Text className="text-[25px] leading-[32px] font-sg-display text-[#14342A]">{t("Help me choose")}</Text>
        <Text className="mt-1 text-[15px] leading-[22px] font-sg-semibold text-[#14342A]">
          {t("Answer 4 easy questions to see what may suit you")}
        </Text>
      </View>
      <View className="h-12 w-12 items-center justify-center rounded-full bg-[#14342A]">
        <Ionicons name="arrow-forward" size={24} color="#F2B632" />
      </View>
    </Pressable>
  );
}

// The whole road in one glance, marked at the student's own stop.
function Journey({ t }) {
  return (
    <View className="mb-7 rounded-[22px] bg-sg-surface px-2 pb-4 pt-5">
      <Text className="mb-4 px-3 text-[18px] leading-[25px] font-sg-display text-sg-text">{t("How it works")}</Text>
      <View className="flex-row">
        <View className="absolute left-[12.5%] right-[12.5%] h-[3px] rounded-full bg-sg-bg2" style={{ top: 18 }} />
        {JOURNEY.map((stop, index) => (
          <View key={stop.label} className="flex-1 items-center px-1">
            <View
              className={`h-10 w-10 items-center justify-center rounded-full ${
                index === 0 ? "bg-[#F2B632]" : "bg-sg-bg2"
              }`}
            >
              <Ionicons name={stop.icon} size={19} color={index === 0 ? "#14342A" : "#0F6E78"} />
            </View>
            <Text className="mt-2 text-center text-[13px] leading-[19px] font-sg-bold text-sg-text">{t(stop.label)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function GoalGrid({ goals, onOpen, t }) {
  return (
    <View className="flex-row flex-wrap justify-between">
      {goals.map((goal, index) => (
        <Pressable
          key={goal.id}
          onPress={() => onOpen(goal)}
          accessibilityRole="button"
          className={`mb-2.5 min-h-[96px] justify-between rounded-[18px] p-3.5 active:opacity-80 ${
            goals.length % 2 && index === goals.length - 1 ? "w-full" : "w-[48.5%]"
          }`}
          style={{ backgroundColor: goalColor(goal.id) }}
        >
          <Ionicons name={goal.icon} size={24} color="#F4EFE2" />
          <Text className="mt-2.5 text-[16px] leading-[22px] font-sg-display text-[#F4EFE2]">{t(goal.title)}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function OptionRow({ option, stateBoard, onPress, t }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      android_ripple={{ color: "rgba(29,42,36,0.06)" }}
      className="mb-2 min-h-[76px] flex-row items-center rounded-[18px] bg-sg-surface p-3 active:bg-sg-bg2"
    >
      <View className="h-12 w-12 items-center justify-center rounded-[14px]" style={{ backgroundColor: option.color }}>
        <Ionicons name={option.icon} size={23} color="#F4EFE2" />
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-[17px] leading-[24px] font-sg-display text-sg-text">{t(optionName(option, stateBoard))}</Text>
        <Text className="mt-0.5 text-[13px] leading-[19px] font-sg-medium text-sg-muted">{t(option.full)}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#5F6A63" />
    </Pressable>
  );
}

function GovtJobsCard({ onPress, t }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="mb-2 flex-row items-center rounded-[18px] bg-[#0F6E78] p-4 active:opacity-90"
    >
      <Ionicons name="shield-checkmark" size={30} color="#F2B632" />
      <View className="mx-3 flex-1">
        <Text className="text-[18px] leading-[25px] font-sg-display text-[#F4EFE2]">{t("Central government jobs")}</Text>
        <Text className="mt-0.5 text-[14px] leading-[20px] font-sg-medium text-[#F4EFE2]">
          {t("Jobs, age limits and who can apply")}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color="#F4EFE2" />
    </Pressable>
  );
}

function GroupLabel({ children }) {
  return <Text className="mb-2 mt-3 text-[15px] leading-[22px] font-sg-bold text-sg-muted">{children}</Text>;
}

function AfterTenth({ stateBoard, t, languageBar, go }) {
  const openGoal = (goal) => go("CareerGoalScreen", { goalId: goal.id, stateBoard, stage: "after10" });
  const row = (id) => (
    <OptionRow
      key={id}
      t={t}
      option={optionById(id)}
      stateBoard={stateBoard}
      onPress={() => go("CareerOptionScreen", { optionId: id, stateBoard })}
    />
  );

  return (
    <>
      <ScreenHeader
        tone="teal"
        eyebrow={t("After 10th")}
        title={t("Not sure what's next? That's normal.")}
        subtitle={t("Most students don't know yet. We'll make it simple.")}
      >
        {languageBar}
      </ScreenHeader>

      <HelpMeChoose t={t} onPress={() => go("CareerQuizScreen", { stateBoard })} />
      <Journey t={t} />

      <SGSectionHeader
        title={t("What do you want to become?")}
        subtitle={t("Tap one to see every step to get there")}
        className="mb-1"
      />
      {GOAL_FIELDS.map((field) => (
        <View key={field.title}>
          <GroupLabel>{t(field.title)}</GroupLabel>
          <GoalGrid goals={CAREER_GOALS.filter((goal) => field.goals.includes(goal.id))} onOpen={openGoal} t={t} />
        </View>
      ))}

      <SGSectionHeader
        title={t("All your choices after 10th")}
        subtitle={t("Tap one to learn what it means")}
        className="mb-1 mt-6"
      />
      <GroupLabel>{t("Inter groups")}</GroupLabel>
      {INTER_GROUPS.map(row)}
      <GroupLabel>{t("Job-focused courses")}</GroupLabel>
      {["polytechnic", "iti", "govt10"].map(row)}
      <GovtJobsCard t={t} onPress={() => go("CareerGovtJobsScreen", { stateBoard, classValue: "10thClass" })} />
    </>
  );
}

function AfterInter({ stateBoard, t, languageBar, go }) {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(GROUP_KEY)
      .then((saved) => {
        if (INTER_GROUPS.includes(saved)) setGroup(saved);
      })
      .catch(() => {});
  }, []);

  const chooseGroup = (id) => {
    setGroup(id);
    AsyncStorage.setItem(GROUP_KEY, id).catch(() => {});
  };

  const selected = optionById(group);
  const openGoal = (goal) => go("CareerGoalScreen", { goalId: goal.id, stateBoard, stage: "afterInter", group });
  const main = CAREER_GOALS.filter((goal) => (BEST_BY_GROUP[group] || []).includes(goal.id));
  const open = CAREER_GOALS.filter((goal) => goal.anyGroup && !main.includes(goal));

  return (
    <>
      <ScreenHeader
        tone="teal"
        eyebrow={t("After Inter")}
        title={t("Your group opens these doors.")}
        subtitle={t("Pick your Inter group to see only what's open to you.")}
      >
        {languageBar}
      </ScreenHeader>

      <Text className="mb-2.5 text-[20px] leading-[28px] font-sg-display text-sg-text">{t("Which group are you in?")}</Text>
      <View accessibilityRole="radiogroup" className="mb-6 flex-row flex-wrap">
        {INTER_GROUPS.map((id) => {
          const active = group === id;
          return (
            <Pressable
              key={id}
              onPress={() => chooseGroup(id)}
              accessibilityRole="radio"
              accessibilityState={{ checked: active }}
              className={`mb-2 mr-2 min-h-[48px] justify-center rounded-[14px] px-4 ${
                active ? "bg-[#F2B632]" : "bg-sg-board"
              }`}
            >
              <Text className={`text-[15px] font-sg-bold ${active ? "text-sg-board" : "text-[#F4EFE2]"}`}>
                {t(optionName(optionById(id), stateBoard))}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {selected ? (
        <>
          <SGSectionHeader title={t("Best matches for you")} subtitle={t("Tap one to see your next steps")} className="mb-3" />
          <GoalGrid goals={main} onOpen={openGoal} t={t} />

          <Pressable
            onPress={() => go("CareerOptionScreen", { optionId: group, stateBoard })}
            accessibilityRole="button"
            className="mb-6 mt-1 flex-row items-center rounded-[18px] bg-sg-board p-4 active:opacity-90"
          >
            <View className="flex-1 pr-2">
              <Text className="text-[19px] leading-[26px] font-sg-display text-[#F2B632]">
                {t("All courses after {group}", { group: optionName(selected, stateBoard) })}
              </Text>
              <Text className="mt-1 text-[14px] leading-[20px] font-sg-medium text-[#F4EFE2]">
                {t("With the exams to write and jobs you can get")}
              </Text>
            </View>
            <Ionicons name="arrow-forward-circle" size={34} color="#F2B632" />
          </Pressable>

          <SGSectionHeader title={t("Also open to you")} subtitle={t("These accept students from any group")} className="mb-3" />
          <GoalGrid goals={open} onOpen={openGoal} t={t} />

          <View className="mt-3">
            <GovtJobsCard t={t} onPress={() => go("CareerGovtJobsScreen", { stateBoard, classValue: "Inter" })} />
            <OptionRow
              t={t}
              option={optionById("govtInter")}
              stateBoard={stateBoard}
              onPress={() => go("CareerOptionScreen", { optionId: "govtInter", stateBoard })}
            />
          </View>
        </>
      ) : (
        <View className="items-center rounded-[18px] border border-dashed border-sg-text/20 px-5 py-8">
          <Ionicons name="arrow-up" size={26} color="#0F6E78" />
          <Text className="mt-2 text-center text-[15px] leading-[22px] font-sg-semibold text-sg-muted">
            {t("Pick your group above to see your options.")}
          </Text>
        </View>
      )}
    </>
  );
}

export default function CareerPlanScreen({ navigation, route }) {
  const { stateBoard, classValue } = route?.params || {};
  const { lang, t, setLanguage } = useCareerLanguage(stateBoard);
  const showAd = useCareerInterstitial();
  const go = (screen, params) => {
    showAd();
    navigation.navigate(screen, params);
  };
  const shared = { stateBoard, t, go, languageBar: <LanguageBar lang={lang} onChange={setLanguage} /> };

  return (
    <CareerPage>
      {classValue === "Inter" ? <AfterInter {...shared} /> : <AfterTenth {...shared} />}
    </CareerPage>
  );
}
