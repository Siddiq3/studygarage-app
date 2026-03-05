import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Snackbar from "react-native-snackbar";
import {
  getRequiredCoins,
  getRupeesForRequiredCoins,
  VOUCHER_PROVIDER_RUPEE_TIERS,
} from "../constants/rewards";

const HISTORY_STORAGE_KEY = "withdrawalHistory";

export type VoucherProvider = "google" | "flipkart" | "amazon" | "upi";

export type VoucherItem = {
  id: string;
  provider: VoucherProvider;
  title: string;
  amount: number;
  coinCost: number;
};

export type WalletHistoryEntry =
  | {
      type: "withdrawal";
      amount: number;
      date: string;
    }
  | {
      type: "voucher";
      id: string;
      provider: VoucherProvider;
      title: string;
      amount: number;
      coinCost: number;
      code: string;
      date: string;
    };

type ToastPayload = {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  durationMs?: number;
};

type UseRedeemParams = {
  onDeductCoins: (coinCost: number) => Promise<void> | void;
};

type UseRedeemResult = {
  vouchers: VoucherItem[];
  loadingVouchers: boolean;
  redeemingVoucherId: string | null;
  walletHistory: WalletHistoryEntry[];
  redeemHistory: WalletHistoryEntry[];
  enqueueToast: (payload: ToastPayload) => void;
  getCoinsShortfall: (coinCost: number, currentCoins: number) => number;
  addWithdrawalEntry: (amount: number) => Promise<void>;
  redeemVoucher: (
    voucher: VoucherItem,
    currentCoins: number
  ) => Promise<{
    ok: boolean;
    reason?: "insufficient" | "server_error";
    shortfall?: number;
  }>;
  reloadWalletHistory: () => Promise<void>;
};

const buildVoucherItems = (
  provider: "google" | "flipkart" | "amazon",
  title: string,
  rupeeTiers: readonly number[]
): VoucherItem[] =>
  rupeeTiers.map((amount) => ({
    id: `${provider}_${amount}`,
    provider,
    title,
    amount,
    coinCost: getRequiredCoins(amount),
  }));

const DEFAULT_VOUCHERS: VoucherItem[] = [
  ...buildVoucherItems(
    "google",
    "Google Play Redeem Code",
    VOUCHER_PROVIDER_RUPEE_TIERS.google
  ),
  ...buildVoucherItems(
    "flipkart",
    "Flipkart Gift Voucher",
    VOUCHER_PROVIDER_RUPEE_TIERS.flipkart
  ),
  ...buildVoucherItems(
    "amazon",
    "Amazon Gift Voucher",
    VOUCHER_PROVIDER_RUPEE_TIERS.amazon
  ),
];

const normalizeHistory = (rawHistory: unknown): WalletHistoryEntry[] => {
  if (!Array.isArray(rawHistory)) return [];

  return rawHistory
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const item = entry as Record<string, unknown>;

      if (item.type === "voucher") {
        const provider = (item.provider as VoucherProvider) || "upi";
        return {
          type: "voucher",
          id: String(item.id || ""),
          provider,
          title: String(item.title || "Voucher"),
          amount: Number(item.amount || 0),
          coinCost: Number(item.coinCost || 0),
          code: String(item.code || ""),
          date: String(item.date || new Date().toISOString()),
        } as WalletHistoryEntry;
      }

      const amount = Number(item.amount || 0);
      const date =
        typeof item.date === "string" || item.date instanceof Date
          ? new Date(item.date as string | Date).toISOString()
          : new Date().toISOString();
      return {
        type: "withdrawal",
        amount,
        date,
      } as WalletHistoryEntry;
    })
    .filter((entry): entry is WalletHistoryEntry => Boolean(entry));
};

const generateVoucherCode = (provider: VoucherProvider): string => {
  const providerPrefix = provider.slice(0, 3).toUpperCase();
  const randomChunk = Math.random().toString(36).slice(2, 10).toUpperCase();
  return `${providerPrefix}-${randomChunk}`;
};

const mockRedeemRequest = async (
  voucher: VoucherItem
): Promise<{
  ok: boolean;
  code?: string;
}> => {
  // TODO(redeem-api): Replace this mock with the real redeem API integration using existing backend contract.
  await new Promise((resolve) => setTimeout(resolve, 520));
  return {
    ok: true,
    code: generateVoucherCode(voucher.provider),
  };
};

export function useRedeem({ onDeductCoins }: UseRedeemParams): UseRedeemResult {
  const [walletHistory, setWalletHistory] = useState<WalletHistoryEntry[]>([]);
  const [loadingVouchers, setLoadingVouchers] = useState(true);
  const [redeemingVoucherId, setRedeemingVoucherId] = useState<string | null>(
    null
  );

  const toastQueueRef = useRef<ToastPayload[]>([]);
  const toastActiveRef = useRef(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNextToast = useCallback(() => {
    if (toastActiveRef.current) return;
    const nextToast = toastQueueRef.current.shift();
    if (!nextToast) return;

    toastActiveRef.current = true;
    Snackbar.show({
      text: nextToast.text,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: nextToast.backgroundColor || "#151A24",
      textColor: nextToast.textColor || "#FFFFFF",
    });

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      toastActiveRef.current = false;
      showNextToast();
    }, nextToast.durationMs || 1800);
  }, []);

  const enqueueToast = useCallback(
    (payload: ToastPayload) => {
      toastQueueRef.current.push(payload);
      showNextToast();
    },
    [showNextToast]
  );

  useEffect(
    () => () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    },
    []
  );

  const persistHistory = useCallback(async (entries: WalletHistoryEntry[]) => {
    await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries));
  }, []);

  const reloadWalletHistory = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      setWalletHistory(normalizeHistory(parsed));
    } catch (error) {
      console.error("Failed to load wallet history:", error);
      setWalletHistory([]);
    }
  }, []);

  useEffect(() => {
    reloadWalletHistory().catch(() => {});
  }, [reloadWalletHistory]);

  useEffect(() => {
    const loader = setTimeout(() => {
      setLoadingVouchers(false);
    }, 260);
    return () => clearTimeout(loader);
  }, []);

  const appendHistoryEntry = useCallback(
    async (entry: WalletHistoryEntry) => {
      setWalletHistory((prevHistory) => {
        const nextHistory = [...prevHistory, entry];
        persistHistory(nextHistory).catch((error) => {
          console.error("Failed to persist wallet history:", error);
        });
        return nextHistory;
      });
    },
    [persistHistory]
  );

  const addWithdrawalEntry = useCallback(
    async (amount: number) => {
      await appendHistoryEntry({
        type: "withdrawal",
        amount,
        date: new Date().toISOString(),
      });
    },
    [appendHistoryEntry]
  );

  const getCoinsShortfall = useCallback(
    (coinCost: number, currentCoins: number) => {
      const safeCost = Number.isFinite(Number(coinCost)) ? Number(coinCost) : 0;
      const safeCoins = Number.isFinite(Number(currentCoins))
        ? Number(currentCoins)
        : 0;
      return Math.max(0, safeCost - safeCoins);
    },
    []
  );

  const redeemVoucher = useCallback(
    async (voucher: VoucherItem, currentCoins: number) => {
      const shortfall = getCoinsShortfall(voucher.coinCost, currentCoins);
      if (shortfall > 0) {
        enqueueToast({
          text: `Insufficient Balance! You need ${shortfall} more coins.`,
          backgroundColor: "#2A1720",
          textColor: "#FFD4DF",
        });
        return { ok: false, reason: "insufficient" as const, shortfall };
      }

      setRedeemingVoucherId(voucher.id);
      try {
        const response = await mockRedeemRequest(voucher);
        if (!response.ok) {
          enqueueToast({
            text: "Redeem failed. Please try again.",
            backgroundColor: "#2A1720",
            textColor: "#FFD4DF",
          });
          return { ok: false, reason: "server_error" as const };
        }

        await onDeductCoins(voucher.coinCost);

        const historyEntry: WalletHistoryEntry = {
          type: "voucher",
          id: voucher.id,
          provider: voucher.provider,
          title: voucher.title,
          amount: voucher.amount,
          coinCost: voucher.coinCost,
          code: response.code || generateVoucherCode(voucher.provider),
          date: new Date().toISOString(),
        };

        await appendHistoryEntry(historyEntry);

        enqueueToast({
          text: "Redeem successful. Your code has been sent to Redeem History.",
          backgroundColor: "#123226",
          textColor: "#A9F5D2",
        });

        return { ok: true };
      } catch (error) {
        console.error("Voucher redeem failed:", error);
        enqueueToast({
          text: "Redeem failed. Please try again.",
          backgroundColor: "#2A1720",
          textColor: "#FFD4DF",
        });
        return { ok: false, reason: "server_error" as const };
      } finally {
        setRedeemingVoucherId(null);
      }
    },
    [appendHistoryEntry, enqueueToast, getCoinsShortfall, onDeductCoins]
  );

  const redeemHistory = useMemo(
    () =>
      walletHistory
        .filter((entry) => entry.type === "voucher")
        .slice()
        .reverse(),
    [walletHistory]
  );

  return {
    vouchers: DEFAULT_VOUCHERS,
    loadingVouchers,
    redeemingVoucherId,
    walletHistory,
    redeemHistory,
    enqueueToast,
    getCoinsShortfall,
    addWithdrawalEntry,
    redeemVoucher,
    reloadWalletHistory,
  };
}

export const REDEEM_CONVERSION_HINT =
  "Fixed tiers: ₹10=1020, ₹20=2350, ₹30=3400, ₹50=5600, ₹100=10200";
export const coinToInrLabel = (coinCost: number): string =>
  `${coinCost} coins (${`₹${getRupeesForRequiredCoins(coinCost) || 0}`})`;

export default useRedeem;
