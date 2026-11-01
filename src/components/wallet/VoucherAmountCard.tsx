import React from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import PressableScale from "../ui/PressableScale";

type VoucherProvider = "google" | "flipkart" | "amazon" | "upi" | string;

type VoucherAmountItem = {
  id: string;
  amount: number;
  coinCost: number;
  provider: VoucherProvider;
  label?: string;
  brand?: string;
};

type Props = {
  item: VoucherAmountItem;
  isLocked: boolean;
  isUnavailable?: boolean;
  coinsNeeded: number;
  onPress: () => void;
};

const providerMeta: Record<
  string,
  {
    iconName: keyof typeof Ionicons.glyphMap;
    color: string;
    brand: string;
  }
> = {
  google: {
    iconName: "logo-google-playstore",
    color: "#17694F",
    brand: "Google Play",
  },
  flipkart: {
    iconName: "cart-outline",
    color: "#17694F",
    brand: "Flipkart",
  },
  amazon: {
    iconName: "bag-handle-outline",
    color: "#C4551A",
    brand: "Amazon Pay",
  },
  upi: {
    iconName: "qr-code-outline",
    color: "#1C7C55",
    brand: "UPI",
  },
};

export default function VoucherAmountCard({
  item,
  isLocked,
  isUnavailable = false,
  coinsNeeded,
  onPress,
}: Props) {
  const meta = providerMeta[item.provider] || providerMeta.upi;
  const brandLabel = item.brand || meta.brand;
  const showLockedState = isLocked || isUnavailable;
  const lockText = isUnavailable
    ? "Unavailable"
    : `Need ${Math.max(0, coinsNeeded)} coins`;

  return (
    <View className="flex-1">
      <PressableScale
        onPress={onPress}
        disabled={isUnavailable}
        activeScale={isLocked ? 0.98 : 0.96}
        hapticType="none"
        className="h-[156px]"
      >
        <View
          className="relative h-full overflow-hidden rounded-[20px] border px-3.5 py-3"
          style={{
            backgroundColor: showLockedState ? "#F1EBDD" : "#FFFCF5",
            borderColor: "rgba(29,42,36,0.12)",
          }}
        >

          <View className="flex-1 justify-between">
            <View className="flex-row items-start justify-between">
              <View className="h-10 w-10 items-center justify-center rounded-[12px] border border-sg-border bg-[#FFFCF5]">
                <Ionicons name={meta.iconName} size={19} color={meta.color} />
              </View>

              {showLockedState ? (
                <View className="h-6 w-6 items-center justify-center rounded-full border border-sg-border bg-[#FFFCF5]">
                  <Ionicons
                    name="lock-closed-outline"
                    size={12}
                    color="#1D2A24"
                  />
                </View>
              ) : null}
            </View>

            <View className="mt-1.5">
              <Text
                className="text-[30px] font-sg-display leading-[32px] text-[#1D2A24]"
                style={{ fontFamily: "BricolageGrotesque_700Bold" }}
              >
                {`₹${item.amount}`}
              </Text>
              <Text
                className="text-[13px] font-sg-semibold text-[#1D2A24]"
                style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                numberOfLines={1}
              >
                {item.label || "Redeem Code"}
              </Text>
              <Text
                className="text-[12px] font-sg-medium text-[#1D2A24]"
                style={{ fontFamily: "PlusJakartaSans_500Medium" }}
                numberOfLines={1}
              >
                {brandLabel}
              </Text>
            </View>

            <View className="mt-1">
              <View className="self-start flex-row items-center rounded-full border border-[#9A6400]/30 bg-[#FFFCF5] px-2.5 py-[3px]">
                <Text
                  className="text-[12px] font-sg-extrabold text-[#9A6400]"
                  style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                >
                  {item.coinCost}
                </Text>
                <Ionicons
                  name="flame"
                  size={11}
                  color="#9A6400"
                  style={{ marginLeft: 4 }}
                />
              </View>

              {showLockedState ? (
                <View className="mt-1 self-start rounded-full border border-sg-border bg-sg-bg2 px-2.5 py-[3px]">
                  <Text
                    className="text-[12px] text-[#1D2A24] font-sg-medium"
                    style={{ fontFamily: "PlusJakartaSans_500Medium" }}
                    numberOfLines={1}
                  >
                    {lockText}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </PressableScale>
    </View>
  );
}
