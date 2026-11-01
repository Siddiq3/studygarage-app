import React from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenHeader from "../../design-system/components/ScreenHeader";
import SGEmptyState from "../../design-system/components/SGEmptyState";
import SGSectionHeader from "../../design-system/components/SGSectionHeader";
import { CAREER_OPTIONS, examName, optionName } from "./careerData";
import useCareerLanguage from "./careerI18n";
import { CareerPage, GoodToKnow } from "./careerUi";

function Chip({ label }) {
  return (
    <View className="mb-1.5 mr-1.5 rounded-[10px] bg-sg-bg2 px-2.5 py-1.5">
      <Text className="text-[13px] font-sg-semibold text-sg-text">{label}</Text>
    </View>
  );
}

function PathCard({ path, stateBoard, color, t }) {
  return (
    <View className="mb-4 overflow-hidden rounded-[22px] bg-sg-surface">
      <View className="px-4 py-3" style={{ backgroundColor: color }}>
        <Text className="text-[19px] leading-[26px] font-sg-display text-[#F4EFE2]">
          {t(path.name)}
        </Text>
        <Text className="mt-0.5 text-[13px] font-sg-medium text-[#F4EFE2]">
          {t(path.years)}
        </Text>
      </View>
      <View className="p-4">
        <Text className="mb-2 text-[14px] font-sg-bold text-sg-text">
          {t("How you get in")}
        </Text>
        <View className="flex-row flex-wrap">
          {path.exams.map((exam) => (
            <Chip key={exam} label={t(examName(exam, stateBoard))} />
          ))}
        </View>
        <Text className="mb-2 mt-2.5 text-[14px] font-sg-bold text-sg-text">
          {t("Jobs you can get")}
        </Text>
        {path.jobs.map((job) => (
          <View key={job} className="mb-1 flex-row items-start">
            <Ionicons name="checkmark-circle" size={18} color="#1C7C55" style={{ marginTop: 2 }} />
            <Text className="ml-2 flex-1 text-[15px] leading-[22px] font-sg-semibold text-sg-text">{t(job)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function CareerOptionScreen({ route }) {
  const { optionId, stateBoard } = route?.params || {};
  const option = CAREER_OPTIONS.find((item) => item.id === optionId);
  const { t } = useCareerLanguage(stateBoard);

  if (!option) {
    return (
      <CareerPage contentClassName="px-4">
        <ScreenHeader tone="teal" title={t("Career plan")} />
        <SGEmptyState title={t("Option not found")} subtitle={t("Go back and pick another option.")} />
      </CareerPage>
    );
  }

  return (
    <CareerPage>
      <ScreenHeader
        tone="teal"
        icon={option.icon}
        eyebrow={t(option.duration)}
        title={t(optionName(option, stateBoard))}
        subtitle={t(option.full)}
      />

      <Text className="mb-5 text-[17px] leading-[25px] font-sg-semibold text-sg-text">
        {t(option.plain)}
      </Text>

      <SGSectionHeader title={t("Good for you if")} className="mb-2" />
      <View className="mb-5">
        {option.goodIf.map((line) => (
          <View key={line} className="mb-1.5 flex-row items-start">
            <Ionicons name="checkmark-circle" size={19} color="#1C7C55" style={{ marginTop: 1 }} />
            <Text className="ml-2 flex-1 text-[15px] leading-[21px] font-sg-medium text-sg-text">
              {t(line)}
            </Text>
          </View>
        ))}
      </View>

      <SGSectionHeader title={t("Where it can take you")} className="mb-3" />
      {option.paths.map((path) => (
        <PathCard
          key={t(path.name)}
          path={path}
          stateBoard={stateBoard}
          color={option.color}
          t={t}
        />
      ))}

      <GoodToKnow title={t("Good to know")} text={t(option.headsUp)} />

      <Text className="mb-2 text-[13px] leading-[19px] font-sg-medium text-sg-muted">
        {t("Exams, eligibility and course rules change. Check the official website before you apply.")}
      </Text>
    </CareerPage>
  );
}
