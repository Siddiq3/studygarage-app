import React, { useCallback } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import PressableScale from "../ui/PressableScale";
import PremiumText from "./PremiumText";
import { haptics } from "../../services/haptics";
import ShimmerSkeleton from "../ui/ShimmerSkeleton";

type Props = {
  label: string;
  onPress?: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  style?: StyleProp<ViewStyle>;
  className?: string;
};

export default function PremiumButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  style,
  className = "",
}: Props) {
  const handlePress = useCallback(async () => {
    if (disabled || loading) return;
    haptics.trigger("tap");
    // Sound disabled for now.
    // sound.play("tap");
    await onPress?.();
  }, [disabled, loading, onPress]);

  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";

  return (
    <PressableScale
      onPress={handlePress}
      disabled={disabled || loading}
      activeScale={0.98}
      className={`overflow-hidden rounded-full border ${className} ${
        disabled
          ? "border-white/10 bg-white/5 opacity-60"
          : isPrimary
          ? "border-white/15"
          : isSecondary
          ? "border-[#FFD700]/30 bg-[#151A24]"
          : "border-white/12 bg-white/7"
      }`}
      containerStyle={style}
    >
      {isPrimary && !disabled ? (
        <LinearGradient
          colors={["#6D30EA", "#8F74FF", "#00D3A3"]}
          start={{ x: 0, y: 0.2 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0"
        />
      ) : null}
      <View className="min-h-[52px] flex-row items-center justify-center px-5 py-3">
        {loading ? (
          <ShimmerSkeleton
            width={20}
            height={20}
            borderRadius={10}
            baseColor="rgba(255,255,255,0.18)"
            highlightColor="rgba(255,255,255,0.36)"
          />
        ) : (
          <Animated.View>
            <PremiumText variant="button" className="text-white">
              {label}
            </PremiumText>
          </Animated.View>
        )}
      </View>
    </PressableScale>
  );
}
