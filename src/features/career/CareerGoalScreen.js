import React from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenHeader from "../../design-system/components/ScreenHeader";
import SGEmptyState from "../../design-system/components/SGEmptyState";
import SGSectionHeader from "../../design-system/components/SGSectionHeader";
import { CAREER_OPTIONS, examName, optionName } from "./careerData";
import { CAREER_GOALS } from "./careerGoals";
import useCareerLanguage from "./careerI18n";
import { CareerPage, GoodToKnow } from "./careerUi";

function RouteStep({ step, stateBoard, marker, highlight, last, t }) {
  return (
    <View className="flex-row">
      <View className="w-10 items-center">
        <View
          className={`h-10 w-10 items-center justify-center rounded-[12px] ${
            highlight ? "bg-[#F2B632]" : "bg-sg-board"
          }`}
        >
          {typeof marker === "number" ? (
            <Text className="text-[16px] font-sg-display text-[#F2B632]">{marker}</Text>
          ) : (
            <Ionicons name={marker} size={20} color={highlight ? "#14342A" : "#F2B632"} />
          )}
        </View>
        {last ? null : <View className="my-1 w-[3px] flex-1 rounded-full bg-sg-board" />}
      </View>
      <View className={`ml-3 flex-1 ${last ? "" : "pb-5"}`}>
        <Text className="mt-1.5 text-[17px] leading-[24px] font-sg-display text-sg-text">{t(step.title)}</Text>
        {step.time ? <Text className="mt-0.5 text-[13px] font-sg-bold text-[#0F6E78]">{t(step.time)}</Text> : null}
        {step.detail ? (
          <Text className="mt-1 text-[14px] leading-[20px] font-sg-medium text-sg-muted">{t(step.detail)}</Text>
        ) : null}
        {step.exams ? (
          <View className="mt-2 flex-row flex-wrap">
            {step.exams.map((exam) => (
              <View key={exam} className="mb-1.5 mr-1.5 rounded-[10px] bg-sg-bg2 px-2.5 py-1.5">
                <Text className="text-[13px] font-sg-semibold text-sg-text">{t(examName(exam, stateBoard))}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

export default function CareerGoalScreen({ route }) {
  const { goalId, stateBoard, stage, group } = route?.params || {};
  const goal = CAREER_GOALS.find((item) => item.id === goalId);
  const { t } = useCareerLanguage(stateBoard);

  if (!goal) {
    return (
      <CareerPage contentClassName="px-4">
        <ScreenHeader tone="teal" title={t("Career plan")} />
        <SGEmptyState title={t("Career not found")} subtitle={t("Go back and pick another one.")} />
      </CareerPage>
    );
  }

  const inInter = stage === "afterInter";
  const fitsGroup = !inInter || goal.anyGroup || goal.groups.includes(group);
  const groupName = (id) => {
    const option = CAREER_OPTIONS.find((item) => item.id === id);
    return option ? optionName(option, stateBoard) : "";
  };
  // An Inter student has already made the group choice, so their route starts after it.
  const useAltRoute = inInter && goal.altSteps && !goal.groups.includes(group);
  const steps = useAltRoute
    ? goal.altSteps
    : inInter
    ? goal.steps.filter((step) => !step.isGroupStep)
    : goal.steps;
  const youAreHere = {
    title: !inInter
      ? "You are in 10th"
      : group
      ? t("You are in Inter ({group})", { group: groupName(group) })
      : "You are in Inter",
  };

  return (
    <CareerPage>
      <ScreenHeader
        tone="teal"
        icon={goal.icon}
        eyebrow={t("I want to become")}
        title={t(goal.title)}
        subtitle={t(goal.plain)}
      />

      {!fitsGroup ? (
        <View className="mb-5 flex-row rounded-[16px] bg-sg-dangerSoft p-4">
          <Ionicons name="alert-circle" size={20} color="#BF3F2B" />
          <Text className="ml-2.5 flex-1 text-[14px] leading-[20px] font-sg-semibold text-sg-text">
            {t("This route needs {groups} in Inter, so it may not be open with {group}. Go back to see the jobs open to you.", {
              groups: goal.groups.map(groupName).join(" / "),
              group: groupName(group),
            })}
          </Text>
        </View>
      ) : null}

      <SGSectionHeader title={t("Your route")} subtitle={t("Follow these steps in order")} className="mb-4" />
      <View className="mb-5">
        <RouteStep t={t} step={youAreHere} stateBoard={stateBoard} marker="location" highlight />
        {steps.map((step, index) => (
          <RouteStep
            t={t}
            key={step.title}
            step={step}
            stateBoard={stateBoard}
            marker={index === steps.length - 1 ? "trophy" : index + 1}
            last={index === steps.length - 1}
            highlight={index === steps.length - 1}
          />
        ))}
      </View>

      <GoodToKnow title={t("Good to know")} text={t(goal.backup)} />

      <Text className="mb-2 text-[13px] leading-[19px] font-sg-medium text-sg-muted">
        {t("Exams, eligibility and course rules change. Check the official website before you apply.")}
      </Text>
    </CareerPage>
  );
}
