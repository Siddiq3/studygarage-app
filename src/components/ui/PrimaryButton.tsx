import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cn } from "./cn";
import PressableScale from "./PressableScale";
import PremiumText from "../premium/PremiumText";
import ShimmerSkeleton from "./ShimmerSkeleton";

type Props = {
  label?: string;
  onPress?: () => void;
  variant?: "primary" | "ghost" | string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export default function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  className,
  textClassName,
  style,
  children,
}: Props) {
  const isGhost = variant === "ghost";

  const content = (
    <View className="min-h-[56px] flex-row items-center justify-center rounded-[999px] px-5 py-3">
      {loading ? (
        <ShimmerSkeleton
          width={20}
          height={20}
          borderRadius={10}
          baseColor="rgba(255,255,255,0.18)"
          highlightColor="rgba(255,255,255,0.36)"
        />
      ) : children ? (
        children
      ) : (
        <PremiumText
          variant="button"
          className={cn(
            isGhost ? "text-ds-text-primary" : "text-ds-text-primary",
            textClassName
          )}
          numberOfLines={1}
        >
          {label}
        </PremiumText>
      )}
    </View>
  );

  if (isGhost) {
    return (
      <PressableScale
        onPress={onPress}
        disabled={disabled || loading}
        className={cn(
          "overflow-hidden rounded-[999px] border border-ds-border-subtle bg-ds-surface-base",
          disabled ? "bg-ds-interaction-disabled-bg" : "",
          className
        )}
        hapticType="tap"
        soundOnPress
        containerStyle={style}
      >
        {content}
      </PressableScale>
    );
  }

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled || loading}
      hapticType="tap"
      soundOnPress
      className={cn(
        "overflow-hidden rounded-[999px] border border-ds-border-subtle",
        className
      )}
      containerStyle={style}
    >
      <LinearGradient
        colors={["rgba(176,38,255,0.34)", "rgba(124,92,255,0.18)"]}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 1, y: 1 }}
        className={cn("rounded-[999px]", disabled ? "opacity-60" : "")}
      >
        <View className="rounded-[999px] bg-[#1B1D27]/92">{content}</View>
      </LinearGradient>
    </PressableScale>
  );
}
