import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import PressableScale from "../ui/PressableScale";
import SurfaceCard from "../ui/SurfaceCard";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import type { VoucherItem, VoucherProvider } from "../../hooks/useRedeem";

type Props = {
  voucher: VoucherItem;
  disabled?: boolean;
  locked?: boolean;
  userCoins?: number;
  hintText?: string;
  pulseDelayMs?: number;
  pulseToken?: number;
  onPress?: () => void;
  cardRef?: React.RefObject<View | null>;
};

const providerMeta: Record<
  VoucherProvider,
  {
    iconName: keyof typeof Ionicons.glyphMap;
    color: string;
    label: string;
  }
> = {
  google: {
    iconName: "logo-google-playstore",
    color: "#17694F",
    label: "Google Play",
  },
  flipkart: { iconName: "cart-outline", color: "#17694F", label: "Flipkart" },
  amazon: { iconName: "bag-handle-outline", color: "#C4551A", label: "Amazon" },
  upi: { iconName: "qr-code-outline", color: "#1C7C55", label: "UPI" },
};

export default function VoucherCard({
  voucher,
  disabled = false,
  locked = false,
  userCoins = 0,
  hintText = "Instant eligibility check",
  pulseDelayMs = 0,
  pulseToken = 0,
  onPress,
  cardRef,
}: Props) {
  const meta = providerMeta[voucher.provider] || providerMeta.upi;
  const chipScale = useSharedValue(1);
  const lockedPillOpacity = useSharedValue(locked ? 0 : 1);
  const missingCoins = Math.max(0, voucher.coinCost - Number(userCoins || 0));

  useEffect(() => {
    if (!pulseToken) return;
    chipScale.value = 1;
    chipScale.value = withDelay(
      pulseDelayMs,
      withSequence(
        withTiming(1.05, { duration: 180 }),
        withTiming(1, { duration: 200 })
      )
    );
  }, [chipScale, pulseDelayMs, pulseToken]);

  const chipAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: chipScale.value }],
  }));

  useEffect(() => {
    if (!locked) {
      lockedPillOpacity.value = 1;
      return;
    }

    lockedPillOpacity.value = 0;
    lockedPillOpacity.value = withDelay(120, withTiming(1, { duration: 200 }));
  }, [locked, lockedPillOpacity]);

  const lockedPillStyle = useAnimatedStyle(() => ({
    opacity: lockedPillOpacity.value,
  }));

  const visualDisabled = disabled || locked;

  return (
    <View ref={cardRef} collapsable={false} className="flex-1 p-2">
      <PressableScale
        onPress={onPress}
        disabled={disabled}
        activeScale={locked ? 0.98 : 0.96}
        className="min-h-[176px]"
        accessibilityRole="button"
        accessibilityLabel={`${voucher.title} voucher card`}
      >
        <SurfaceCard
          className="rounded-[18px] px-4 py-4"
          style={{
            backgroundColor: "rgba(29,42,36,0.06)",
            borderColor: "rgba(29,42,36,0.10)",
            shadowColor: "#3B3322",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.18,
            shadowRadius: 14,
            elevation: 6,
          }}
        >
          <View className="relative overflow-hidden rounded-[18px]">
            {visualDisabled ? (
              <View pointerEvents="none" className="absolute inset-0 z-10">
                <View className="absolute inset-0 rounded-[18px] bg-sg-bg2" />
                <LinearGradient
                  colors={["rgba(15,40,31,0.00)", "rgba(15,40,31,0.12)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="absolute inset-0 rounded-[18px]"
                />
              </View>
            ) : null}
            <View className="flex-row items-start justify-between">
              <View className="h-[48px] w-[48px] items-center justify-center rounded-[14px] border border-sg-border bg-[#FFFCF5]">
                <Ionicons name={meta.iconName} size={22} color={meta.color} />
              </View>

              {locked ? (
                <Animated.View
                  style={lockedPillStyle}
                  className="ml-2 min-w-[124px] rounded-full border border-sg-border bg-sg-bg2 px-3 py-2"
                >
                  <View className="flex-row items-center">
                    <View className="h-4 w-4 items-center justify-center rounded-full bg-[#E5A019]/20">
                      <Ionicons
                        name="lock-closed-outline"
                        size={10}
                        color="#9A6400"
                      />
                    </View>
                    <View className="ml-1.5">
                      <Text className="text-[12px] font-sg-extrabold text-[#1D2A24]">
                        {`Need ${missingCoins} coins`}
                      </Text>
                      <Text className="text-[12px] font-sg-semibold text-[#1D2A24]">
                        {`Req: ${voucher.coinCost}`}
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              ) : (
                <Animated.View
                  style={chipAnimatedStyle}
                  className="ml-2 rounded-full border border-[#9A6400]/30 bg-[#FFFCF5] px-2.5 py-1"
                >
                  <Text className="text-[12px] font-sg-extrabold text-[#9A6400]">{`🔥 ${voucher.coinCost}`}</Text>
                </Animated.View>
              )}
            </View>

            <Text
              className="mt-3 text-[27px] font-sg-display leading-[31px] text-[#1D2A24]"
              style={{ fontFamily: "BricolageGrotesque_700Bold" }}
            >{`₹${voucher.amount}`}</Text>
            <Text
              className="mt-1 text-[15px] font-sg-extrabold leading-[20px] text-sg-text"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              Redeem Code
            </Text>

            <Text
              className="mt-1 text-[12px] font-sg-semibold text-[#1D2A24]"
              style={{ fontFamily: "PlusJakartaSans_500Medium" }}
            >
              {meta.label}
            </Text>

            <Text
              className="mt-3 text-[12px] font-sg-medium text-[#47544D]"
              style={{ fontFamily: "PlusJakartaSans_500Medium" }}
            >
              {hintText}
            </Text>
          </View>
        </SurfaceCard>
      </PressableScale>
    </View>
  );
}
