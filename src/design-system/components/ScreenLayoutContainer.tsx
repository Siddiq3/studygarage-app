import React, { useEffect, useMemo, type ReactElement } from "react";
import { ScrollView, View, type ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  refreshControl?: ReactElement;
  className?: string;
  contentClassName?: string;
  variant?: "default" | "home" | "wallet" | "onboarding" | "reward";
  scrollViewProps?: ScrollViewProps;
};

const AnimatedView = Animated.createAnimatedComponent(View);

function AnimatedBlob({
  className,
  colorClassName,
  duration,
  xTravel,
  yTravel,
  animate = true,
}: {
  className: string;
  colorClassName: string;
  duration: number;
  xTravel: number;
  yTravel: number;
  animate?: boolean;
}) {
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);

  useEffect(() => {
    if (!animate) {
      tx.value = 0;
      ty.value = 0;
      return;
    }

    tx.value = withTiming(xTravel, { duration });
    ty.value = withTiming(yTravel, { duration: duration + 500 });
  }, [animate, duration, tx, ty, xTravel, yTravel]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
  }));

  return (
    <AnimatedView className={`${className} ${colorClassName}`} style={style} />
  );
}

function GrainOverlay() {
  const dots = useMemo(
    () =>
      Array.from({ length: 54 }).map((_, index) => {
        const x = (index * 37) % 100;
        const y = (index * 53) % 100;
        return {
          id: `grain-${index}`,
          x,
          y,
          size: index % 3 === 0 ? 1.2 : 1,
        };
      }),
    []
  );

  return (
    <View pointerEvents="none" className="absolute inset-0 opacity-[0.035]">
      {dots.map((dot) => (
        <View
          key={dot.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
          }}
        />
      ))}
    </View>
  );
}

export default function ScreenLayoutContainer({
  children,
  scroll = true,
  refreshControl,
  className = "",
  contentClassName = "",
  variant = "default",
  scrollViewProps,
}: Props) {
  const insets = useSafeAreaInsets();
  const reducedMotionEnabled = useReducedMotionPreference();
  const shouldAnimateBackground = !reducedMotionEnabled;

  const gradient = {
    default: ["#121212", "#161821", "#1A1C2E"],
    home: ["#121212", "#171922", "#1A1C2E"],
    wallet: ["#121212", "#181A24", "#1A1C2E"],
    onboarding: ["#121212", "#171924", "#1A1C2E"],
    reward: ["#101114", "#161821", "#1A1C2E"],
  }[variant];

  return (
    <View className={`flex-1 ${className}`}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />

      <AnimatedBlob
        className="pointer-events-none absolute -left-20 top-10 h-[280px] w-[280px] rounded-full"
        colorClassName={
          variant === "reward" ? "bg-[#B026FF]/14" : "bg-[#7C5CFF]/12"
        }
        duration={13200}
        xTravel={40}
        yTravel={20}
        animate={shouldAnimateBackground}
      />
      <AnimatedBlob
        className="pointer-events-none absolute -right-24 top-[280px] h-[300px] w-[300px] rounded-full"
        colorClassName={
          variant === "wallet" ? "bg-[#E9C667]/10" : "bg-[#4B6DFF]/10"
        }
        duration={14800}
        xTravel={-34}
        yTravel={24}
        animate={shouldAnimateBackground}
      />
      <AnimatedBlob
        className="pointer-events-none absolute -bottom-28 left-8 h-[280px] w-[280px] rounded-full"
        colorClassName={
          variant === "home" ? "bg-[#B026FF]/9" : "bg-[#7C5CFF]/8"
        }
        duration={16200}
        xTravel={24}
        yTravel={-24}
        animate={shouldAnimateBackground}
      />

      <GrainOverlay />

      {scroll ? (
        <ScrollView
          {...scrollViewProps}
          refreshControl={refreshControl}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={
            scrollViewProps?.keyboardShouldPersistTaps ?? "handled"
          }
          contentContainerStyle={{
            paddingTop: Math.max(insets.top, 14),
            paddingBottom: Math.max(insets.bottom, 12) + 8,
          }}
          className={contentClassName}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          className={`flex-1 ${contentClassName}`}
          style={{
            paddingTop: Math.max(insets.top, 14),
            paddingBottom: Math.max(insets.bottom, 12) + 8,
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
}
