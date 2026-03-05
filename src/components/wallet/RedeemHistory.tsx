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
            className="mb-3 rounded-[18px] border border-white/10 bg-[#131A24] px-3.5 py-3"
          >
            <View className="flex-row items-start justify-between">
              <View className="mr-3 flex-1">
                <Text className="text-[14px] font-extrabold text-white">
                  {entry.title}
                </Text>
                <Text className="mt-0.5 text-[11px] font-semibold text-[#AEB8CF]">
                  {safeDate}
                </Text>
              </View>
              <View className="rounded-full border border-[#FFD700]/28 bg-[#2A2312] px-2.5 py-1">
                <Text className="text-[10px] font-extrabold text-[#FFD700]">{`${entry.coinCost} coins`}</Text>
              </View>
            </View>

            <View className="mt-2.5 rounded-[14px] border border-white/10 bg-black/30 p-2.5">
              <Text className="text-[10px] font-bold uppercase tracking-[1px] text-[#97A3BF]">
                Voucher code
              </Text>
              <Text className="mt-1 text-[14px] font-extrabold text-[#D6DEEF]">
                {entry.code}
              </Text>
            </View>

            <PressableScale
              onPress={() => onCopyCode?.(entry.code)}
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
      })}
    </View>
  );
}
