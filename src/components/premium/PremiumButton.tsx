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
          ? "border-sg-border bg-sg-bg2 opacity-60"
          : isPrimary
          ? "border-sg-border"
          : isSecondary
          ? "border-[#9A6400]/30 bg-[#FFFCF5]"
          : "border-sg-border bg-sg-bg2"
      }`}
      containerStyle={style}
    >
      {isPrimary && !disabled ? (
        <LinearGradient
          colors={["#17694F", "#17694F", "#1C7C55"]}
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
            baseColor="rgba(29,42,36,0.18)"
            highlightColor="rgba(29,42,36,0.36)"
          />
        ) : (
          <Animated.View>
            <PremiumText variant="button" className="text-sg-text">
              {label}
            </PremiumText>
          </Animated.View>
        )}
      </View>
    </PressableScale>
  );
}
