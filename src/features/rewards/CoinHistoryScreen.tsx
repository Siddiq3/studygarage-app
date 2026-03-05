import React, { useCallback, useMemo, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useQuizContext } from "../../../QuizContext";
import Coin from "../../components/rewards/Coin";
import PressableScale from "../../components/ui/PressableScale";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";
import { getLedger, type WalletLedgerEntry } from "../../wallet/walletStore";

type FilterKey =
  | "all"
  | "earned"
  | "spent"
  | "quiz"
  | "daily"
  | "streak"
  | "ad"
  | "redeem";

const FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "earned", label: "Earned" },
  { key: "spent", label: "Spent" },
  { key: "quiz", label: "Quiz" },
  { key: "daily", label: "Daily" },
  { key: "streak", label: "Streak" },
  { key: "ad", label: "Ads" },
  { key: "redeem", label: "Redeem" },
];

const SOURCE_META: Record<
  WalletLedgerEntry["source"],
  { icon: React.ComponentProps<typeof Ionicons>["name"]; label: string; color: string }
> = {
  welcome: { icon: "gift-outline", label: "Welcome", color: "#8BE6B5" },
  quiz: { icon: "help-circle-outline", label: "Quiz", color: "#7FB6FF" },
  daily: { icon: "sunny-outline", label: "Daily", color: "#FFD772" },
  streak: { icon: "flame-outline", label: "Streak", color: "#F8966A" },
  ad: { icon: "play-circle-outline", label: "Ad Reward", color: "#C09CFF" },
  redeem: { icon: "wallet-outline", label: "Redeem", color: "#F4A8AA" },
  referral: { icon: "people-outline", label: "Referral", color: "#76D6FF" },
  migration: { icon: "sync-outline", label: "Sync", color: "#96A2BC" },
  admin: { icon: "settings-outline", label: "Admin", color: "#A9B2C9" },
};

const formatDateLabel = (createdAt: string) => {
  const parsed = new Date(createdAt);
  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable";
  }

  const date = parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = parsed.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${date} • ${time}`;
};

const sourcePassesFilter = (entry: WalletLedgerEntry, filter: FilterKey) => {
  if (entry.source === "migration") {
    return false;
  }

  switch (filter) {
    case "earned":
      return entry.type === "earn";
    case "spent":
      return entry.type === "spend";
    case "quiz":
      return entry.source === "quiz";
    case "daily":
      return entry.source === "daily";
    case "streak":
      return entry.source === "streak";
    case "ad":
      return entry.source === "ad";
    case "redeem":
      return entry.source === "redeem";
    case "all":
    default:
      return true;
  }
};

const getSubtitle = (entry: WalletLedgerEntry) => {
  const sourceLabel = SOURCE_META[entry.source]?.label || "Wallet";
  if (entry.source === "quiz") {
    const subject = String(entry.meta?.subjectId || "").trim();
    const chapter = String(entry.meta?.chapterId || "").trim();
    if (subject && chapter) {
      return `${sourceLabel} • ${subject} • ${chapter}`;
    }
    if (subject) {
      return `${sourceLabel} • ${subject}`;
    }
  }

  if (entry.source === "redeem") {
    const voucherType = String(entry.meta?.voucherType || "").trim();
    const amount = Number(entry.meta?.amount);
    if (voucherType && Number.isFinite(amount) && amount > 0) {
      return `${voucherType} • ₹${Math.round(amount)}`;
    }
    if (voucherType) {
      return voucherType;
    }
  }

  return sourceLabel;
};

function LoadingSkeleton() {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
      {[0, 1, 2, 3].map((index) => (
        <View
          key={`coin-history-skeleton-${index}`}
          className="mb-3 rounded-[18px] border border-white/10 bg-[#151C28] px-3.5 py-3.5"
        >
          <View className="flex-row items-center justify-between">
            <View className="h-9 w-9 rounded-[11px] bg-white/8" />
            <View className="h-4 w-16 rounded-full bg-white/8" />
          </View>
          <View className="mt-3 h-4 w-3/5 rounded-full bg-white/8" />
          <View className="mt-2 h-3 w-2/5 rounded-full bg-white/8" />
        </View>
      ))}
    </View>
  );
}

function EmptyState({ onStartQuiz }: { onStartQuiz: () => void }) {
  return (
    <View className="mt-16 items-center px-8">
      <View className="h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#141A25]">
        <Ionicons name="time-outline" size={22} color="#9AA7C2" />
      </View>
      <Text className="mt-4 text-[17px] font-bold text-[#F5F7FF]">No coin activity yet</Text>
      <Text className="mt-1 text-center text-[13px] font-medium text-[#98A4BE]">
        Start a quiz to begin earning coins.
      </Text>
      <PressableScale
        onPress={onStartQuiz}
        activeScale={0.98}
        className="mt-5 min-h-[44px] min-w-[140px] items-center justify-center rounded-full border border-white/12 bg-[#1A2130] px-5"
      >
        <Text className="text-[13px] font-bold text-[#F5F7FF]">Start a Quiz</Text>
      </PressableScale>
    </View>
  );
}

function HistoryRow({ entry }: { entry: WalletLedgerEntry }) {
  const meta = SOURCE_META[entry.source] || SOURCE_META.admin;
  const isEarn = entry.delta >= 0;
  const signedDelta = `${entry.delta > 0 ? "+" : ""}${entry.delta}`;

  return (
    <View className="rounded-[18px] border border-white/10 bg-[#151C28] px-3.5 py-3.5">
      <View className="flex-row items-start justify-between">
        <View className="mr-2 flex-1 flex-row items-center">
          <View className="h-9 w-9 items-center justify-center rounded-[11px] border border-white/10 bg-[#111723]">
            <Ionicons name={meta.icon} size={16} color={meta.color} />
          </View>
          <View className="ml-3 min-w-0 flex-1">
            <Text className="text-[14px] font-bold text-[#F5F7FF]" numberOfLines={1}>
              {entry.title}
            </Text>
            <Text className="text-[12px] font-medium text-[#AAB3C8]" numberOfLines={1}>
              {getSubtitle(entry)}
            </Text>
          </View>
        </View>

        <View className="items-end">
          <Text
            className={`text-[14px] font-extrabold ${
              isEarn ? "text-[#8BE6B5]" : "text-[#F2B2B6]"
            }`}
          >
            {signedDelta}
          </Text>
          <Text className="mt-0.5 text-[10px] font-medium text-[#8B97B3]">
            Bal {entry.balanceAfter}
          </Text>
        </View>
      </View>

      <Text className="mt-2 text-[11px] font-medium text-[#91A0BB]">{formatDateLabel(entry.createdAt)}</Text>
    </View>
  );
}

export default function CoinHistoryScreen({ navigation }: { navigation: any }) {
  const { totalScore } = useQuizContext();
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [entries, setEntries] = useState<WalletLedgerEntry[]>([]);

  const hydrate = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await getLedger();
      setEntries(snapshot.history);
    } catch (error) {
      console.error("Failed to load coin ledger:", error);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      hydrate().catch(() => {});
    }, [hydrate])
  );

  const filteredEntries = useMemo(
    () => entries.filter((entry) => sourcePassesFilter(entry, activeFilter)),
    [entries, activeFilter]
  );

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
            Coin History
          </Text>

          <View className="min-w-[78px] flex-row items-center justify-center rounded-full border border-[#FFD700]/30 bg-[#2A2312] px-2.5 py-1.5">
            <Coin size={12} compact />
            <Text className="ml-1 text-[11px] font-extrabold text-[#FFD700]">{totalScore}</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 8, paddingRight: 8 }}
        >
          {FILTERS.map((filter) => {
            const selected = activeFilter === filter.key;
            return (
              <PressableScale
                key={filter.key}
                onPress={() => setActiveFilter(filter.key)}
                activeScale={0.98}
                hapticType="none"
                className={`mr-2 min-h-[34px] items-center justify-center rounded-full border px-3.5 ${
                  selected ? "border-white/18 bg-[#1A2130]" : "border-white/10 bg-[#111824]"
                }`}
              >
                <Text
                  className={`text-[12px] font-bold ${
                    selected ? "text-[#F5F7FF]" : "text-[#9EABC6]"
                  }`}
                >
                  {filter.label}
                </Text>
              </PressableScale>
            );
          })}
        </ScrollView>
      </View>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <FlatList
          data={filteredEntries}
          keyExtractor={(item) => item.eventId}
          renderItem={({ item }) => <HistoryRow entry={item} />}
          ItemSeparatorComponent={() => <View className="h-3" />}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 4,
            paddingBottom: 24,
            flexGrow: 1,
          }}
          ListEmptyComponent={
            <EmptyState onStartQuiz={() => navigation.navigate("QuizZoneScreen")} />
          }
        />
      )}
    </ScreenLayoutContainer>
  );
}
