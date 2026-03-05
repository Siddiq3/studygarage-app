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
    color: "#7FB6FF",
    brand: "Google Play",
  },
  flipkart: {
    iconName: "cart-outline",
    color: "#8F74FF",
    brand: "Flipkart",
  },
  amazon: {
    iconName: "bag-handle-outline",
    color: "#FFB86A",
    brand: "Amazon Pay",
  },
  upi: {
    iconName: "qr-code-outline",
    color: "#6FE0C2",
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
            backgroundColor: "rgba(255,255,255,0.06)",
            borderColor: "rgba(255,255,255,0.10)",
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.14,
            shadowRadius: 7,
            elevation: 3,
            opacity: showLockedState ? 0.64 : 1,
          }}
        >
          {showLockedState ? (
            <View
              pointerEvents="none"
              className="absolute right-[-24px] top-[10px] rotate-[34deg] border border-white/12 bg-white/10 px-6 py-[2px]"
            >
              <Text
                className="text-[8px] font-bold uppercase text-[#D2D8E6]"
                style={{ letterSpacing: 2 }}
              >
                Locked
              </Text>
            </View>
          ) : null}

          <View className="flex-1 justify-between">
            <View className="flex-row items-start justify-between">
              <View className="h-10 w-10 items-center justify-center rounded-[12px] border border-white/12 bg-[#171B25]">
                <Ionicons name={meta.iconName} size={19} color={meta.color} />
              </View>

              {showLockedState ? (
                <View className="h-6 w-6 items-center justify-center rounded-full border border-white/12 bg-[#131825]">
                  <Ionicons
                    name="lock-closed-outline"
                    size={12}
                    color="#C4CBDA"
                  />
                </View>
              ) : null}
            </View>

            <View className="mt-1.5">
              <Text
                className="text-[30px] font-extrabold leading-[32px] text-[#F5F7FF]"
                style={{ fontFamily: "Sora_800ExtraBold" }}
              >
                {`₹${item.amount}`}
              </Text>
              <Text
                className="text-[13px] font-semibold text-[#F4F7FF]"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                {item.label || "Redeem Code"}
              </Text>
              <Text
                className="text-[11px] font-medium text-[#B8C0D4]"
                style={{ fontFamily: "Inter_500Medium" }}
                numberOfLines={1}
              >
                {brandLabel}
              </Text>
            </View>

            <View className="mt-1">
              <View className="self-start flex-row items-center rounded-full border border-[#FFD700]/30 bg-[#2A2414] px-2.5 py-[3px]">
                <Text
                  className="text-[11px] font-extrabold text-[#FFD700]"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  {item.coinCost}
                </Text>
                <Ionicons
                  name="flame"
                  size={11}
                  color="#FFD700"
                  style={{ marginLeft: 4 }}
                />
              </View>

              {showLockedState ? (
                <View className="mt-1 self-start rounded-full border border-white/10 bg-black/35 px-2.5 py-[3px]">
                  <Text
                    className="text-[10px] text-[#B8C0D4]"
                    style={{ fontFamily: "Inter_500Medium" }}
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
