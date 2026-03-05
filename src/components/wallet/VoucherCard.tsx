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
    color: "#7FB6FF",
    label: "Google Play",
  },
  flipkart: { iconName: "cart-outline", color: "#8F74FF", label: "Flipkart" },
  amazon: { iconName: "bag-handle-outline", color: "#FFB86A", label: "Amazon" },
  upi: { iconName: "qr-code-outline", color: "#6FE0C2", label: "UPI" },
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
          className="rounded-[24px] px-4 py-4"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            borderColor: "rgba(255,255,255,0.10)",
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.18,
            shadowRadius: 14,
            elevation: 6,
          }}
        >
          <View className="relative overflow-hidden rounded-[24px]">
            {visualDisabled ? (
              <View pointerEvents="none" className="absolute inset-0 z-10">
                <View className="absolute inset-0 rounded-[24px] bg-black/35" />
                <LinearGradient
                  colors={["rgba(0,0,0,0.00)", "rgba(0,0,0,0.12)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="absolute inset-0 rounded-[24px]"
                />
              </View>
            ) : null}
            <View className="flex-row items-start justify-between">
              <View className="h-[48px] w-[48px] items-center justify-center rounded-[14px] border border-white/12 bg-[#171B25]">
                <Ionicons name={meta.iconName} size={22} color={meta.color} />
              </View>

              {locked ? (
                <Animated.View
                  style={lockedPillStyle}
                  className="ml-2 min-w-[124px] rounded-full border border-white/10 bg-black/35 px-3 py-2"
                >
                  <View className="flex-row items-center">
                    <View className="h-4 w-4 items-center justify-center rounded-full bg-[#FFD36A]/20">
                      <Ionicons
                        name="lock-closed-outline"
                        size={10}
                        color="#E2BE6A"
                      />
                    </View>
                    <View className="ml-1.5">
                      <Text className="text-[11px] font-extrabold text-[#F5F7FF]">
                        {`Need ${missingCoins} coins`}
                      </Text>
                      <Text className="text-[10px] font-semibold text-[#B8C0D4]">
                        {`Req: ${voucher.coinCost}`}
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              ) : (
                <Animated.View
                  style={chipAnimatedStyle}
                  className="ml-2 rounded-full border border-[#FFD700]/30 bg-[#2A2414] px-2.5 py-1"
                >
                  <Text className="text-[11px] font-extrabold text-[#FFD700]">{`🔥 ${voucher.coinCost}`}</Text>
                </Animated.View>
              )}
            </View>

            <Text
              className="mt-3 text-[27px] font-extrabold leading-[31px] text-[#F5F7FF]"
              style={{ fontFamily: "Sora_800ExtraBold" }}
            >{`₹${voucher.amount}`}</Text>
            <Text
              className="mt-1 text-[15px] font-extrabold leading-[20px] text-white"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Redeem Code
            </Text>

            <Text
              className="mt-1 text-[12px] font-semibold text-[#AAB5CF]"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              {meta.label}
            </Text>

            <Text
              className="mt-3 text-[11px] font-medium text-[#8C96AC]"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              {hintText}
            </Text>
          </View>
        </SurfaceCard>
      </PressableScale>
    </View>
  );
}
