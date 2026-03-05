import React, { createRef, useMemo, useRef } from "react";
import { FlatList, Text, View } from "react-native";
import type { VoucherItem } from "../../hooks/useRedeem";
import VoucherCard from "./VoucherCard";
import PressableScale from "../ui/PressableScale";
import SGEmptyState from "../../design-system/components/SGEmptyState";
import {
  getRequiredCoins,
  VOUCHER_PROVIDER_RUPEE_TIERS,
} from "../../constants/rewards";

type Props = {
  vouchers?: VoucherItem[];
  userCoins: number;
  loading?: boolean;
  onVoucherPress: (
    voucher: VoucherItem,
    sourceRef?: React.RefObject<View | null>
  ) => void;
  onEarnCoinsPress?: () => void;
};

const defaultVouchers: VoucherItem[] = [
  ...VOUCHER_PROVIDER_RUPEE_TIERS.google.map((amount) => ({
    id: `google_${amount}`,
    provider: "google" as const,
    title: "Google Play Redeem Code",
    amount,
    coinCost: getRequiredCoins(amount),
  })),
  ...VOUCHER_PROVIDER_RUPEE_TIERS.flipkart.map((amount) => ({
    id: `flipkart_${amount}`,
    provider: "flipkart" as const,
    title: "Flipkart Gift Voucher",
    amount,
    coinCost: getRequiredCoins(amount),
  })),
  ...VOUCHER_PROVIDER_RUPEE_TIERS.amazon.map((amount) => ({
    id: `amazon_${amount}`,
    provider: "amazon" as const,
    title: "Amazon Gift Voucher",
    amount,
    coinCost: getRequiredCoins(amount),
  })),
];

export default function VoucherGrid({
  vouchers = defaultVouchers,
  userCoins,
  loading = false,
  onVoucherPress,
  onEarnCoinsPress,
}: Props) {
  const refMap = useRef<Record<string, React.RefObject<View | null>>>({});

  const voucherList = useMemo(
    () => (Array.isArray(vouchers) ? vouchers : defaultVouchers),
    [vouchers]
  );

  const getCardRef = (id: string) => {
    if (!refMap.current[id]) {
      refMap.current[id] = createRef<View>();
    }
    return refMap.current[id];
  };

  if (loading) {
    return (
      <View className="mt-3 flex-row flex-wrap">
        {[0, 1, 2, 3].map((item) => (
          <View key={`voucher-skeleton-${item}`} className="w-1/2 p-1.5">
            <View className="h-[156px] rounded-[22px] border border-white/10 bg-white/6" />
          </View>
        ))}
      </View>
    );
  }

  if (!voucherList.length) {
    return (
      <View className="mt-3">
        <SGEmptyState
          title="No vouchers right now"
          subtitle="Check back soon for new redeem options."
          badgeLabel="VOUCHERS EMPTY"
          compact
        />
        <PressableScale
          onPress={onEarnCoinsPress}
          className="mt-3 min-h-[44px] items-center justify-center rounded-full border border-white/12 bg-white/8 px-4 py-2.5"
        >
          <Text className="text-[13px] font-extrabold text-white">
            Earn Coins
          </Text>
        </PressableScale>
      </View>
    );
  }

  return (
    <FlatList
      data={voucherList}
      keyExtractor={(item) => item.id}
      numColumns={2}
      scrollEnabled={false}
      renderItem={({ item }) => {
        const cardRef = getCardRef(item.id);
        const disabled = userCoins < item.coinCost;

        return (
          <VoucherCard
            voucher={item}
            disabled={disabled}
            cardRef={cardRef}
            onPress={() => onVoucherPress(item, cardRef)}
          />
        );
      }}
    />
  );
}
