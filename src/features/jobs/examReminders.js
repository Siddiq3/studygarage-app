import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { OneSignal } from "react-native-onesignal";
import { reminderTimes, upcomingEvents } from "./jobDates";
import { JOBS } from "./jobsCatalog";

const PREFIX = "exam-reminder:";
const CHANNEL = "exam-reminders";

export const askReminderPermission = async () => {
  const current = await Notifications.getPermissionsAsync();
  if (current.status === "granted") return true;
  const next = await Notifications.requestPermissionsAsync();
  return next.status === "granted";
};

// Rebuilds from scratch, so changed dates and removed exams can never leave an old reminder behind.
export const syncExamReminders = async (followed, t) => {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(
    scheduled
      .filter((item) => item.identifier.startsWith(PREFIX))
      .map((item) => Notifications.cancelScheduledNotificationAsync(item.identifier))
  );

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") return;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(CHANNEL, {
      name: "Exam reminders",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  for (const jobId of followed) {
    const job = JOBS.find((item) => item.id === jobId);
    if (!job) continue;
    for (const item of upcomingEvents(jobId)) {
      for (const { before, at } of reminderTimes(item.date)) {
        const body =
          before === 0
            ? t("{event} is today", { event: t(item.type) })
            : t("{event} in {days} days", { event: t(item.type), days: before });
        await Notifications.scheduleNotificationAsync({
          identifier: `${PREFIX}${jobId}:${item.type}:${item.date}:${before}`,
          content: { title: t(job.name), body },
          trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: at, channelId: CHANNEL },
        });
      }
    }
  }
};

// Lets you send a push from OneSignal to followers of one exam. It holds only the exam, nothing personal.
export const tagFollowedExam = (jobId, following) => {
  try {
    if (following) OneSignal.User.addTag(`exam_${jobId}`, "1");
    else OneSignal.User.removeTag(`exam_${jobId}`);
  } catch (_error) {}
};
