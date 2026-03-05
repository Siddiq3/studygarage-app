import AsyncStorage from '@react-native-async-storage/async-storage';

const parseJSON = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (_error) {
    return fallback;
  }
};

export const localStore = {
  keys: {
    schemaVersion: 'sg_schema_version',
    onboardingDone: 'sg_onboarding_completed',
    seenWelcome: 'sg_has_seen_welcome_reward',
    pendingWelcome: 'sg_welcome_reward_pending',
    welcomeRewardPayload: 'sg_welcome_reward_payload',
    welcomeRewardGrantedDate: 'sg_welcome_reward_granted_date',
    coinBalance: 'sg_coin_balance',
    firstInstallBonusClaimed: 'firstInstallBonusClaimed',
    dailyQuizCompleted: 'dailyQuizCompleted',
    dailyUsageMinutes: 'dailyUsageMinutes',
    currentStreak: 'currentStreak',
    lastActiveDate: 'lastActiveDate',
    streakCount: 'sg_streak_count',
    streakLastOpen: 'sg_streak_last_open_date',
    streakIgniteDate: 'sg_streak_last_ignite_date',
    streakMilestones: 'sg_streak_milestones_claimed',
    streakCountRaw: 'streakCount',
    lastStreakDate: 'lastStreakDate',
    streakPopupShownDate: 'streakPopupShownDate',
    lastStreakPopupShownDate: 'sg_last_streak_popup_shown_date',
    activeStudySecondsToday: 'sg_active_study_seconds_today',
    activeStudySecondsDate: 'sg_active_study_seconds_date',
    coinsBalance: 'coinsBalance',
    dailyClaimDate: 'daily_checkin_last_claimed',
    dailyClaimDateAlias: 'dailyClaimDate',
    dailyRewardShownDate: 'sg_daily_reward_shown_date',
    dailyRewardShownDateAlias: 'dailyRewardShownDate',
    dailyRewardDismissedDate: 'sg_daily_reward_dismissed_date',
    firstOpenDone: 'firstOpenDone',
    firstOpenDate: 'firstOpenDate',
    streakIntroShownDate: 'sg_streak_intro_shown_date',
    streakIntroShownOnce: 'sg_streak_intro_shown_once',
    reviewPromptOpenCount: 'sg_review_prompt_open_count',
    reviewPromptCompleted: 'sg_review_prompt_completed',
    reviewPromptLastShownDate: 'sg_review_prompt_last_shown_date',
    reviewPromptRemindAfterDate: 'sg_review_prompt_remind_after_date',
    dailyRewardFirstOpenDone: 'sg_daily_reward_first_open_done',
    tomorrowBonusPreview: 'sg_tomorrow_bonus_preview',
    mysteryRewardUnlockDate: 'sg_mystery_reward_unlock_date',
  },

  async getNumber(key, fallback = 0) {
    const raw = await AsyncStorage.getItem(key);
    const num = Number(raw);
    return Number.isFinite(num) ? num : fallback;
  },

  async getBool(key, fallback = false) {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) return fallback;
    return raw === 'true';
  },

  async getString(key, fallback = '') {
    const raw = await AsyncStorage.getItem(key);
    return raw ?? fallback;
  },

  async getJSON(key, fallback = null) {
    const raw = await AsyncStorage.getItem(key);
    return parseJSON(raw, fallback);
  },

  async setNumber(key, value) {
    await AsyncStorage.setItem(key, String(value));
  },

  async setBool(key, value) {
    await AsyncStorage.setItem(key, value ? 'true' : 'false');
  },

  async setString(key, value) {
    await AsyncStorage.setItem(key, value ?? '');
  },

  async setJSON(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
};

export const safeParseNumber = (value, fallback = 0) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};
