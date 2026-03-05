import AsyncStorage from "@react-native-async-storage/async-storage";

export const REWARDS_CONFIG_CACHE_KEY = "sg_rewards_config_v1";
export const REWARDS_CONFIG_CACHE_TS_KEY = "sg_rewards_config_v1_ts";
export const REWARDS_CONFIG_TTL_MS = 6 * 60 * 60 * 1000;

export const DEFAULT_REWARDS_CONFIG_URL =
  process.env.EXPO_PUBLIC_REWARDS_CONFIG_URL ||
  process.env.EXPO_PUBLIC_VOUCHER_CATALOG_URL ||
  process.env.VOUCHER_CATALOG_URL ||
  "https://raw.githubusercontent.com/Siddiq3/Api/main/vouchers.json";

export type RewardsVoucherItem = {
  id: string;
  amount: number;
  coins: number;
  label: string;
  enabled?: boolean;
};

export type RewardsVoucherCategory = {
  id: string;
  title: string;
  brand: string;
  icon?: string;
  items: RewardsVoucherItem[];
};

export type RewardsConfig = {
  version: number;
  updatedAt: string;
  categories: RewardsVoucherCategory[];
};

const FALLBACK_REWARDS_CONFIG: RewardsConfig = {
  version: 1,
  updatedAt: "2026-03-02",
  categories: [
    {
      id: "google",
      title: "Google Voucher",
      brand: "Google Play",
      icon: "playstore",
      items: [
        {
          id: "google_10",
          amount: 10,
          coins: 1020,
          label: "Redeem Code",
          enabled: true,
        },
        {
          id: "google_20",
          amount: 20,
          coins: 2350,
          label: "Redeem Code",
          enabled: true,
        },
        {
          id: "google_30",
          amount: 30,
          coins: 3400,
          label: "Redeem Code",
          enabled: true,
        },
        {
          id: "google_50",
          amount: 50,
          coins: 5600,
          label: "Redeem Code",
          enabled: true,
        },
        {
          id: "google_100",
          amount: 100,
          coins: 10200,
          label: "Redeem Code",
          enabled: true,
        },
      ],
    },
    {
      id: "flipkart",
      title: "Flipkart Voucher",
      brand: "Flipkart",
      icon: "flipkart",
      items: [
        {
          id: "flipkart_30",
          amount: 30,
          coins: 3400,
          label: "Voucher",
          enabled: true,
        },
        {
          id: "flipkart_50",
          amount: 50,
          coins: 5600,
          label: "Voucher",
          enabled: true,
        },
      ],
    },
    {
      id: "amazon",
      title: "Amazon Voucher",
      brand: "Amazon Pay",
      icon: "amazon",
      items: [
        {
          id: "amazon_20",
          amount: 20,
          coins: 2350,
          label: "Gift",
          enabled: true,
        },
        {
          id: "amazon_50",
          amount: 50,
          coins: 5600,
          label: "Gift",
          enabled: true,
        },
        {
          id: "amazon_100",
          amount: 100,
          coins: 10200,
          label: "Gift",
          enabled: true,
        },
      ],
    },
    {
      id: "upi",
      title: "Get on UPI",
      brand: "UPI",
      icon: "upi",
      items: [
        {
          id: "upi_10",
          amount: 10,
          coins: 1020,
          label: "UPI Transfer",
          enabled: true,
        },
      ],
    },
  ],
};

const isFiniteNumber = (value: unknown) => Number.isFinite(Number(value));

const normalizeItem = (rawItem: any): RewardsVoucherItem | null => {
  if (!rawItem || typeof rawItem !== "object") return null;
  if (!rawItem.id) return null;
  if (!isFiniteNumber(rawItem.amount) || !isFiniteNumber(rawItem.coins)) {
    return null;
  }

  return {
    id: String(rawItem.id),
    amount: Number(rawItem.amount),
    coins: Number(rawItem.coins),
    label: String(rawItem.label || "Voucher"),
    enabled: rawItem.enabled !== false,
  };
};

const normalizeCategory = (rawCategory: any): RewardsVoucherCategory | null => {
  if (!rawCategory || typeof rawCategory !== "object") return null;
  if (!rawCategory.id) return null;

  const items = Array.isArray(rawCategory.items)
    ? rawCategory.items.map(normalizeItem).filter(Boolean)
    : [];

  return {
    id: String(rawCategory.id),
    title: String(rawCategory.title || "Voucher"),
    brand: String(rawCategory.brand || rawCategory.title || "Voucher"),
    icon: rawCategory.icon ? String(rawCategory.icon) : undefined,
    items: items as RewardsVoucherItem[],
  };
};

const getRawCategories = (rawConfig: any): any[] => {
  if (!rawConfig || typeof rawConfig !== "object") return [];
  if (Array.isArray(rawConfig.categories)) return rawConfig.categories;
  if (Array.isArray(rawConfig.vouchers?.categories)) {
    return rawConfig.vouchers.categories;
  }
  return [];
};

const normalizeConfig = (rawConfig: any): RewardsConfig => {
  const categories = getRawCategories(rawConfig)
    .map(normalizeCategory)
    .filter(Boolean);

  if (!categories.length) {
    return FALLBACK_REWARDS_CONFIG;
  }

  return {
    version: isFiniteNumber(rawConfig?.version) ? Number(rawConfig.version) : 1,
    updatedAt: String(rawConfig?.updatedAt || ""),
    categories: categories as RewardsVoucherCategory[],
  };
};

const fetchRemoteConfig = async (): Promise<RewardsConfig> => {
  const response = await fetch(DEFAULT_REWARDS_CONFIG_URL, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Rewards config request failed: ${response.status}`);
  }

  const payload = await response.json();
  return normalizeConfig(payload);
};

const readCache = async (): Promise<{
  config: RewardsConfig | null;
  fetchedAt: number;
}> => {
  try {
    const [rawConfig, rawTs] = await Promise.all([
      AsyncStorage.getItem(REWARDS_CONFIG_CACHE_KEY),
      AsyncStorage.getItem(REWARDS_CONFIG_CACHE_TS_KEY),
    ]);

    const fetchedAt = Number(rawTs || 0);
    if (!rawConfig) {
      return { config: null, fetchedAt };
    }

    return {
      config: normalizeConfig(JSON.parse(rawConfig)),
      fetchedAt,
    };
  } catch (_error) {
    return { config: null, fetchedAt: 0 };
  }
};

const writeCache = async (config: RewardsConfig): Promise<void> => {
  try {
    const now = Date.now();
    await Promise.all([
      AsyncStorage.setItem(REWARDS_CONFIG_CACHE_KEY, JSON.stringify(config)),
      AsyncStorage.setItem(REWARDS_CONFIG_CACHE_TS_KEY, String(now)),
    ]);
  } catch (_error) {
    // Cache is best effort only.
  }
};

const isFresh = (fetchedAt: number) => {
  if (!Number.isFinite(fetchedAt) || fetchedAt <= 0) return false;
  return Date.now() - fetchedAt <= REWARDS_CONFIG_TTL_MS;
};

export async function getRewardsConfig(options?: {
  forceRefresh?: boolean;
}): Promise<RewardsConfig> {
  const forceRefresh = options?.forceRefresh === true;
  const cached = await readCache();

  if (!forceRefresh && cached.config && isFresh(cached.fetchedAt)) {
    return cached.config;
  }

  try {
    const remoteConfig = await fetchRemoteConfig();
    await writeCache(remoteConfig);
    return remoteConfig;
  } catch (_error) {
    if (cached.config) {
      return cached.config;
    }
    return FALLBACK_REWARDS_CONFIG;
  }
}

export async function refreshRewardsConfigInBackground(): Promise<void> {
  try {
    const remoteConfig = await fetchRemoteConfig();
    await writeCache(remoteConfig);
  } catch (_error) {
    // Silent refresh failure is safe; cached/default values remain in use.
  }
}

export function getRewardsVoucherCategory(
  config: RewardsConfig,
  categoryId: string
): RewardsVoucherCategory | null {
  const safeCategoryId = String(categoryId || "").toLowerCase();
  return (
    config.categories.find(
      (category) => String(category.id || "").toLowerCase() === safeCategoryId
    ) || null
  );
}

export const rewardsConfigFallback = FALLBACK_REWARDS_CONFIG;
