import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { cn } from "./cn";
import PressableScale from "./PressableScale";
import PremiumText from "../premium/PremiumText";
import ShimmerSkeleton from "./ShimmerSkeleton";

type Props = {
  label?: string;
  onPress?: () => void;
  variant?: "primary" | "ghost" | "board" | "boardGhost" | string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const surfaceByVariant: Record<string, string> = {
  primary: "bg-sg-primary",
  ghost: "border border-sg-text/25 bg-transparent",
  board: "bg-[#F2B632]",
  boardGhost: "border border-[#F4EFE2]/30 bg-transparent",
};

// Inline, not a class: Text always carries its own tone class, and class order is not stable.
const textColorByVariant: Record<string, string> = {
  primary: "#FFFCF5",
  ghost: "#1D2A24",
  board: "#14342A",
  boardGhost: "#F4EFE2",
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
  const key = surfaceByVariant[variant] ? variant : "primary";
  const onDark = key === "primary" || key === "boardGhost";

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled || loading}
      hapticType="tap"
      soundOnPress
      activeScale={0.98}
      className={cn(
        "overflow-hidden rounded-[14px]",
        surfaceByVariant[key],
        disabled ? "opacity-45" : "",
        className
      )}
      containerStyle={style}
    >
      <View className="min-h-[52px] flex-row items-center justify-center px-5 py-3">
        {loading ? (
          <ShimmerSkeleton
            width={20}
            height={20}
            borderRadius={10}
            baseColor={onDark ? "rgba(255,252,245,0.25)" : "rgba(29,42,36,0.18)"}
            highlightColor={onDark ? "rgba(255,252,245,0.5)" : "rgba(29,42,36,0.3)"}
          />
        ) : children ? (
          children
        ) : (
          <PremiumText
            variant="button"
            className={textClassName}
            style={{ color: textColorByVariant[key] }}
            numberOfLines={1}
          >
            {label}
          </PremiumText>
        )}
      </View>
    </PressableScale>
  );
}
