import React, { useMemo } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { format } from "date-fns";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated from "react-native-reanimated";
import ScreenLayoutContainer from "./src/design-system/components/ScreenLayoutContainer";
import ScreenHeader from "./src/design-system/components/ScreenHeader";
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
        <View className="mb-3 rounded-[18px] border border-sg-border bg-[#FFFCF5] px-4 py-3">
          <View className="flex-row items-center justify-between">
            <View className="mr-2 flex-1">
              <Text className="text-[14px] font-sg-extrabold text-sg-text">
                {item.title}
              </Text>
              <Text className="mt-0.5 text-[12px] font-sg-medium text-[#5F6A63]">
                {format(new Date(item.date), "d MMM yyyy, p")}
              </Text>
            </View>
            <View className="rounded-full border border-[#9A6400]/30 bg-[#FFFCF5] px-2 py-0.5">
              <Text className="text-[12px] font-sg-extrabold text-[#9A6400]">{`${item.coinCost} coins`}</Text>
            </View>
          </View>

          <View className="mt-2 rounded-[12px] border border-sg-border bg-sg-bg2 px-3 py-2">
            <Text className="text-[12px] font-sg-bold text-[#47544D]">
              Voucher code
            </Text>
            <Text className="mt-1 text-[14px] font-sg-extrabold text-[#1D2A24]">
              {item.code}
            </Text>
          </View>

          <PressableScale
            onPress={() => handleCopyCode(item.code)}
            className="mt-2.5 min-h-[44px] flex-row items-center justify-center rounded-full border border-sg-border bg-sg-bg2 px-3"
            accessibilityRole="button"
            accessibilityLabel="Copy voucher code"
          >
            <Ionicons name="copy-outline" size={15} color="#1D2A24" />
            <Text className="ml-1.5 text-[12px] font-sg-extrabold text-sg-text">
              Copy code
            </Text>
          </PressableScale>
        </View>
      );
    }

    return (
      <View className="mb-3 overflow-hidden rounded-[18px] border border-sg-border bg-[#FFFCF5] px-4 py-3">
        <View className="absolute inset-y-0 left-0 w-[3px] bg-[#1C7C55]/70" />
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="mr-2 h-8 w-8 items-center justify-center rounded-full border border-sg-border bg-[#FFFCF5]">
              <Ionicons name="wallet-outline" size={16} color="#17694F" />
            </View>
            <View>
              <Text className="text-[12px] font-sg-semibold text-[#1D2A24]">
                {format(new Date(item.date), "d MMM yyyy")}
              </Text>
              <Text className="text-[12px] font-sg-medium text-[#5F6A63]">
                Withdrawal credited
              </Text>
            </View>
          </View>

          <Text className="text-[16px] font-sg-extrabold text-[#1C7C55]">
            +₹{item.amount}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenLayoutContainer variant="wallet" contentClassName="px-4" scroll>
      <ScreenHeader
        tone="marigold"
        eyebrow="Rewards wallet"
        title="Wallet history"
        subtitle={`${transactionCount} transactions · ${voucherCount} vouchers`}
      />

      <Animated.View>
        <View className="mb-4">
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
        </View>
      </Animated.View>
    </ScreenLayoutContainer>
  );
};

export default WithdrawalHistoryPage;
