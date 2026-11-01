import React from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { WalletHistoryEntry } from "../../hooks/useRedeem";
import PressableScale from "../ui/PressableScale";
import SGEmptyState from "../../design-system/components/SGEmptyState";

type Props = {
  entries: WalletHistoryEntry[];
  onCopyCode?: (code: string) => void;
};

export default function RedeemHistory({ entries, onCopyCode }: Props) {
  if (!entries.length) {
    return (
      <SGEmptyState
        title="No redemptions yet"
        subtitle="Your voucher codes will appear here after redeeming."
        badgeLabel="REDEEM HISTORY"
        compact
      />
    );
  }

  return (
    <View>
      {entries.map((entry, index) => {
        if (entry.type !== "voucher") return null;
        const redeemedAt = new Date(entry.date);
        const safeDate = Number.isNaN(redeemedAt.getTime())
          ? "-"
          : redeemedAt.toLocaleString();

        return (
          <View
            key={`${entry.id}-${entry.code}-${index}`}
            className="mb-3 rounded-[18px] border border-sg-border bg-[#FFFCF5] px-3.5 py-3"
          >
            <View className="flex-row items-start justify-between">
              <View className="mr-3 flex-1">
                <Text className="text-[14px] font-sg-extrabold text-sg-text">
                  {entry.title}
                </Text>
                <Text className="mt-0.5 text-[12px] font-sg-semibold text-[#1D2A24]">
                  {safeDate}
                </Text>
              </View>
              <View className="rounded-full border border-[#9A6400]/28 bg-[#FFFCF5] px-2.5 py-1">
                <Text className="text-[12px] font-sg-extrabold text-[#9A6400]">{`${entry.coinCost} coins`}</Text>
              </View>
            </View>

            <View className="mt-2.5 rounded-[14px] border border-sg-border bg-sg-bg2 p-2.5">
              <Text className="text-[12px] font-sg-bold text-[#47544D]">
                Voucher code
              </Text>
              <Text className="mt-1 text-[14px] font-sg-extrabold text-[#1D2A24]">
                {entry.code}
              </Text>
            </View>

            <PressableScale
              onPress={() => onCopyCode?.(entry.code)}
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
      })}
    </View>
  );
}
