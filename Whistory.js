import React, { useMemo } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { format } from "date-fns";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import ScreenLayoutContainer from "./src/design-system/components/ScreenLayoutContainer";
import SGCard from "./src/design-system/components/SGCard";
import SGEmptyState from "./src/design-system/components/SGEmptyState";
import PressableScale from "./src/components/ui/PressableScale";

const normalizeHistory = (rawHistory) => {
  if (!Array.isArray(rawHistory)) return [];

  return rawHistory
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;

      if (entry.type === "voucher") {
        return {
          type: "voucher",
          id: String(entry.id || ""),
          title: String(entry.title || "Voucher"),
          code: String(entry.code || "-"),
          coinCost: Number(entry.coinCost || 0),
          amount: Number(entry.amount || 0),
          date: entry.date
            ? new Date(entry.date).toISOString()
            : new Date().toISOString(),
        };
      }

      return {
        type: "withdrawal",
        amount: Number(entry.amount || 0),
        date: entry.date
          ? new Date(entry.date).toISOString()
          : new Date().toISOString(),
      };
    })
    .filter(Boolean)
    .reverse();
};

const WithdrawalHistoryPage = ({ route }) => {
  const rawHistory = route.params?.withdrawalHistory || [];

  const normalizedHistory = useMemo(
    () => normalizeHistory(rawHistory),
    [rawHistory]
  );

  const transactionCount = normalizedHistory.length;
  const voucherCount = normalizedHistory.filter(
    (item) => item.type === "voucher"
  ).length;

  const handleCopyCode = (code) => {
    // TODO(redeem-history): integrate native clipboard package for true one-tap copy.
    Alert.alert("Voucher Code", code, [{ text: "Done" }]);
  };

  const renderHistoryItem = ({ item }) => {
    if (item.type === "voucher") {
      return (
        <View className="mb-3 rounded-[18px] border border-white/10 bg-[#141923] px-4 py-3">
          <View className="flex-row items-center justify-between">
            <View className="mr-2 flex-1">
              <Text className="text-[14px] font-extrabold text-white">
                {item.title}
              </Text>
              <Text className="mt-0.5 text-[11px] font-medium text-[#8590A8]">
                {format(new Date(item.date), "MM/dd/yyyy p")}
              </Text>
            </View>
            <View className="rounded-full border border-[#FFD700]/30 bg-[#2A2312] px-2 py-0.5">
              <Text className="text-[10px] font-extrabold text-[#FFD700]">{`${item.coinCost} coins`}</Text>
            </View>
          </View>

          <View className="mt-2 rounded-[12px] border border-white/10 bg-black/25 px-3 py-2">
            <Text className="text-[10px] font-bold uppercase tracking-[1px] text-[#97A3BF]">
              Voucher code
            </Text>
            <Text className="mt-1 text-[14px] font-extrabold text-[#E2E8F6]">
              {item.code}
            </Text>
          </View>

          <PressableScale
            onPress={() => handleCopyCode(item.code)}
            className="mt-2.5 min-h-[44px] flex-row items-center justify-center rounded-full border border-white/12 bg-white/8 px-3"
            accessibilityRole="button"
            accessibilityLabel="Copy voucher code"
          >
            <Ionicons name="copy-outline" size={15} color="#C5CEE3" />
            <Text className="ml-1.5 text-[12px] font-extrabold text-white">
              Copy code
            </Text>
          </PressableScale>
        </View>
      );
    }

    return (
      <View className="mb-3 overflow-hidden rounded-[18px] border border-white/10 bg-[#141923] px-4 py-3">
        <View className="absolute inset-y-0 left-0 w-[3px] bg-[#00FFA3]/70" />
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="mr-2 h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#1C2431]">
              <Ionicons name="wallet-outline" size={16} color="#C7D3EE" />
            </View>
            <View>
              <Text className="text-[12px] font-semibold text-[#AAB4CB]">
                {format(new Date(item.date), "MM/dd/yyyy")}
              </Text>
              <Text className="text-[11px] font-medium text-[#8590A8]">
                Withdrawal credited
              </Text>
            </View>
          </View>

          <Text className="text-[16px] font-extrabold text-[#00D48A]">
            +₹{item.amount}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenLayoutContainer variant="wallet" contentClassName="px-4" scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <SGCard className="mb-4 overflow-hidden">
          <LinearGradient
            colors={[
              "rgba(56,37,103,0.45)",
              "rgba(17,28,43,0.9)",
              "rgba(14,20,31,0.95)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="-m-4 mb-4 rounded-[24px] border border-white/10 px-5 py-4"
          >
            <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-white/70">
              Rewards Wallet
            </Text>
            <Text className="mt-1 text-[28px] font-extrabold leading-[32px] text-white">
              Wallet History
            </Text>
            <View className="mt-3 flex-row">
              <View className="mr-2 self-start rounded-full border border-[#00FFA3]/35 bg-[#0F3329] px-2.5 py-1">
                <Text className="text-[11px] font-extrabold text-[#00FFA3]">
                  {transactionCount} transactions
                </Text>
              </View>
              <View className="self-start rounded-full border border-[#8F74FF]/40 bg-[#1F1A2D] px-2.5 py-1">
                <Text className="text-[11px] font-extrabold text-[#CFC3FF]">
                  {voucherCount} vouchers
                </Text>
              </View>
            </View>
          </LinearGradient>
          <Text className="mt-1 text-[12px] font-semibold text-sg-muted dark:text-sgd-muted">
            Voucher codes and withdrawal records appear here.
          </Text>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(60).duration(220)}>
        <SGCard className="mb-4">
          {normalizedHistory.length > 0 ? (
            <FlatList
              data={normalizedHistory}
              renderItem={renderHistoryItem}
              keyExtractor={(item, index) =>
                `${item.type}-${item.date}-${index}`
              }
              scrollEnabled={false}
            />
          ) : (
            <SGEmptyState
              title="No transactions yet"
              subtitle="Your completed withdrawals and voucher redemptions will appear here."
              badgeLabel="EMPTY"
              compact
            />
          )}
        </SGCard>
      </Animated.View>
    </ScreenLayoutContainer>
  );
};

export default WithdrawalHistoryPage;
