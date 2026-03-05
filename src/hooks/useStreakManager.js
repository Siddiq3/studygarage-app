import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localStore } from "../services/storage/localStore";
import { useQuizContext } from "../../QuizContext";
import { isYesterday, toLocalDateKey } from "../utils/dateKey";
import useRemoteConfig from "./useRemoteConfig";
import { defaultConfig } from "../config/remoteConfig";
import {
  DEFAULT_STREAK_MILESTONES,
  getCurrentMilestone,
  getNextMilestone,
  getProgressToNext,
  normalizeMilestones,
} from "../services/streak/streakMilestones";

const ACTIVE_SECONDS_KEY = "sg_active_study_seconds_today";
const ACTIVE_SECONDS_DATE_KEY = "sg_active_study_seconds_date";
const ACTIVE_SECONDS_ALIAS_KEY = "activeStudySecondsToday";
const QUIZ_DONE_ALIAS_KEY = "quizCompletedToday";
const LAST_STREAK_POPUP_DATE_KEY = "sg_last_streak_popup_shown_date";
const LAST_STREAK_POPUP_DATE_ALIAS_KEY = "streakPopupShownDate";
const DEFAULT_MIN_STUDY_MINUTES = 30;

const getMotivationalLine = ({
  streakCount,
  requiresQuiz,
  quizRequirementMet,
  usageRequirementMet,
  activeStudySecondsToday,
  minStudySeconds,
  nextMilestone,
}) => {
  const needsQuiz = requiresQuiz && !quizRequirementMet;
  const needsUsage = !usageRequirementMet;

  if (needsQuiz || needsUsage) {
    if (needsQuiz && needsUsage) {
      return "Complete quiz + study minutes to keep your streak alive.";
    }
    if (needsQuiz) {
      return "Finish one quiz today to protect your streak.";
    }
    const minutesLeft = Math.max(
      0,
      Math.ceil((minStudySeconds - activeStudySecondsToday) / 60)
    );
    return `${minutesLeft} minute${
      minutesLeft === 1 ? "" : "s"
    } left to ignite today.`;
  }

  if (!nextMilestone) {
    if (streakCount >= 30) {
      return "Legend status unlocked. Keep your chain unbroken.";
    }
    return "Don't break your streak!";
  }

  const daysLeft = Math.max(0, nextMilestone.days - streakCount);
  if (daysLeft <= 2) {
    return `${daysLeft} day${daysLeft === 1 ? "" : "s"} left for +${
      nextMilestone.bonusCoins
    } coins.`;
  }

  if (streakCount >= 3) {
    return "You're on fire 🔥";
  }

  return "Keep momentum. You are building consistency.";
};

export function useStreakManager() {
  const { awardCoinsWithMirror } = useQuizContext();
  const { config: remoteConfig } = useRemoteConfig();
  const streakMilestones = useMemo(
    () =>
      normalizeMilestones(
        remoteConfig?.streakMilestones ??
          remoteConfig?.rewards?.streak?.milestones,
        DEFAULT_STREAK_MILESTONES
      ),
    [remoteConfig]
  );
  const streakRequiresQuiz =
    remoteConfig?.streakRequiresQuiz ??
    remoteConfig?.rewards?.streak?.requiresQuiz ??
    defaultConfig.streakRequiresQuiz;
  const minUsageMinutes = Math.max(
    0,
    Number(
      remoteConfig?.streakRequiresUsageMinutes ??
        remoteConfig?.rewards?.streak?.requiresUsageMinutes ??
        defaultConfig.streakRequiresUsageMinutes ??
        DEFAULT_MIN_STUDY_MINUTES
    )
  );
  const minUsageSeconds = Math.round(minUsageMinutes * 60);
  const streakTarget = Math.max(
    1,
    Number(remoteConfig?.streakDays ?? defaultConfig.streakDays)
  );
  const streakBonusCoins = Math.max(
    0,
    Number(remoteConfig?.streakBonusCoins ?? defaultConfig.streakBonusCoins)
  );

  const [isReady, setIsReady] = useState(false);
  const [streakCount, setStreakCount] = useState(1);
  const [igniteToday, setIgniteToday] = useState(false);
  const [milestoneReached, setMilestoneReached] = useState(null);
  const [dailyQuizCompleted, setDailyQuizCompleted] = useState(false);
  const [activeStudySecondsToday, setActiveStudySecondsToday] = useState(0);
  const [shouldShowStreakIncrementPopup, setShouldShowStreakIncrementPopup] =
    useState(false);

  const incrementingRef = useRef(false);
  const isHydratedRef = useRef(false);
  const stateSnapshotRef = useRef({
    streakCount: 1,
    lastStreakDate: "",
  });

  const currentMilestone = useMemo(
    () => getCurrentMilestone(streakCount, streakMilestones),
    [streakCount, streakMilestones]
  );
  const nextMilestone = useMemo(
    () => getNextMilestone(streakCount, streakMilestones),
    [streakCount, streakMilestones]
  );

  const syncStateSnapshot = useCallback((patch) => {
    stateSnapshotRef.current = {
      ...stateSnapshotRef.current,
      ...patch,
    };
  }, []);

  const resetDailyFlagsIfNeeded = useCallback(async () => {
    const today = toLocalDateKey();
    const lastActiveDate = await localStore.getString(
      localStore.keys.lastActiveDate,
      ""
    );

    if (lastActiveDate && lastActiveDate !== today) {
      await Promise.all([
        localStore.setBool(localStore.keys.dailyQuizCompleted, false),
        localStore.setNumber(localStore.keys.dailyUsageMinutes, 0),
        AsyncStorage.multiSet([
          [ACTIVE_SECONDS_KEY, "0"],
          [ACTIVE_SECONDS_DATE_KEY, today],
          [ACTIVE_SECONDS_ALIAS_KEY, "0"],
          [QUIZ_DONE_ALIAS_KEY, "false"],
        ]),
      ]);
    }

    await localStore.setString(localStore.keys.lastActiveDate, today);
  }, []);

  const hydrateStreakOnOpen = useCallback(async () => {
    await resetDailyFlagsIfNeeded();

    const today = toLocalDateKey();
    const [
      persistedStreakCount,
      persistedRawStreakCount,
      persistedCurrentStreak,
      persistedLastStreakDate,
      persistedLastStreakDateAlias,
      persistedQuizDone,
      persistedStudyMinutes,
      rawSeconds,
      rawSecondsDate,
      rawStreakCountValue,
      rawCurrentStreakValue,
      rawSgStreakCountValue,
    ] = await Promise.all([
      localStore.getNumber(localStore.keys.streakCount, 1),
      localStore.getNumber(localStore.keys.streakCountRaw, NaN),
      localStore.getNumber(localStore.keys.currentStreak, 1),
      localStore.getString(localStore.keys.streakLastOpen, ""),
      localStore.getString(localStore.keys.lastStreakDate, ""),
      localStore.getBool(localStore.keys.dailyQuizCompleted, false),
      localStore.getNumber(localStore.keys.dailyUsageMinutes, 0),
      AsyncStorage.getItem(ACTIVE_SECONDS_KEY),
      AsyncStorage.getItem(ACTIVE_SECONDS_DATE_KEY),
      AsyncStorage.getItem(localStore.keys.streakCountRaw),
      AsyncStorage.getItem(localStore.keys.currentStreak),
      AsyncStorage.getItem(localStore.keys.streakCount),
    ]);

    const resolvedStreak = Math.max(
      1,
      Number.isFinite(persistedCurrentStreak)
        ? persistedCurrentStreak
        : Number.isFinite(persistedRawStreakCount)
        ? persistedRawStreakCount
        : persistedStreakCount
    );
    const resolvedLastStreakDate =
      persistedLastStreakDate || persistedLastStreakDateAlias || "";

    const streakMissingOnFreshInstall =
      rawStreakCountValue == null &&
      rawCurrentStreakValue == null &&
      rawSgStreakCountValue == null;
    if (streakMissingOnFreshInstall) {
      await Promise.all([
        localStore.setNumber(localStore.keys.streakCountRaw, 1),
        localStore.setNumber(localStore.keys.currentStreak, 1),
        localStore.setNumber(localStore.keys.streakCount, 1),
      ]);
    }

    const parsedSeconds = Number(rawSeconds);
    const secondsFromStorage =
      rawSecondsDate === today && Number.isFinite(parsedSeconds)
        ? Math.max(0, parsedSeconds)
        : Math.max(0, persistedStudyMinutes * 60);

    setStreakCount(resolvedStreak);
    setDailyQuizCompleted(persistedQuizDone);
    setActiveStudySecondsToday(secondsFromStorage);
    setMilestoneReached(null);
    setIgniteToday(false);

    syncStateSnapshot({
      streakCount: resolvedStreak,
      lastStreakDate: resolvedLastStreakDate,
    });

    isHydratedRef.current = true;
    setIsReady(true);
  }, [resetDailyFlagsIfNeeded, syncStateSnapshot]);

  const evaluateIncrement = useCallback(async () => {
    if (!isHydratedRef.current || incrementingRef.current) {
      return;
    }

    const quizRequirementMet = streakRequiresQuiz ? dailyQuizCompleted : true;
    const usageRequirementMet = activeStudySecondsToday >= minUsageSeconds;
    const qualifies = quizRequirementMet && usageRequirementMet;
    if (!qualifies) {
      return;
    }

    const today = toLocalDateKey();
    const lastStreakDate = await localStore.getString(
      localStore.keys.streakLastOpen,
      stateSnapshotRef.current.lastStreakDate || ""
    );

    if (lastStreakDate === today) {
      return;
    }

    incrementingRef.current = true;

    try {
      const previousStreak = Math.max(
        1,
        stateSnapshotRef.current.streakCount || 1
      );
      const nextStreak = isYesterday(lastStreakDate, today)
        ? previousStreak + 1
        : 1;

      await Promise.all([
        localStore.setNumber(localStore.keys.currentStreak, nextStreak),
        localStore.setNumber(localStore.keys.streakCount, nextStreak),
        localStore.setNumber(localStore.keys.streakCountRaw, nextStreak),
        localStore.setString(localStore.keys.streakLastOpen, today),
        localStore.setString(localStore.keys.lastStreakDate, today),
      ]);

      setStreakCount(nextStreak);
      setIgniteToday(true);
      syncStateSnapshot({ streakCount: nextStreak, lastStreakDate: today });

      const [lastPopupDate, lastPopupDateAlias] = await Promise.all([
        AsyncStorage.getItem(LAST_STREAK_POPUP_DATE_KEY),
        AsyncStorage.getItem(LAST_STREAK_POPUP_DATE_ALIAS_KEY),
      ]);
      const resolvedPopupDate = lastPopupDate || lastPopupDateAlias;
      if (resolvedPopupDate !== today) {
        setShouldShowStreakIncrementPopup(true);
      }

      const claimedMilestones = await localStore.getJSON(
        localStore.keys.streakMilestones,
        []
      );
      const normalizedClaims = new Set(
        Array.isArray(claimedMilestones)
          ? claimedMilestones.filter((item) => typeof item === "string")
          : []
      );

      const unlockedMilestones = streakMilestones.filter(
        (milestone) =>
          nextStreak >= milestone.days &&
          !normalizedClaims.has(`day${milestone.days}`)
      );

      if (unlockedMilestones.length) {
        for (const milestone of unlockedMilestones) {
          await awardCoinsWithMirror(
            milestone.bonusCoins,
            "streak_milestone",
            `streak:${milestone.days}`,
            { milestoneDays: milestone.days, bonusCoins: milestone.bonusCoins }
          );
          normalizedClaims.add(`day${milestone.days}`);
        }

        await localStore.setJSON(
          localStore.keys.streakMilestones,
          Array.from(normalizedClaims)
        );
        setMilestoneReached(
          unlockedMilestones[unlockedMilestones.length - 1].days
        );
      }
    } finally {
      incrementingRef.current = false;
    }
  }, [
    activeStudySecondsToday,
    awardCoinsWithMirror,
    dailyQuizCompleted,
    minUsageSeconds,
    streakMilestones,
    streakRequiresQuiz,
    syncStateSnapshot,
  ]);

  useEffect(() => {
    hydrateStreakOnOpen().catch(() => {
      setIsReady(true);
    });
  }, [hydrateStreakOnOpen]);

  useEffect(() => {
    if (!isHydratedRef.current) return;
    localStore
      .setNumber(
        localStore.keys.dailyUsageMinutes,
        Math.floor(activeStudySecondsToday / 60)
      )
      .catch(() => {});
    AsyncStorage.setItem(
      ACTIVE_SECONDS_ALIAS_KEY,
      String(activeStudySecondsToday)
    ).catch(() => {});

    evaluateIncrement().catch(() => {});
  }, [activeStudySecondsToday, evaluateIncrement]);

  useEffect(() => {
    if (!isHydratedRef.current) return;
    evaluateIncrement().catch(() => {});
  }, [dailyQuizCompleted, evaluateIncrement]);

  const recordActiveStudySeconds = useCallback((seconds) => {
    const safe = Math.max(
      0,
      Number.isFinite(Number(seconds)) ? Number(seconds) : 0
    );
    setActiveStudySecondsToday(safe);
  }, []);

  const markDailyQuizCompleted = useCallback(async () => {
    const alreadyCompleted = dailyQuizCompleted;
    if (!alreadyCompleted) {
      setDailyQuizCompleted(true);
      await Promise.all([
        localStore.setBool(localStore.keys.dailyQuizCompleted, true),
        AsyncStorage.setItem(QUIZ_DONE_ALIAS_KEY, "true"),
      ]);
    }
    await evaluateIncrement();
    return !alreadyCompleted;
  }, [dailyQuizCompleted, evaluateIncrement]);

  const consumeStreakIncrementPopup = useCallback(() => {
    setShouldShowStreakIncrementPopup(false);
    setIgniteToday(false);
  }, []);

  const markStreakIncrementPopupShown = useCallback(async () => {
    const today = toLocalDateKey();
    await Promise.all([
      AsyncStorage.setItem(LAST_STREAK_POPUP_DATE_KEY, today),
      AsyncStorage.setItem(LAST_STREAK_POPUP_DATE_ALIAS_KEY, today),
      localStore.setString(localStore.keys.lastStreakPopupShownDate, today),
      localStore.setString(localStore.keys.streakPopupShownDate, today),
    ]);
  }, []);

  const progressStartDay = Math.max(0, currentMilestone?.days || 0);
  const progressTargetDay = Math.max(
    nextMilestone?.days || streakTarget,
    progressStartDay + 1
  );
  const streakProgressPct = useMemo(() => {
    if (!nextMilestone) return 100;
    return Math.min(
      100,
      Math.round(
        getProgressToNext(streakCount, progressTargetDay, progressStartDay) *
          100
      )
    );
  }, [nextMilestone, progressStartDay, progressTargetDay, streakCount]);

  const streakProgressLabel = useMemo(
    () =>
      nextMilestone
        ? `Streak Progress: ${Math.min(
            streakCount,
            progressTargetDay
          )}/${progressTargetDay} (${streakProgressPct}%)`
        : `All milestones unlocked (${streakCount} days)`,
    [nextMilestone, progressTargetDay, streakCount, streakProgressPct]
  );

  const motivationalLine = useMemo(
    () =>
      getMotivationalLine({
        streakCount,
        requiresQuiz: streakRequiresQuiz,
        quizRequirementMet: streakRequiresQuiz ? dailyQuizCompleted : true,
        usageRequirementMet: activeStudySecondsToday >= minUsageSeconds,
        activeStudySecondsToday,
        minStudySeconds: minUsageSeconds,
        nextMilestone,
      }),
    [
      activeStudySecondsToday,
      dailyQuizCompleted,
      minUsageSeconds,
      nextMilestone,
      streakCount,
      streakRequiresQuiz,
    ]
  );

  const tomorrowTeaser = useMemo(() => {
    const teaserTarget = nextMilestone?.days || streakTarget;
    const daysLeft = Math.max(0, teaserTarget - streakCount);
    return {
      label: "Tomorrow Bonus",
      rewardHint:
        nextMilestone && daysLeft > 0
          ? `${daysLeft} day${daysLeft > 1 ? "s" : ""} left for +${
              nextMilestone.bonusCoins
            } coins`
          : "Milestones unlocked. Keep your streak alive!",
    };
  }, [nextMilestone, streakCount, streakTarget]);

  return {
    isReady,
    streakCount,
    igniteToday,
    milestoneReached,
    tomorrowTeaser,
    dailyQuizCompleted,
    dailyUsageMinutes: Math.floor(activeStudySecondsToday / 60),
    activeStudySecondsToday,
    minUsageMinutes,
    streakMilestones,
    currentMilestone,
    nextMilestone,
    streakRequiresQuiz,
    streakTarget,
    streakBonusCoins,
    streakProgressPct,
    streakProgressLabel,
    motivationalLine,
    shouldShowStreakIncrementPopup,
    hydrateStreakOnOpen,
    markDailyQuizCompleted,
    recordActiveStudySeconds,
    onStreakRequirementMet: evaluateIncrement,
    consumeStreakIncrementPopup,
    markStreakIncrementPopupShown,
  };
}

export default useStreakManager;
