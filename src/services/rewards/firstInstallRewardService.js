import AsyncStorage from "@react-native-async-storage/async-storage";
import { localStore, safeParseNumber } from "../storage/localStore";
import { defaultConfig, getConfig } from "../../config/remoteConfig";
import { addCoins, getBalance } from "../../wallet/walletStore";

const SCHEMA_VERSION = 1;
const DEFAULT_BALANCE = defaultConfig.welcomeCoins;
export const WELCOME_BASE_COINS = defaultConfig.welcomeCoins;
export const NEW_USER_EXTRA_REFERRAL_COINS =
  defaultConfig.newUserExtraReferralCoins;
const WALLET_SYNC_EVENT_PREFIX = "wallet_sync";

const getTodayDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const defaultTomorrowBonusPreview = {
  title: "Tomorrow Bonus",
  subtitle:
    "Open tomorrow to protect your streak and unlock milestone rewards.",
};

const buildDefaultWelcomeRewardPayload = (config = defaultConfig) => {
  const baseWelcomeCoins = Math.max(
    0,
    Number(config?.welcomeCoins ?? defaultConfig.welcomeCoins)
  );
  return {
    baseWelcomeCoins,
    referralBonusCoins: 0,
    totalWelcomeCoins: baseWelcomeCoins,
  };
};

export async function syncCoinBalanceMirror(
  amount,
  { source = "migration", eventId, meta } = {}
) {
  const safeAmount = Math.max(0, safeParseNumber(amount, DEFAULT_BALANCE));
  const currentBalance = await getBalance();
  if (currentBalance >= safeAmount) {
    return currentBalance;
  }

  const topUp = safeAmount - currentBalance;
  const result = await addCoins({
    eventId:
      eventId || `${WALLET_SYNC_EVENT_PREFIX}:topup:${safeAmount}:${source}`,
    amount: topUp,
    source,
    meta: {
      targetBalance: safeAmount,
      ...(meta || {}),
    },
  });
  return result.balance;
}

export async function migrateRewardSchemaV1() {
  const currentVersion = await localStore.getNumber(
    localStore.keys.schemaVersion,
    0
  );

  const seenWelcome = await localStore.getBool(
    localStore.keys.seenWelcome,
    false
  );
  const firstInstallBonusClaimed = await localStore.getBool(
    localStore.keys.firstInstallBonusClaimed,
    seenWelcome
  );

  if (currentVersion < SCHEMA_VERSION) {
    const existingOnboardingData = await Promise.all([
      AsyncStorage.getItem("userName"),
      AsyncStorage.getItem("stateBoard"),
      AsyncStorage.getItem("classValue"),
    ]);

    const hasExistingOnboarding = existingOnboardingData.every(
      (value) => !!value
    );
    const pendingWelcome = await localStore.getBool(
      localStore.keys.pendingWelcome,
      false
    );
    if (hasExistingOnboarding && !pendingWelcome && !seenWelcome) {
      await localStore.setBool(localStore.keys.seenWelcome, true);
      await localStore.setBool(localStore.keys.onboardingDone, true);
    }

    if (!firstInstallBonusClaimed && seenWelcome) {
      await localStore.setBool(localStore.keys.firstInstallBonusClaimed, true);
    }

    const streakCount = await localStore.getNumber(
      localStore.keys.streakCount,
      NaN
    );
    if (!Number.isFinite(streakCount)) {
      await localStore.setNumber(localStore.keys.streakCount, 1);
    }
    const currentStreak = await localStore.getNumber(
      localStore.keys.currentStreak,
      NaN
    );
    if (!Number.isFinite(currentStreak)) {
      await localStore.setNumber(
        localStore.keys.currentStreak,
        Number.isFinite(streakCount) ? streakCount : 1
      );
    }

    const streakLastOpen = await localStore.getString(
      localStore.keys.streakLastOpen,
      ""
    );
    if (!streakLastOpen) {
      await localStore.setString(
        localStore.keys.streakLastOpen,
        getTodayDateKey()
      );
    }

    const lastActiveDate = await localStore.getString(
      localStore.keys.lastActiveDate,
      ""
    );
    if (!lastActiveDate) {
      await localStore.setString(
        localStore.keys.lastActiveDate,
        getTodayDateKey()
      );
    }

    const dailyQuizCompleted = await localStore.getBool(
      localStore.keys.dailyQuizCompleted,
      false
    );
    if (typeof dailyQuizCompleted !== "boolean") {
      await localStore.setBool(localStore.keys.dailyQuizCompleted, false);
    }

    const dailyUsageMinutes = await localStore.getNumber(
      localStore.keys.dailyUsageMinutes,
      NaN
    );
    if (!Number.isFinite(dailyUsageMinutes)) {
      await localStore.setNumber(localStore.keys.dailyUsageMinutes, 0);
    }

    const streakMilestones = await localStore.getJSON(
      localStore.keys.streakMilestones,
      null
    );
    if (!Array.isArray(streakMilestones)) {
      await localStore.setJSON(localStore.keys.streakMilestones, []);
    }

    const tomorrowPreview = await localStore.getJSON(
      localStore.keys.tomorrowBonusPreview,
      null
    );
    if (!tomorrowPreview) {
      await localStore.setJSON(
        localStore.keys.tomorrowBonusPreview,
        defaultTomorrowBonusPreview
      );
    }

    const mysteryDate = await localStore.getString(
      localStore.keys.mysteryRewardUnlockDate,
      ""
    );
    if (typeof mysteryDate !== "string") {
      await localStore.setString(localStore.keys.mysteryRewardUnlockDate, "");
    }

    await localStore.setNumber(localStore.keys.schemaVersion, SCHEMA_VERSION);
  }

  return {
    schemaVersion: SCHEMA_VERSION,
    balance: await getBalance(),
  };
}

const buildWelcomeRewardPayload = ({ referralBonusEligible = false } = {}) => {
  return getConfig().then((config) => {
    const baseWelcomeCoins = Math.max(
      0,
      Number(config?.welcomeCoins ?? defaultConfig.welcomeCoins)
    );
    const newUserExtraReferralCoins = Math.max(
      0,
      Number(
        config?.newUserExtraReferralCoins ??
          defaultConfig.newUserExtraReferralCoins
      )
    );
    const referralBonusCoins = referralBonusEligible
      ? newUserExtraReferralCoins
      : 0;

    return {
      baseWelcomeCoins,
      referralBonusCoins,
      totalWelcomeCoins: baseWelcomeCoins + referralBonusCoins,
    };
  });
};

export async function getPendingWelcomeRewardPayload() {
  const config = await getConfig();
  const payload = await localStore.getJSON(
    localStore.keys.welcomeRewardPayload,
    null
  );

  if (
    payload &&
    Number.isFinite(Number(payload.baseWelcomeCoins)) &&
    Number.isFinite(Number(payload.referralBonusCoins)) &&
    Number.isFinite(Number(payload.totalWelcomeCoins))
  ) {
    return {
      baseWelcomeCoins: Math.max(0, Number(payload.baseWelcomeCoins)),
      referralBonusCoins: Math.max(0, Number(payload.referralBonusCoins)),
      totalWelcomeCoins: Math.max(0, Number(payload.totalWelcomeCoins)),
    };
  }

  return buildDefaultWelcomeRewardPayload(config);
}

export async function prepareWelcomeRewardFlow({
  onboardingCompleted,
  referralBonusEligible = false,
}) {
  const seenWelcome = await localStore.getBool(
    localStore.keys.seenWelcome,
    false
  );
  const firstInstallBonusClaimed = await localStore.getBool(
    localStore.keys.firstInstallBonusClaimed,
    seenWelcome
  );

  if (onboardingCompleted) {
    await localStore.setBool(localStore.keys.onboardingDone, true);
  }

  const pendingWelcome = await localStore.getBool(
    localStore.keys.pendingWelcome,
    false
  );
  const payload = await buildWelcomeRewardPayload({ referralBonusEligible });

  const shouldShow =
    onboardingCompleted && (!firstInstallBonusClaimed || pendingWelcome);

  if (shouldShow) {
    await Promise.all([
      localStore.setBool(localStore.keys.pendingWelcome, true),
      localStore.setJSON(localStore.keys.welcomeRewardPayload, payload),
    ]);
  }

  return {
    shouldShow,
    payload,
  };
}

export async function completeWelcomeRewardFlow({ totalWelcomeCoins } = {}) {
  const today = getTodayDateKey();
  const currentBalance = await getBalance();
  const resolvedTotal = Math.max(
    0,
    Number.isFinite(Number(totalWelcomeCoins))
      ? Number(totalWelcomeCoins)
      : currentBalance
  );

  await syncCoinBalanceMirror(resolvedTotal, {
    source: "welcome_bonus",
    eventId: `welcome:${today}`,
    meta: {
      title: "Welcome Bonus",
    },
  });
  await Promise.all([
    localStore.setBool(localStore.keys.seenWelcome, true),
    localStore.setBool(localStore.keys.firstInstallBonusClaimed, true),
    localStore.setBool(localStore.keys.pendingWelcome, false),
    localStore.setString(localStore.keys.welcomeRewardGrantedDate, today),
  ]);
}
