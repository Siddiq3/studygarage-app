import React, { useCallback, useMemo, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useQuizContext } from "../../../QuizContext";
import Coin from "../../components/rewards/Coin";
import ScreenHeader from "../../design-system/components/ScreenHeader";
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
  welcome: { icon: "gift-outline", label: "Welcome", color: "#1C7C55" },
  quiz: { icon: "help-circle-outline", label: "Quiz", color: "#17694F" },
  daily: { icon: "sunny-outline", label: "Daily", color: "#9A6400" },
  streak: { icon: "flame-outline", label: "Streak", color: "#C4551A" },
  ad: { icon: "play-circle-outline", label: "Ad Reward", color: "#17694F" },
  redeem: { icon: "wallet-outline", label: "Redeem", color: "#BF3F2B" },
  referral: { icon: "people-outline", label: "Referral", color: "#17694F" },
  migration: { icon: "sync-outline", label: "Sync", color: "#47544D" },
  admin: { icon: "settings-outline", label: "Admin", color: "#1D2A24" },
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
          className="mb-3 rounded-[18px] border border-sg-border bg-[#FFFCF5] px-3.5 py-3.5"
        >
          <View className="flex-row items-center justify-between">
            <View className="h-9 w-9 rounded-[11px] bg-sg-bg2" />
            <View className="h-4 w-16 rounded-full bg-sg-bg2" />
          </View>
          <View className="mt-3 h-4 w-3/5 rounded-full bg-sg-bg2" />
          <View className="mt-2 h-3 w-2/5 rounded-full bg-sg-bg2" />
        </View>
      ))}
    </View>
  );
}

function EmptyState({ onStartQuiz }: { onStartQuiz: () => void }) {
  return (
    <View className="mt-16 items-center px-8">
      <View className="h-14 w-14 items-center justify-center rounded-full border border-sg-border bg-[#FFFCF5]">
        <Ionicons name="time-outline" size={22} color="#47544D" />
      </View>
      <Text className="mt-4 text-[17px] font-sg-bold text-[#1D2A24]">No coin activity yet</Text>
      <Text className="mt-1 text-center text-[13px] font-sg-medium text-[#47544D]">
        Start a quiz to begin earning coins.
      </Text>
      <PressableScale
        onPress={onStartQuiz}
        activeScale={0.98}
        className="mt-5 min-h-[44px] min-w-[140px] items-center justify-center rounded-full border border-sg-border bg-[#FFFCF5] px-5"
      >
        <Text className="text-[13px] font-sg-bold text-[#1D2A24]">Start a Quiz</Text>
      </PressableScale>
    </View>
  );
}

function HistoryRow({ entry }: { entry: WalletLedgerEntry }) {
  const meta = SOURCE_META[entry.source] || SOURCE_META.admin;
  const isEarn = entry.delta >= 0;
  const signedDelta = `${entry.delta > 0 ? "+" : ""}${entry.delta}`;

  return (
    <View className="rounded-[18px] border border-sg-border bg-[#FFFCF5] px-3.5 py-3.5">
      <View className="flex-row items-start justify-between">
        <View className="mr-2 flex-1 flex-row items-center">
          <View className="h-9 w-9 items-center justify-center rounded-[11px] border border-sg-border bg-[#FFFCF5]">
            <Ionicons name={meta.icon} size={16} color={meta.color} />
          </View>
          <View className="ml-3 min-w-0 flex-1">
            <Text className="text-[14px] font-sg-bold text-[#1D2A24]" numberOfLines={1}>
              {entry.title}
            </Text>
            <Text className="text-[12px] font-sg-medium text-[#1D2A24]" numberOfLines={1}>
              {getSubtitle(entry)}
            </Text>
          </View>
        </View>

        <View className="items-end">
          <Text
            className={`text-[14px] font-extrabold ${
              isEarn ? "text-[#1C7C55]" : "text-[#BF3F2B]"
            }`}
          >
            {signedDelta}
          </Text>
          <Text className="mt-0.5 text-[12px] font-sg-medium text-[#47544D]">
            Bal {entry.balanceAfter}
          </Text>
        </View>
      </View>

      <Text className="mt-2 text-[12px] font-sg-medium text-[#47544D]">{formatDateLabel(entry.createdAt)}</Text>
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
        <ScreenHeader
          tone="marigold"
          title="Coin history"
          subtitle="Every coin in and out"
          right={
          <View className="h-11 flex-row items-center rounded-[14px] bg-[#14342A] px-3">
            <Coin size={14} compact />
            <Text className="ml-1.5 text-[14px] font-sg-bold text-[#F2B632]">{totalScore}</Text>
          </View>
        }
        />

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
                  selected ? "border-sg-border bg-[#FFFCF5]" : "border-sg-border bg-[#FFFCF5]"
                }`}
              >
                <Text
                  className={`text-[12px] font-bold ${
                    selected ? "text-[#1D2A24]" : "text-[#47544D]"
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
