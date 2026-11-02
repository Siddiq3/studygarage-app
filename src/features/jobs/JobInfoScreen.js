import React from "react";
import { Linking, Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenHeader from "../../design-system/components/ScreenHeader";
import useCareerLanguage from "../career/careerI18n";
import { CareerPage, GoodToKnow } from "../career/careerUi";
import { checkJob, STATUS } from "./eligibility";
import { JOB_CATEGORIES, JOBS } from "./jobsCatalog";
import { ExamCountdownCard } from "./ExamCountdown";
import JobStatsCard from "./JobStatsCard";
import StatusPill from "./StatusPill";
import useJobStore from "./useJobStore";

function Fact({ label, value }) {
  return (
    <View className="mb-4">
      <Text className="text-[13px] leading-[19px] font-sg-bold text-sg-muted">{label}</Text>
      <Text className="mt-0.5 text-[16px] leading-[24px] font-sg-semibold text-sg-text">{value}</Text>
    </View>
  );
}

export default function JobInfoScreen({ route }) {
  const { jobId, stateBoard, previewProfile } = route?.params || {};
  const { t } = useCareerLanguage(stateBoard);
  const { profile } = useJobStore();
  const job = JOBS.find((item) => item.id === jobId);
  const result = checkJob(job, previewProfile || profile);
  const category = JOB_CATEGORIES.find((item) => item.id === job.category);

  return (
    <CareerPage>
      <ScreenHeader tone="teal" icon={category.icon} eyebrow={t(category.label)} title={t(job.name)} subtitle={t(job.full)} />
      <StatusPill status={result.status} t={t} />
      <View className="h-4" />
      <ExamCountdownCard jobId={job.id} t={t} />
      <View className="mb-4 rounded-[18px] bg-sg-surface p-4 pb-1">
        {job.qual ? <Fact label={t("Who can apply")} value={t(job.qual)} /> : null}
        {job.ageText ? <Fact label={t("Age")} value={t(job.ageText)} /> : null}
        {job.skills ? <Fact label={t("Skills companies look for")} value={t(job.skills)} /> : null}
        <Fact label={t("Jobs")} value={job.roles.map((role) => t(role)).join(", ")} />
      </View>

      <JobStatsCard jobId={job.id} t={t} />

      {result.status === STATUS.UNVERIFIED ? (
        <GoodToKnow title={t("Rules being verified")} text={t("We have not confirmed the official rules for this exam yet, so please read the official notice.")} />
      ) : null}
      {job.company ? (
        <GoodToKnow title={t("Good to know")} text={t("There is no official rule for private jobs. This is general guidance. Companies set their own rules on marks, branch and year, and skills often matter more than the degree.")} />
      ) : null}
      {job.note ? <GoodToKnow title={t("Good to know")} text={t(job.note)} /> : null}
      {job.verified ? <GoodToKnow title={t("Good to know")} text={t("Ages are for the general category. Other categories may get extra years.")} /> : null}

      {job.source ? (
        <Pressable
          onPress={() => Linking.openURL(job.source).catch(() => {})}
          accessibilityRole="link"
          className="mb-3 min-h-[52px] flex-row items-center rounded-[16px] bg-sg-surface px-4 py-3 active:opacity-70"
        >
          <View className="flex-1 pr-2">
            <Text className="text-[15px] font-sg-bold text-[#0F6E78]">{t("Read the official notice")}</Text>
            {job.lastVerified ? (
              <Text className="mt-0.5 text-[13px] leading-[19px] font-sg-medium text-sg-muted">
                {t("Last verified: {date}", { date: job.lastVerified })}
              </Text>
            ) : null}
          </View>
          <Ionicons name="open-outline" size={20} color="#0F6E78" />
        </Pressable>
      ) : null}
    </CareerPage>
  );
}
