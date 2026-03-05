import AsyncStorage from "@react-native-async-storage/async-storage";

export const VOUCHER_CATALOG_CACHE_KEY = "sg_voucher_catalog_cache";
export const DEFAULT_VOUCHER_CATALOG_URL =
  process.env.EXPO_PUBLIC_VOUCHER_CATALOG_URL ||
  process.env.VOUCHER_CATALOG_URL ||
  "https://raw.githubusercontent.com/Siddiq3/Api/main/vouchers.json";

export type VoucherCatalogItem = {
  id: string;
  amount: number;
  coins: number;
  label: string;
  enabled?: boolean;
};

export type VoucherCatalogCategory = {
  id: string;
  title: string;
  brand: string;
  icon?: string;
  items: VoucherCatalogItem[];
};

export type VoucherCatalog = {
  version: number;
  updatedAt: string;
  categories: VoucherCatalogCategory[];
};

const FALLBACK_CATALOG: VoucherCatalog = {
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

const normalizeItem = (rawItem: any): VoucherCatalogItem | null => {
  if (!rawItem || typeof rawItem !== "object") return null;
  if (!rawItem.id) return null;
  if (!isFiniteNumber(rawItem.amount) || !isFiniteNumber(rawItem.coins))
    return null;

  return {
    id: String(rawItem.id),
    amount: Number(rawItem.amount),
    coins: Number(rawItem.coins),
    label: String(rawItem.label || "Voucher"),
    enabled: rawItem.enabled !== false,
  };
};

const normalizeCategory = (rawCategory: any): VoucherCatalogCategory | null => {
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
    items: items as VoucherCatalogItem[],
  };
};

const normalizeCatalog = (rawCatalog: any): VoucherCatalog => {
  if (!rawCatalog || typeof rawCatalog !== "object") return FALLBACK_CATALOG;

  const categories = Array.isArray(rawCatalog.categories)
    ? rawCatalog.categories.map(normalizeCategory).filter(Boolean)
    : [];

  if (!categories.length) {
    return FALLBACK_CATALOG;
  }

  return {
    version: isFiniteNumber(rawCatalog.version)
      ? Number(rawCatalog.version)
      : 1,
    updatedAt: String(rawCatalog.updatedAt || ""),
    categories: categories as VoucherCatalogCategory[],
  };
};

const withTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs = 6000
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Voucher catalog request timed out."));
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

const fetchRemoteCatalog = async (): Promise<VoucherCatalog> => {
  const response = await withTimeout(
    fetch(DEFAULT_VOUCHER_CATALOG_URL, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    }),
    7000
  );

  if (!response.ok) {
    throw new Error(`Voucher catalog request failed: ${response.status}`);
  }

  const json = await response.json();
  return normalizeCatalog(json);
};

const readCachedCatalog = async (): Promise<VoucherCatalog | null> => {
  try {
    const raw = await AsyncStorage.getItem(VOUCHER_CATALOG_CACHE_KEY);
    if (!raw) return null;
    return normalizeCatalog(JSON.parse(raw));
  } catch (_error) {
    return null;
  }
};

const writeCachedCatalog = async (catalog: VoucherCatalog) => {
  try {
    await AsyncStorage.setItem(
      VOUCHER_CATALOG_CACHE_KEY,
      JSON.stringify(catalog)
    );
  } catch (_error) {
    // Best effort cache only.
  }
};

export async function fetchVoucherCatalog(): Promise<VoucherCatalog> {
  try {
    const remoteCatalog = await fetchRemoteCatalog();
    await writeCachedCatalog(remoteCatalog);
    return remoteCatalog;
  } catch (_error) {
    const cachedCatalog = await readCachedCatalog();
    if (cachedCatalog) return cachedCatalog;
    return FALLBACK_CATALOG;
  }
}

export function getVoucherCategory(
  catalog: VoucherCatalog,
  categoryId: string
): VoucherCatalogCategory | null {
  const safeId = String(categoryId || "").toLowerCase();
  return (
    catalog.categories.find(
      (category) => String(category.id || "").toLowerCase() === safeId
    ) || null
  );
}

export const voucherCatalogFallback = FALLBACK_CATALOG;
