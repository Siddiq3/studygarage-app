import React from "react";
import { Text, View } from "react-native";
import { formatDate, nextNotificationDate } from "./jobDates";
import { JOB_STATS } from "./jobStats";

function Stat({ label, value, note, missing }) {
  return (
    <View className="w-1/2 p-1.5">
      <View className="min-h-[92px] rounded-[14px] bg-sg-bg2 p-3">
        <Text className="text-[13px] leading-[19px] font-sg-bold text-sg-muted">{label}</Text>
        <Text
          className={`mt-1 ${
            missing ? "text-[14px] leading-[20px] font-sg-semibold text-sg-muted" : "text-[20px] leading-[27px] font-sg-display text-sg-text"
          }`}
        >
          {value}
        </Text>
        {note ? <Text className="text-[12px] leading-[18px] font-sg-medium text-sg-muted">{note}</Text> : null}
      </View>
    </View>
  );
}

export default function JobStatsCard({ jobId, t }) {
  const stats = JOB_STATS[jobId] || {};
  const missing = t("Not available yet");
  const nextNotification = nextNotificationDate(jobId);
  const whenLabel = stats.pattern ? t(stats.pattern) : null;
  const hasCompetition = stats.applied && stats.selected;

  return (
    <View className="mb-4 rounded-[18px] bg-sg-surface p-2.5">
      <Text className="mb-1 px-1.5 pt-1 text-[18px] leading-[25px] font-sg-display text-sg-text">{t("Job numbers and dates")}</Text>
      <View className="flex-row flex-wrap">
        <Stat label={t("Posts released")} value={stats.posts || missing} note={stats.cycle} missing={!stats.posts} />
        <Stat label={t("People who applied")} value={stats.applied || missing} note={stats.appliedCycle} missing={!stats.applied} />
        <Stat label={t("How often")} value={stats.frequency ? t(stats.frequency) : missing} note={whenLabel} missing={!stats.frequency} />
        <Stat
          label={t("Last notification")}
          value={stats.released || missing}
          note={stats.planned ? t("Planned: {date}", { date: stats.planned }) : null}
          missing={!stats.released}
        />
        {nextNotification ? <Stat label={t("Next notification")} value={formatDate(nextNotification)} note={t("Can change")} /> : null}
        {hasCompetition ? (
          <Stat label={t("Selected")} value={stats.selected} note={t("{count} wrote the exam", { count: stats.appeared })} />
        ) : null}
      </View>
      <Text className="px-1.5 pb-1 pt-1 text-[12px] leading-[18px] font-sg-medium text-sg-muted">
        {t("Numbers are from official notices. Most recruiters do not publish how many people applied.")}
      </Text>
    </View>
  );
}
