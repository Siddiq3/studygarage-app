import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import PressableScale from "../ui/PressableScale";
import useRemoteConfig from "../../hooks/useRemoteConfig";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";
import { defaultConfig } from "../../config/remoteConfig";

type Props = {
  visible: boolean;
  streakCount: number;
  streakIconRef?: React.RefObject<View | null>;
  onClose: () => void;
  onMergedToIcon?: () => void;
};

const EMBER = "#C4481A";
const BOARD = "#14342A";
const CHALK = "#F4EFE2";
const MARIGOLD = "#F2B632";
const WEEK = 7;
const CLOSE_MS = 200;

export const headlineFor = (count: number) => {
  if (count <= 0) return "Start your streak today.";
  if (count <= 1) return "Day one. Let's go.";
  if (count <= 3) return "You're locked in.";
  if (count <= 6) return "This is a habit now.";
  if (count <= 13) return "One full week. Huge.";
  if (count <= 29) return "Nobody's stopping you.";
  return "Absolute legend.";
};

export function DayChip({
  day,
  done,
  isToday,
  index,
  animate,
}: {
  day: number;
  done: boolean;
  isToday: boolean;
  index: number;
  animate: boolean;
}) {
  const pop = useSharedValue(animate ? 0 : 1);

  useEffect(() => {
    if (!animate) return;
    pop.value = withDelay(
      520 + index * 70,
      withSpring(1, { damping: 10, stiffness: 190, mass: 0.6 })
    );
  }, [animate]);

  const style = useAnimatedStyle(() => ({
    opacity: Math.min(1, pop.value * 2),
    transform: [
      { scale: pop.value },
      { rotate: `${index % 2 === 0 ? -5 : 5}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[
        style,
        {
          width: 40,
          height: 46,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isToday ? MARIGOLD : done ? CHALK : "rgba(244,239,226,0.16)",
        },
      ]}
    >
      {isToday ? (
        <Ionicons name="flame" size={20} color={BOARD} />
      ) : done ? (
        <Ionicons name="checkmark" size={20} color={EMBER} />
      ) : (
        <Text className="text-[15px] font-sg-bold text-[#F4EFE2]/70">{day}</Text>
      )}
    </Animated.View>
  );
}

// A plain full-screen view, not a Modal: it opens without a new native window.
export default function StreakCelebrationOverlay({
  visible,
  streakCount,
  onClose,
  onMergedToIcon,
}: Props) {
  const { config } = useRemoteConfig();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotionPreference();
  const [isMounted, setIsMounted] = useState(visible);
  const closingRef = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const screen = useSharedValue(0);
  const stamp = useSharedValue(0);
  const lift = useSharedValue(0);
  const sticker = useSharedValue(0);

  const weekStart = Math.floor(Math.max(0, streakCount - 1) / WEEK) * WEEK;
  const days = useMemo(
    () => Array.from({ length: WEEK }, (_, index) => weekStart + index + 1),
    [weekStart]
  );

  const nextMilestone = useMemo(() => {
    const list = config?.streakMilestones ?? defaultConfig.streakMilestones;
    return [...list]
      .sort((a, b) => a.days - b.days)
      .find((item) => item.days > streakCount);
  }, [config?.streakMilestones, streakCount]);

  useEffect(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (!visible) {
      screen.value = withTiming(0, { duration: CLOSE_MS });
      closeTimerRef.current = setTimeout(() => setIsMounted(false), CLOSE_MS + 40);
      return;
    }

    closingRef.current = false;
    setIsMounted(true);
    if (reducedMotion) {
      screen.value = 1;
      stamp.value = 1;
      lift.value = 1;
      sticker.value = 1;
      return;
    }

    stamp.value = 0;
    lift.value = 0;
    sticker.value = 0;
    screen.value = withTiming(1, { duration: 220 });
    stamp.value = withDelay(
      160,
      withSpring(1, { damping: 9, stiffness: 150, mass: 0.8 })
    );
    lift.value = withDelay(
      360,
      withTiming(1, { duration: 320, easing: Easing.out(Easing.cubic) })
    );
    sticker.value = withDelay(
      1050,
      withSequence(
        withSpring(1.08, { damping: 8, stiffness: 200 }),
        withTiming(1, { duration: 140 })
      )
    );
    const hapticTimer = setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {}
      );
    }, 300);
    return () => clearTimeout(hapticTimer);
  }, [visible, reducedMotion]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    []
  );

  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    screen.value = withTiming(0, { duration: CLOSE_MS });
    closeTimerRef.current = setTimeout(() => {
      onMergedToIcon?.();
      onClose();
    }, CLOSE_MS);
  };

  const screenStyle = useAnimatedStyle(() => ({ opacity: screen.value }));
  const stampStyle = useAnimatedStyle(() => ({
    opacity: Math.min(1, stamp.value * 2.5),
    transform: [
      { scale: 1.9 - stamp.value * 0.9 },
      { rotate: `${-10 + stamp.value * 7}deg` },
    ],
  }));
  const liftStyle = useAnimatedStyle(() => ({
    opacity: lift.value,
    transform: [{ translateY: (1 - lift.value) * 18 }],
  }));
  const stickerStyle = useAnimatedStyle(() => ({
    opacity: Math.min(1, sticker.value * 2),
    transform: [{ scale: sticker.value }, { rotate: "-3deg" }],
  }));

  if (!isMounted) return null;

  const toNext = nextMilestone ? nextMilestone.days - streakCount : 0;

  return (
    <Animated.View
      style={[
        screenStyle,
        {
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 70,
          backgroundColor: EMBER,
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 18,
          paddingHorizontal: 20,
        },
      ]}
    >
      <StatusBar style="light" />
      <View pointerEvents="none" style={{ position: "absolute", right: -70, top: 60, opacity: 0.14 }}>
        <Ionicons name="flame" size={440} color={BOARD} />
      </View>

      <View className="flex-row justify-end">
        <Pressable
          onPress={handleClose}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Close"
          className="h-11 w-11 items-center justify-center rounded-[14px] bg-[#14342A]/20 active:opacity-60"
        >
          <Ionicons name="close" size={20} color={CHALK} />
        </Pressable>
      </View>

      <View className="flex-1 justify-center">
        <Animated.View style={[stampStyle, { alignSelf: "flex-start" }]}>
          <Text
            className="font-sg-display text-[#F4EFE2]"
            style={{
              fontSize: 168,
              lineHeight: 176,
              letterSpacing: -6,
              fontVariant: ["tabular-nums"],
            }}
          >
            {streakCount}
          </Text>
        </Animated.View>

        <Animated.View style={liftStyle}>
          <Text className="-mt-2 text-[26px] leading-[30px] font-sg-display text-[#14342A]">
            day streak
          </Text>
          <Text className="mt-3 text-[34px] leading-[38px] font-sg-display tracking-[-0.6px] text-[#F4EFE2]">
            {headlineFor(streakCount)}
          </Text>
        </Animated.View>

        <View className="mt-7 flex-row justify-between">
          {days.map((day, index) => (
            <DayChip
              key={day}
              day={day}
              index={index}
              done={day < streakCount}
              isToday={day === streakCount}
              animate={!reducedMotion}
            />
          ))}
        </View>

        {nextMilestone ? (
          <Animated.View
            style={[stickerStyle, { alignSelf: "flex-start" }]}
            className="mt-7 flex-row items-center rounded-[12px] bg-[#F2B632] px-3.5 py-2.5"
          >
            <Ionicons name="gift" size={18} color={BOARD} />
            <Text className="ml-2 text-[15px] font-sg-bold text-[#14342A]">
              {toNext} {toNext === 1 ? "day" : "days"} to +{nextMilestone.bonusCoins} coins
            </Text>
          </Animated.View>
        ) : null}
      </View>

      <PressableScale
        onPress={handleClose}
        activeScale={0.98}
        className="min-h-[56px] items-center justify-center rounded-[16px] bg-[#14342A]"
      >
        <Text className="text-[17px] font-sg-bold text-[#F2B632]">Keep it going</Text>
      </PressableScale>
    </Animated.View>
  );
}
