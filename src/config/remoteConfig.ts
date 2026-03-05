import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DEFAULT_STREAK_MILESTONES,
  normalizeMilestones,
  type StreakMilestone,
} from "../services/streak/streakMilestones";

export const REMOTE_CONFIG_STORAGE_KEY = "sg_remote_config_v1";
export const REMOTE_CONFIG_TTL_MS = 12 * 60 * 60 * 1000;
export const DEFAULT_REMOTE_CONFIG_URL =
  process.env.EXPO_PUBLIC_REMOTE_CONFIG_URL ||
  process.env.REMOTE_CONFIG_URL ||
  "https://raw.githubusercontent.com/Siddiq3/Api/main/remote-config.json";

export type AppRemoteConfig = {
  version: number;
  updatedAt?: string;
  welcomeCoins: number;
  correctAnswerCoins: number;
  watchAdRewardCoins: number;
  watchAdCooldownSeconds: number;
  streakDays: number;
  streakBonusCoins: number;
  streakMilestones: StreakMilestone[];
  streakRequiresQuiz: boolean;
  streakRequiresUsageMinutes: number;
  referralRewardCoins: number;
  newUserExtraReferralCoins: number;
  rewards: {
    watchAd: {
      coinsPerView: number;
      maxPerDay: number;
      cooldownSeconds: number;
    };
    streak: {
      milestones: StreakMilestone[];
      requiresQuiz: boolean;
      requiresUsageMinutes: number;
    };
  };
};

type RemoteConfigEnvelope = {
  fetchedAt: number;
  config: AppRemoteConfig;
};

export const defaultConfig: AppRemoteConfig = {
  version: 1,
  updatedAt: "2026-03-02",
  welcomeCoins: 50,
  correctAnswerCoins: 5,
  watchAdRewardCoins: 10,
  watchAdCooldownSeconds: 12 * 60 * 60,
  streakDays: 7,
  streakBonusCoins: 10,
  streakMilestones: [...DEFAULT_STREAK_MILESTONES],
  streakRequiresQuiz: true,
  streakRequiresUsageMinutes: 30,
  referralRewardCoins: 100,
  newUserExtraReferralCoins: 0,
  rewards: {
    watchAd: {
      coinsPerView: 10,
      maxPerDay: 2,
      cooldownSeconds: 12 * 60 * 60,
    },
    streak: {
      milestones: [...DEFAULT_STREAK_MILESTONES],
      requiresQuiz: true,
      requiresUsageMinutes: 30,
    },
  },
};

let inMemoryConfig: AppRemoteConfig = { ...defaultConfig };
let inMemoryFetchedAt = 0;
let hydratedFromStorage = false;
let refreshInFlight: Promise<AppRemoteConfig> | null = null;

const withTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs = 7000
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Remote config request timed out."));
    }, timeoutMs);

    promise
      .then((result) => {
        clearTimeout(timeout);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeout);
        reject(error);
      });
  });
};

const sanitizeNumber = (
  value: unknown,
  fallback: number,
  min = 0,
  max = Number.MAX_SAFE_INTEGER
) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.round(parsed)));
};

const sanitizeBoolean = (value: unknown, fallback: boolean) => {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
};

const extractConfigCandidate = (raw: any) => {
  if (
    raw &&
    typeof raw === "object" &&
    raw.rewards &&
    typeof raw.rewards === "object"
  ) {
    return {
      ...raw.rewards,
      version: raw.version,
      updatedAt: raw.updatedAt,
    };
  }
  return raw;
};

const getPrimaryMilestone = (milestones: StreakMilestone[]) => {
  return (
    milestones.find((item) => item.days === defaultConfig.streakDays) ||
    milestones[Math.min(1, milestones.length - 1)] ||
    milestones[0] ||
    defaultConfig.streakMilestones[1] ||
    defaultConfig.streakMilestones[0]
  );
};

const REQUIRED_CONFIG_KEYS = ["welcomeCoins", "correctAnswerCoins"] as const;

const hasRequiredSchemaKeys = (raw: any) => {
  const candidate = extractConfigCandidate(raw);
  if (!candidate || typeof candidate !== "object") return false;
  const hasCoreKeys = REQUIRED_CONFIG_KEYS.every((key) => key in candidate);
  const hasLegacyStreakKeys =
    "streakDays" in candidate || "streakBonusCoins" in candidate;
  const hasStreakConfigKeys =
    candidate.streak && typeof candidate.streak === "object";
  const hasStreakMilestoneArray = Array.isArray(
    candidate.streakMilestones ?? candidate.streak?.milestones
  );
  return (
    hasCoreKeys &&
    (hasLegacyStreakKeys || hasStreakConfigKeys || hasStreakMilestoneArray)
  );
};

const normalizeConfig = (raw: any): AppRemoteConfig | null => {
  if (!raw || typeof raw !== "object") return null;
  const candidate = extractConfigCandidate(raw);
  if (!candidate || typeof candidate !== "object") return null;

  const version = sanitizeNumber(candidate.version, 1, 1);
  if (version < 1) return null;

  const streakCandidate =
    candidate.streak && typeof candidate.streak === "object"
      ? candidate.streak
      : {};
  const milestones = normalizeMilestones(
    streakCandidate.milestones ?? candidate.streakMilestones,
    defaultConfig.streakMilestones
  );
  const primaryMilestone = getPrimaryMilestone(milestones);
  const streakDays = sanitizeNumber(
    candidate.streakDays ?? streakCandidate.days,
    primaryMilestone?.days ?? defaultConfig.streakDays,
    1
  );
  const streakBonusCoins = sanitizeNumber(
    candidate.streakBonusCoins ?? streakCandidate.bonusCoins,
    primaryMilestone?.bonusCoins ?? defaultConfig.streakBonusCoins,
    0
  );
  const streakRequiresQuiz = sanitizeBoolean(
    streakCandidate.requiresQuiz ?? candidate.streakRequiresQuiz,
    defaultConfig.streakRequiresQuiz
  );
  const streakRequiresUsageMinutes = sanitizeNumber(
    streakCandidate.requiresUsageMinutes ??
      candidate.streakRequiresUsageMinutes,
    defaultConfig.streakRequiresUsageMinutes,
    0
  );
  const watchAdCooldownSeconds = sanitizeNumber(
    candidate.watchAd?.cooldownSeconds ??
      candidate.watchAdCooldownSeconds ??
      (Number(candidate.watchAd?.cooldownHours) * 60 * 60 || 0),
    defaultConfig.watchAdCooldownSeconds,
    0,
    7 * 24 * 60 * 60
  );

  return {
    version,
    updatedAt:
      typeof candidate.updatedAt === "string" ? candidate.updatedAt : "",
    welcomeCoins: sanitizeNumber(
      candidate.welcomeCoins,
      defaultConfig.welcomeCoins,
      0
    ),
    correctAnswerCoins: sanitizeNumber(
      candidate.correctAnswerCoins,
      defaultConfig.correctAnswerCoins,
      0
    ),
    watchAdRewardCoins: sanitizeNumber(
      candidate.watchAdRewardCoins ?? candidate.watchAd?.coinsPerView,
      defaultConfig.watchAdRewardCoins,
      0
    ),
    watchAdCooldownSeconds,
    streakDays,
    streakBonusCoins,
    streakMilestones: milestones,
    streakRequiresQuiz,
    streakRequiresUsageMinutes,
    referralRewardCoins: sanitizeNumber(
      candidate.referralRewardCoins ?? candidate.referral?.referrerRewardCoins,
      defaultConfig.referralRewardCoins,
      0
    ),
    newUserExtraReferralCoins: sanitizeNumber(
      candidate.newUserExtraReferralCoins ??
        candidate.referral?.newUserExtraReferralCoins,
      defaultConfig.newUserExtraReferralCoins,
      0
    ),
    rewards: {
      watchAd: {
        coinsPerView: sanitizeNumber(
          candidate.watchAd?.coinsPerView ?? candidate.watchAdRewardCoins,
          defaultConfig.rewards.watchAd.coinsPerView,
          0
        ),
        maxPerDay: sanitizeNumber(
          candidate.watchAd?.maxPerDay,
          defaultConfig.rewards.watchAd.maxPerDay,
          1,
          20
        ),
        cooldownSeconds: watchAdCooldownSeconds,
      },
      streak: {
        milestones,
        requiresQuiz: streakRequiresQuiz,
        requiresUsageMinutes: streakRequiresUsageMinutes,
      },
    },
  };
};

const readCachedEnvelope = async (): Promise<RemoteConfigEnvelope | null> => {
  try {
    const raw = await AsyncStorage.getItem(REMOTE_CONFIG_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const normalizedConfig = normalizeConfig(parsed?.config);
    const fetchedAt = Number(parsed?.fetchedAt);
    if (!normalizedConfig || !Number.isFinite(fetchedAt) || fetchedAt <= 0) {
      return null;
    }
    return {
      config: normalizedConfig,
      fetchedAt,
    };
  } catch (_error) {
    return null;
  }
};

const writeCachedEnvelope = async (envelope: RemoteConfigEnvelope) => {
  try {
    await AsyncStorage.setItem(
      REMOTE_CONFIG_STORAGE_KEY,
      JSON.stringify(envelope)
    );
  } catch (_error) {
    // Best effort cache; never crash.
  }
};

const hydrateFromCacheIfNeeded = async () => {
  if (hydratedFromStorage) return;
  hydratedFromStorage = true;

  const cached = await readCachedEnvelope();
  if (!cached) return;

  inMemoryConfig = cached.config;
  inMemoryFetchedAt = cached.fetchedAt;
};

const fetchRemoteConfigJson = async (url: string) => {
  const response = await withTimeout(
    fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    }),
    7000
  );

  if (!response.ok) {
    throw new Error(`Remote config HTTP ${response.status}`);
  }

  return response.json();
};

export async function fetchRemoteConfig(
  url: string = DEFAULT_REMOTE_CONFIG_URL
): Promise<AppRemoteConfig> {
  const raw = await fetchRemoteConfigJson(url);
  const candidate = extractConfigCandidate(raw);
  const versionValue =
    candidate && typeof candidate === "object"
      ? candidate.version
      : raw?.version;
  if (!Number.isFinite(Number(versionValue))) {
    throw new Error("Remote config version validation failed.");
  }
  if (!hasRequiredSchemaKeys(raw)) {
    throw new Error("Remote config schema validation failed.");
  }
  const normalized = normalizeConfig(raw);
  if (!normalized) {
    throw new Error("Remote config schema validation failed.");
  }
  return normalized;
}

export async function getConfig(): Promise<AppRemoteConfig> {
  await hydrateFromCacheIfNeeded();
  return inMemoryConfig || defaultConfig;
}

export async function refreshConfigInBackground({
  force = false,
  url = DEFAULT_REMOTE_CONFIG_URL,
}: {
  force?: boolean;
  url?: string;
} = {}): Promise<AppRemoteConfig> {
  await hydrateFromCacheIfNeeded();

  const now = Date.now();
  const isFresh = now - inMemoryFetchedAt < REMOTE_CONFIG_TTL_MS;
  if (!force && isFresh) {
    return inMemoryConfig;
  }

  if (refreshInFlight) {
    return refreshInFlight;
  }

  refreshInFlight = (async () => {
    try {
      const remote = await fetchRemoteConfig(url);
      inMemoryConfig = remote;
      inMemoryFetchedAt = now;
      await writeCachedEnvelope({
        fetchedAt: now,
        config: remote,
      });
      return remote;
    } catch (error) {
      console.warn("[remote-config] Using cached/default config:", error);
      return inMemoryConfig || defaultConfig;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}
