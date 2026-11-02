import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import useCareerLanguage from "../career/careerI18n";
import { askReminderPermission, syncExamReminders, tagFollowedExam } from "./examReminders";
import { applicationsClosed, daysUntil, formatDate, nextEvent, upcomingEvents } from "./jobDates";
import { JOBS } from "./jobsCatalog";
import useJobStore from "./useJobStore";

let syncedVersion = null;

const countdownText = (days, t) => {
  if (days === 0) return t("Today");
  if (days === 1) return t("Tomorrow");
  return t("{days} days", { days });
};

// The number is the point of this card, so it gets the largest type on the page section.
export function ExamCountdownCard({ jobId, t }) {
  const { followed, toggleFollow } = useJobStore();
  const events = upcomingEvents(jobId);
  if (!events.length) return null;

  const [next, ...later] = events;
  const following = followed.includes(jobId);

  const toggle = async () => {
    const nowFollowing = !following;
    if (nowFollowing) await askReminderPermission().catch(() => false);
    const nextFollowed = toggleFollow(jobId);
    tagFollowedExam(jobId, nowFollowing);
    syncExamReminders(nextFollowed, t).catch(() => {});
  };

  return (
    <View className="mb-4 rounded-[22px] bg-sg-board p-5">
      <Text className="text-[15px] leading-[22px] font-sg-semibold text-[#B5C6BB]">{t(next.type)}</Text>
      <Text className="mt-0.5 text-[44px] leading-[54px] font-sg-display text-[#F2B632]">{countdownText(daysUntil(next.date), t)}</Text>
      <Text className="text-[15px] leading-[22px] font-sg-semibold text-[#F4EFE2]">{formatDate(next.date)}</Text>

      {later.slice(0, 3).map((item) => (
        <View key={`${item.type}-${item.date}`} className="mt-2.5 flex-row items-center border-t border-[#F4EFE2]/16 pt-2.5">
          <Text className="flex-1 pr-2 text-[14px] leading-[20px] font-sg-medium text-[#F4EFE2]">{t(item.type)}</Text>
          <Text className="text-[14px] leading-[20px] font-sg-bold text-[#F4EFE2]">{formatDate(item.date)}</Text>
        </View>
      ))}

      {applicationsClosed(jobId) ? (
        <View className="mt-3 flex-row items-start rounded-[12px] bg-[#FBF0D0] p-3">
          <Ionicons name="alert-circle" size={17} color="#8A5B00" style={{ marginTop: 2 }} />
          <Text className="ml-2 flex-1 text-[14px] leading-[20px] font-sg-semibold text-[#14342A]">
            {t("Applications for this exam have closed. This date is for students who already applied.")}
          </Text>
        </View>
      ) : null}

      <Pressable
        onPress={toggle}
        accessibilityRole="switch"
        accessibilityState={{ checked: following }}
        className={`mt-4 min-h-[50px] flex-row items-center justify-center rounded-[14px] px-3 ${following ? "bg-[#1C4336]" : "bg-[#F2B632]"}`}
      >
        <Ionicons name={following ? "notifications" : "notifications-outline"} size={18} color={following ? "#F2B632" : "#14342A"} />
        <Text className={`ml-2 text-[15px] font-sg-bold ${following ? "text-[#F4EFE2]" : "text-[#14342A]"}`}>
          {t(following ? "Reminders on. Tap to stop" : "Remind me")}
        </Text>
      </Pressable>
      <Text className="mt-2.5 text-[12px] leading-[18px] font-sg-medium text-[#B5C6BB]">
        {t("Official dates can change. Check the official notice.")}
      </Text>
    </View>
  );
}

// Home section: only what the student chose to follow, nearest first.
export function FollowedCountdowns({ navigation, stateBoard }) {
  const { t } = useCareerLanguage(stateBoard);
  const { ready, followed, dataVersion } = useJobStore();

  // Reminders are rebuilt whenever new dates arrive from GitHub.
  useEffect(() => {
    if (!ready || syncedVersion === dataVersion) return;
    syncedVersion = dataVersion;
    if (followed.length) syncExamReminders(followed, t).catch(() => {});
  }, [dataVersion, followed, ready, t]);

  const items = followed
    .map((jobId) => ({ job: JOBS.find((item) => item.id === jobId), event: nextEvent(jobId) }))
    .filter((item) => item.job && item.event)
    .sort((a, b) => daysUntil(a.event.date) - daysUntil(b.event.date));

  if (!items.length) return null;

  const open = (job) =>
    job.examId
      ? navigation.navigate("JobDetailScreen", { examId: job.examId, stateBoard })
      : navigation.navigate("JobInfoScreen", { jobId: job.id, stateBoard });

  return (
    <View className="mb-5">
      <Text className="mb-2.5 text-[20px] leading-[28px] font-sg-display text-sg-text">{t("My exam countdown")}</Text>
      {items.map(({ job, event }) => (
        <Pressable
          key={job.id}
          onPress={() => open(job)}
          accessibilityRole="button"
          className="mb-2 min-h-[72px] flex-row items-center rounded-[18px] bg-sg-board px-4 py-3 active:opacity-90"
        >
          <View className="flex-1 pr-3">
            <Text className="text-[16px] leading-[23px] font-sg-bold text-[#F4EFE2]">{t(job.name)}</Text>
            <Text className="text-[13px] leading-[19px] font-sg-medium text-[#B5C6BB]">
              {t(event.type)} · {formatDate(event.date)}
            </Text>
          </View>
          <Text className="text-[20px] leading-[27px] font-sg-display text-[#F2B632]">{countdownText(daysUntil(event.date), t)}</Text>
        </Pressable>
      ))}
    </View>
  );
}

// Jobs page section: the nearest dates among jobs open to this student.
export function UpcomingDates({ jobs, onOpen, t }) {
  const items = jobs
    .map((job) => ({ job, event: nextEvent(job.id) }))
    .filter((item) => item.event)
    .sort((a, b) => daysUntil(a.event.date) - daysUntil(b.event.date))
    .slice(0, 3);

  if (!items.length) return null;

  return (
    <View className="mb-5">
      <Text className="mb-2.5 text-[20px] leading-[28px] font-sg-display text-sg-text">{t("Coming up")}</Text>
      <View className="overflow-hidden rounded-[18px] bg-sg-surface">
        {items.map(({ job, event }, index) => (
          <Pressable
            key={job.id}
            onPress={() => onOpen(job)}
            accessibilityRole="button"
            className={`min-h-[64px] flex-row items-center px-4 py-2.5 active:bg-sg-bg2 ${index ? "border-t border-sg-border" : ""}`}
          >
            <View className="flex-1 pr-3">
              <Text className="text-[15px] leading-[22px] font-sg-bold text-sg-text">{t(job.name)}</Text>
              <Text className="text-[13px] leading-[19px] font-sg-medium text-sg-muted">
                {t(event.type)} · {formatDate(event.date)}
              </Text>
            </View>
            <Text className="text-[16px] leading-[23px] font-sg-display text-[#0F6E78]">{countdownText(daysUntil(event.date), t)}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
