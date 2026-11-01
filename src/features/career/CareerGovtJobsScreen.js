import React, { useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenHeader from "../../design-system/components/ScreenHeader";
import { GOVT_AGE_RULER, GOVT_JOBS, GOVT_LEVELS } from "./careerGovtJobs";
import useCareerLanguage from "./careerI18n";
import { CareerPage } from "./careerUi";

const percent = (age) =>
  ((age - GOVT_AGE_RULER.min) / (GOVT_AGE_RULER.max - GOVT_AGE_RULER.min)) * 100;

// The range on a shared 16 to 40 scale, so exams can be compared at a glance.
function AgeRuler({ min, max, color }) {
  return (
    <View
      className="mt-2.5"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View className="h-2.5 overflow-hidden rounded-full bg-sg-bg2">
        <View
          className="absolute bottom-0 top-0 rounded-full"
          style={{
            left: `${percent(min)}%`,
            width: `${percent(max) - percent(min)}%`,
            backgroundColor: color,
          }}
        />
      </View>
      <View className="mt-1 flex-row justify-between">
        <Text className="text-[12px] font-sg-medium text-sg-muted">{GOVT_AGE_RULER.min}</Text>
        <Text className="text-[12px] font-sg-medium text-sg-muted">{GOVT_AGE_RULER.max}</Text>
      </View>
    </View>
  );
}

function SectionLabel({ children }) {
  return <Text className="mb-1 text-[13px] font-sg-bold text-sg-muted">{children}</Text>;
}

function JobCard({ job, t }) {
  return (
    <View className="mb-4 overflow-hidden rounded-[22px] bg-sg-surface">
      <View className="px-4 py-4" style={{ backgroundColor: job.color }}>
        <Text className="text-[23px] leading-[29px] font-sg-display text-[#F4EFE2]">{job.exam}</Text>
      </View>

      <View className="px-4 pb-1 pt-4">
        <View className="mb-4">
          <SectionLabel>{t("Age")}</SectionLabel>
          <Text className="text-[18px] leading-[26px] font-sg-bold text-sg-text">{t(job.age)}</Text>
          <AgeRuler min={job.ageMin} max={job.ageMax} color={job.color} />
        </View>

        <View className="mb-4">
          <SectionLabel>{t("Who can apply")}</SectionLabel>
          <Text className="text-[16px] leading-[24px] font-sg-semibold text-sg-text">{t(job.who)}</Text>
        </View>

        <SectionLabel>{t("Jobs")}</SectionLabel>
        {/* Rows, not chips: Android under-measures Indic text in shrink-to-fit chips and clips it. */}
        <View className="mb-3 mt-0.5">
          {job.jobs.map((item) => (
            <View key={item} className="mb-1 flex-row items-start">
              <Ionicons name="checkmark-circle" size={18} color="#1C7C55" style={{ marginTop: 2 }} />
              <Text className="ml-2 flex-1 text-[16px] leading-[23px] font-sg-semibold text-sg-text">{t(item)}</Text>
            </View>
          ))}
        </View>

        {job.note ? (
          <View className="mb-3 flex-row rounded-[14px] bg-[#FBF0D0] p-3">
            <Ionicons name="bulb" size={18} color="#8A5B00" style={{ marginTop: 2 }} />
            <Text className="ml-2 flex-1 text-[14px] leading-[21px] font-sg-medium text-sg-text">
              {t(job.note)}
            </Text>
          </View>
        ) : null}
      </View>

      <Pressable
        onPress={() => Linking.openURL(job.site).catch(() => {})}
        accessibilityRole="link"
        accessibilityLabel={`${t("Official website")}: ${job.site.replace("https://", "")}`}
        className="min-h-[52px] flex-row items-center border-t border-sg-border px-4 py-2.5 active:opacity-70"
      >
        <View className="flex-1 pr-2">
          <Text className="text-[13px] font-sg-bold text-sg-muted">{t("Official website")}</Text>
          <Text className="text-[14px] font-sg-bold text-[#0F6E78]">{job.site.replace("https://", "")}</Text>
        </View>
        <Ionicons name="open-outline" size={20} color="#0F6E78" />
      </Pressable>
    </View>
  );
}

export default function CareerGovtJobsScreen({ route }) {
  const { stateBoard, classValue } = route?.params || {};
  const { t } = useCareerLanguage(stateBoard);
  const [level, setLevel] = useState(classValue === "Inter" ? "inter" : "10th");

  return (
    <CareerPage>
        <ScreenHeader
          tone="teal"
          icon="shield-checkmark"
          title={t("Central government jobs")}
          subtitle={t("Jobs, age limits and who can apply")}
        />

        <Text className="mb-2.5 text-[18px] leading-[25px] font-sg-display text-sg-text">
          {t("See the jobs open with")}
        </Text>
        <View
          accessibilityRole="radiogroup"
          className="mb-5 flex-row rounded-[18px] bg-sg-board p-1.5"
        >
          {GOVT_LEVELS.map((item) => {
            const active = level === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setLevel(item.id)}
                accessibilityRole="radio"
                accessibilityState={{ checked: active }}
                className={`min-h-[52px] flex-1 items-center justify-center rounded-[13px] px-1.5 ${
                  active ? "bg-[#F2B632]" : ""
                }`}
              >
                <Text
                  className={`text-center text-[14px] leading-[20px] font-sg-bold ${
                    active ? "text-sg-board" : "text-[#F4EFE2]"
                  }`}
                >
                  {t(item.label)}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {GOVT_JOBS.filter((job) => job.level === level).map((job) => (
          <JobCard key={job.exam} job={job} t={t} />
        ))}

        <Text className="mb-2 mt-1 text-[13px] leading-[20px] font-sg-medium text-sg-muted">
          {t("Ages are for the general category. SC/ST usually get 5 extra years and OBC 3.")}
        </Text>
        <Text className="text-[13px] leading-[20px] font-sg-medium text-sg-muted">
          {t("Rules change every year. Always read the official notification before you apply. Last checked: November 2026.")}
        </Text>
    </CareerPage>
  );
}
