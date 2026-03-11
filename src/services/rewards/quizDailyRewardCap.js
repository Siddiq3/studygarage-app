import AsyncStorage from "@react-native-async-storage/async-storage";

export const QUIZ_REWARD_DATE_KEY = "sg_quiz_reward_date";
export const QUIZ_REWARD_EARNED_TODAY_KEY = "sg_quiz_reward_earned_today";
export const QUIZ_REWARD_PER_CORRECT = 5;
export const QUIZ_REWARD_DAILY_CAP = 50;

const clampEarnedToday = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  if (parsed <= 0) return 0;
  if (parsed >= QUIZ_REWARD_DAILY_CAP) return QUIZ_REWARD_DAILY_CAP;
  return Math.floor(parsed);
};

const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const readTodayRewardState = async () => {
  const today = getLocalDateKey();
  const pairs = await AsyncStorage.multiGet([
    QUIZ_REWARD_DATE_KEY,
    QUIZ_REWARD_EARNED_TODAY_KEY,
  ]);
  const map = Object.fromEntries(pairs);
  const storedDate = map[QUIZ_REWARD_DATE_KEY];
  const storedEarnedToday = clampEarnedToday(map[QUIZ_REWARD_EARNED_TODAY_KEY]);

  const isNewDay = storedDate !== today;
  const earnedToday = isNewDay ? 0 : storedEarnedToday;

  if (
    isNewDay ||
    map[QUIZ_REWARD_EARNED_TODAY_KEY] !== String(earnedToday)
  ) {
    await AsyncStorage.multiSet([
      [QUIZ_REWARD_DATE_KEY, today],
      [QUIZ_REWARD_EARNED_TODAY_KEY, String(earnedToday)],
    ]);
  }

  return { today, earnedToday };
};

export const getTodayQuizReward = async () => {
  const { earnedToday } = await readTodayRewardState();
  if (earnedToday >= QUIZ_REWARD_DAILY_CAP) return 0;
  return Math.min(QUIZ_REWARD_PER_CORRECT, QUIZ_REWARD_DAILY_CAP - earnedToday);
};

export const recordTodayQuizReward = async (rewardAmount) => {
  const normalizedReward = Math.max(0, Number(rewardAmount) || 0);
  const { today, earnedToday } = await readTodayRewardState();
  const remaining = Math.max(0, QUIZ_REWARD_DAILY_CAP - earnedToday);
  const appliedReward = Math.min(normalizedReward, remaining);
  const nextEarnedToday = earnedToday + appliedReward;

  await AsyncStorage.multiSet([
    [QUIZ_REWARD_DATE_KEY, today],
    [QUIZ_REWARD_EARNED_TODAY_KEY, String(nextEarnedToday)],
  ]);

  return {
    appliedReward,
    earnedToday: nextEarnedToday,
    capReached: nextEarnedToday >= QUIZ_REWARD_DAILY_CAP,
  };
};
