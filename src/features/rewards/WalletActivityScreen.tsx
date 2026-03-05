import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Coin from "../../components/rewards/Coin";
import PressableScale from "../../components/ui/PressableScale";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";
import { useQuizContext } from "../../../QuizContext";

const HISTORY_STORAGE_KEY = "withdrawalHistory";

type VoucherProvider = "google" | "flipkart" | "amazon" | "upi" | "other";
type TabKey = "redemptions" | "transactions";

type WalletHistoryEntry =
  | {
      type: "voucher";
      id: string;
      provider: VoucherProvider;
      title: string;
      amount: number;
      coinCost: number;
      status?: string;
      date: string;
    }
  | {
      type: "withdrawal";
      amount: number;
      date: string;
      status?: string;
    };

type TransactionRowItem = {
  id: string;
  title: string;
  subtitle: string;
  amountLabel?: string | null;
  coinDelta?: number | null;
  status?: string;
  date: string;
};

const PROVIDER_META: Record<
  VoucherProvider,
  { label: string; icon: React.ComponentProps<typeof Ionicons>["name"]; color: string }
> = {
  google: {
    label: "Google Voucher",
    icon: "logo-google-playstore",
    color: "#7FB6FF",
  },
  amazon: {
    label: "Amazon Voucher",
    icon: "bag-handle-outline",
    color: "#FFB86A",
  },
  flipkart: {
    label: "Flipkart Voucher",
    icon: "cart-outline",
    color: "#8F74FF",
  },
  upi: {
    label: "UPI Withdrawal",
    icon: "qr-code-outline",
    color: "#6FE0C2",
  },
  other: {
    label: "Voucher",
    icon: "ticket-outline",
    color: "#B8C0D4",
  },
};

const STATUS_META: Record<
  string,
  {
    label: string;
    container: string;
    text: string;
  }
> = {
  pending: {
    label: "Pending",
    container: "border-white/12 bg-white/6",
    text: "text-[#D0D7E8]",
  },
  approved: {
    label: "Approved",
    container: "border-[#44D28A]/35 bg-[#183226]",
    text: "text-[#9EF2C4]",
  },
  rejected: {
    label: "Rejected",
    container: "border-[#E76F70]/35 bg-[#321B23]",
    text: "text-[#F4B3B7]",
  },
};

const getSafeNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeProvider = (value: unknown): VoucherProvider => {
  const safe = String(value || "").toLowerCase();
  if (safe === "google" || safe === "flipkart" || safe === "amazon" || safe === "upi") {
    return safe;
  }
  return "other";
};

const normalizeStatus = (value: unknown) => {
  const safe = String(value || "pending").toLowerCase();
  if (safe === "approved" || safe === "rejected" || safe === "pending") {
    return safe;
  }
  return "pending";
};

const normalizeHistory = (rawHistory: unknown): WalletHistoryEntry[] => {
  if (!Array.isArray(rawHistory)) return [];

  return rawHistory
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const item = entry as Record<string, unknown>;
      const dateRaw = item.createdAt || item.date;
      const parsedDate = dateRaw ? new Date(String(dateRaw)) : new Date();
      const isoDate =
        Number.isNaN(parsedDate.getTime()) === true
          ? new Date().toISOString()
          : parsedDate.toISOString();

      if (item.type === "voucher") {
        const provider = normalizeProvider(item.provider);
        return {
          type: "voucher",
          id: String(item.id || `${provider}_${isoDate}_${getSafeNumber(item.amount)}`),
          provider,
          title: String(item.title || "Voucher"),
          amount: getSafeNumber(item.amount),
          coinCost: getSafeNumber(item.coinCost || item.coinsUsed),
          status: normalizeStatus(item.status),
          date: isoDate,
        } as WalletHistoryEntry;
      }

      return {
        type: "withdrawal",
        amount: getSafeNumber(item.amount),
        status: item.status ? normalizeStatus(item.status) : undefined,
        date: isoDate,
      } as WalletHistoryEntry;
    })
    .filter((entry): entry is WalletHistoryEntry => Boolean(entry))
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());
};

const formatDateLabel = (value?: string) => {
  const parsedDate = value ? new Date(value) : new Date();
  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  const datePart = parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timePart = parsedDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart} • ${timePart}`;
};

const StatusChip = ({ status }: { status?: string }) => {
  const meta = STATUS_META[normalizeStatus(status)];
  return (
    <View className={`rounded-full border px-2.5 py-1 ${meta.container}`}>
      <Text className={`text-[11px] font-bold ${meta.text}`}>{meta.label}</Text>
    </View>
  );
};

const WalletActivityTabs = ({
  activeTab,
  onChange,
}: {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}) => {
  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: "redemptions", label: "Redemptions" },
    { key: "transactions", label: "Transactions" },
  ];

  return (
    <View className="mb-1 rounded-full border border-white/10 bg-[#0F1420] p-1">
      <View className="flex-row">
        {tabs.map((tab) => {
          const selected = activeTab === tab.key;
          return (
            <View key={tab.key} className="flex-1">
              <PressableScale
                onPress={() => onChange(tab.key)}
                activeScale={0.98}
                hapticType="none"
                className={`min-h-[38px] items-center justify-center rounded-full border px-3 ${
                  selected ? "border-white/12 bg-[#1A2130]" : "border-transparent bg-transparent"
                }`}
              >
                <Text
                  className={`text-[13px] font-bold ${
                    selected ? "text-[#F5F7FF]" : "text-[#8D98B1]"
                  }`}
                >
                  {tab.label}
                </Text>
              </PressableScale>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const RedemptionRow = ({ item }: { item: WalletHistoryEntry & { type: "voucher" } }) => {
  const providerMeta = PROVIDER_META[item.provider] || PROVIDER_META.other;
  const title = providerMeta.label || item.title || "Voucher";

  return (
    <PressableScale
      onPress={() => {}}
      activeScale={0.98}
      hapticType="none"
      className="rounded-[18px] border border-white/10 bg-[#151C28] px-3.5 py-3.5"
    >
      <View className="flex-row items-start justify-between">
        <View className="mr-2 flex-1 flex-row items-center">
          <View className="h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 bg-[#111723]">
            <Ionicons name={providerMeta.icon} size={18} color={providerMeta.color} />
          </View>
          <View className="ml-3 min-w-0 flex-1">
            <Text className="text-[15px] font-bold text-[#F5F7FF]" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-[12px] font-medium text-[#AAB3C8]" numberOfLines={1}>
              Voucher request
            </Text>
          </View>
        </View>
        <StatusChip status={item.status} />
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <Text className="text-[16px] font-extrabold text-white">₹{item.amount}</Text>
        <Text className="text-[12px] font-semibold text-[#96A2BC]">{formatDateLabel(item.date)}</Text>
      </View>
    </PressableScale>
  );
};

const TransactionRow = ({ item }: { item: TransactionRowItem }) => {
  const isCredit = (item.coinDelta || 0) > 0;
  const coinLabel =
    typeof item.coinDelta === "number" && item.coinDelta !== 0
      ? `${item.coinDelta > 0 ? "+" : ""}${item.coinDelta}`
      : null;

  return (
    <PressableScale
      onPress={() => {}}
      activeScale={0.98}
      hapticType="none"
      className="rounded-[18px] border border-white/10 bg-[#151C28] px-3.5 py-3.5"
    >
      <View className="flex-row items-start justify-between">
        <View className="mr-2 flex-1 flex-row items-center">
          <View className="h-9 w-9 items-center justify-center rounded-[11px] border border-white/10 bg-[#111723]">
            <Ionicons
              name={coinLabel ? (isCredit ? "add-circle-outline" : "remove-circle-outline") : "swap-horizontal-outline"}
              size={16}
              color={coinLabel ? (isCredit ? "#8BE6B5" : "#F2B2B6") : "#9AA7C2"}
            />
          </View>
          <View className="ml-3 min-w-0 flex-1">
            <Text className="text-[14px] font-bold text-[#F5F7FF]" numberOfLines={1}>
              {item.title}
            </Text>
            <Text className="text-[12px] font-medium text-[#AAB3C8]" numberOfLines={1}>
              {item.subtitle}
            </Text>
          </View>
        </View>
        {coinLabel ? (
          <Text className={`text-[14px] font-extrabold ${isCredit ? "text-[#8BE6B5]" : "text-[#F2B2B6]"}`}>
            {coinLabel}
          </Text>
        ) : item.amountLabel ? (
          <Text className="text-[14px] font-extrabold text-[#E6ECFA]">{item.amountLabel}</Text>
        ) : (
          <StatusChip status={item.status} />
        )}
      </View>

      <View className="mt-2 flex-row items-center justify-between">
        <Text className="text-[11px] font-medium text-[#91A0BB]">{formatDateLabel(item.date)}</Text>
        {item.status && (coinLabel || item.amountLabel) ? (
          <StatusChip status={item.status} />
        ) : null}
      </View>
    </PressableScale>
  );
};

const EmptyState = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <View className="mt-16 items-center px-8">
    <View className="h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#141A25]">
      <Ionicons name="time-outline" size={22} color="#9AA7C2" />
    </View>
    <Text className="mt-4 text-[17px] font-bold text-[#F5F7FF]">{title}</Text>
    <Text className="mt-1 text-center text-[13px] font-medium text-[#98A4BE]">{subtitle}</Text>
  </View>
);

const WalletActivityScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { totalScore } = useQuizContext();
  const [activeTab, setActiveTab] = useState<TabKey>("redemptions");
  const [history, setHistory] = useState<WalletHistoryEntry[]>(() =>
    normalizeHistory(route?.params?.withdrawalHistory || [])
  );
  const [loading, setLoading] = useState(false);

  const listOpacity = useSharedValue(1);
  const listTranslateY = useSharedValue(0);

  const listAnimatedStyle = useAnimatedStyle(() => ({
    opacity: listOpacity.value,
    transform: [{ translateY: listTranslateY.value }],
  }));

  const hydrateHistory = useCallback(async () => {
    let parsedRaw: unknown = [];
    try {
      const raw = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
      parsedRaw = raw ? JSON.parse(raw) : [];
    } catch (_error) {
      parsedRaw = [];
    }

    const normalized = normalizeHistory(parsedRaw);
    if (normalized.length > 0) {
      return normalized;
    }

    return normalizeHistory(route?.params?.withdrawalHistory || []);
  }, [route?.params?.withdrawalHistory]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setLoading(true);
      hydrateHistory()
        .then((nextHistory) => {
          if (!isActive) return;
          setHistory(nextHistory);
        })
        .catch(() => {})
        .finally(() => {
          if (isActive) setLoading(false);
        });
      return () => {
        isActive = false;
      };
    }, [hydrateHistory])
  );

  useEffect(() => {
    listOpacity.value = 0;
    listTranslateY.value = 6;
    listOpacity.value = withTiming(1, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    });
    listTranslateY.value = withTiming(0, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    });
  }, [activeTab, listOpacity, listTranslateY]);

  const redemptions = useMemo(
    () => history.filter((entry): entry is WalletHistoryEntry & { type: "voucher" } => entry.type === "voucher"),
    [history]
  );

  const transactions = useMemo<TransactionRowItem[]>(
    () =>
      history.map((entry, index) => {
        if (entry.type === "voucher") {
          const providerMeta = PROVIDER_META[entry.provider] || PROVIDER_META.other;
          return {
            id: `${entry.id || "voucher"}_${index}`,
            title: "Redemption request",
            subtitle: `${providerMeta.label} • ₹${entry.amount}`,
            coinDelta: entry.coinCost ? -Math.abs(entry.coinCost) : null,
            status: entry.status,
            date: entry.date,
          };
        }

        return {
          id: `withdrawal_${entry.date}_${index}`,
          title: "Withdrawal request",
          subtitle: "Payout request submitted",
          amountLabel: `₹${entry.amount}`,
          status: entry.status,
          date: entry.date,
        };
      }),
    [history]
  );

  const activeList = activeTab === "redemptions" ? redemptions : transactions;

  return (
    <ScreenLayoutContainer variant="wallet" scroll={false}>
      <View className="px-4">
        <View className="mb-3 flex-row items-center justify-between">
          <PressableScale
            onPress={() => navigation.goBack()}
            activeScale={0.96}
            className="h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#151C28]"
          >
            <Ionicons name="arrow-back" size={18} color="#F5F7FF" />
          </PressableScale>

          <Text className="mx-3 flex-1 text-center text-[21px] font-extrabold text-[#F5F7FF]">
            Wallet Activity
          </Text>

          <View className="min-w-[78px] flex-row items-center justify-center rounded-full border border-[#FFD700]/30 bg-[#2A2312] px-2.5 py-1.5">
            <Coin size={12} compact />
            <Text className="ml-1 text-[11px] font-extrabold text-[#FFD700]">{totalScore}</Text>
          </View>
        </View>

        <WalletActivityTabs activeTab={activeTab} onChange={setActiveTab} />
      </View>

      <Animated.View style={[{ flex: 1 }, listAnimatedStyle]}>
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator color="#C8D1E4" />
          </View>
        ) : (
          <FlatList
            key={activeTab}
            data={activeList}
            keyExtractor={(item: any) => String(item.id)}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 12,
              paddingBottom: 24,
              flexGrow: 1,
            }}
            ItemSeparatorComponent={() => <View className="h-3" />}
            renderItem={({ item }) =>
              activeTab === "redemptions" ? (
                <RedemptionRow item={item as WalletHistoryEntry & { type: "voucher" }} />
              ) : (
                <TransactionRow item={item as TransactionRowItem} />
              )
            }
            ListEmptyComponent={
              <EmptyState
                title="No history yet"
                subtitle="Your wallet activity will appear here."
              />
            }
          />
        )}
      </Animated.View>
    </ScreenLayoutContainer>
  );
};

export default WalletActivityScreen;
