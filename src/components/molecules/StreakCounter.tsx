import React, { useEffect, useMemo, useState } from "react";
import { Text, UIManager, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import StreakDay from "../streak/StreakDay";
import useRemoteConfig from "../../hooks/useRemoteConfig";
import { defaultConfig } from "../../config/remoteConfig";

let LottieView: any = null;
try {
  LottieView = require("lottie-react-native").default;
} catch (_error) {
  LottieView = null;
}

const flameAnimation = require("../../theme/animations/fire_glow.json");

const isLottieNativeAvailable = (() => {
  try {
    const getConfig = UIManager?.getViewManagerConfig;
    if (typeof getConfig !== "function") return false;
    return Boolean(
      getConfig("LottieAnimationView") || getConfig("RCTLottieAnimationView")
    );
  } catch (_error) {
    return false;
  }
})();

type Props = {
  streakCount: number;
  ignite?: boolean;
  celebrate?: boolean;
  dailyQuizCompleted?: boolean;
  reducedMotionEnabled?: boolean;
};

const OFFSETS = [0, -8, -2, 8, 2, -8, 0];

export default function StreakCounter({
  streakCount,
  ignite = false,
  celebrate = false,
  dailyQuizCompleted = false,
  reducedMotionEnabled = false,
}: Props) {
  const { config: remoteConfig } = useRemoteConfig();
  const streakTarget = Math.max(
    1,
    Number(remoteConfig?.streakDays ?? defaultConfig.streakDays)
  );
  const flameScale = useSharedValue(1);
  const flameGlow = useSharedValue(0.28);
  const [waveToken, setWaveToken] = useState(0);

  useEffect(() => {
    setWaveToken((prev) => prev + 1);
  }, [streakCount]);

  useEffect(() => {
    const targetScale = Math.min(1.34, 1 + streakCount * 0.04);

    if (ignite || celebrate) {
      flameScale.value = withSequence(
        withSpring(1.18, { damping: 11, stiffness: 220 }),
        withSpring(targetScale, { damping: 13, stiffness: 200 })
      );
      flameGlow.value = withSequence(
        withTiming(0.62, { duration: 220 }),
        withTiming(0.3, { duration: 280 })
      );
      return;
    }

    if (reducedMotionEnabled) {
      flameScale.value = withTiming(targetScale, { duration: 160 });
      flameGlow.value = withTiming(0.28, { duration: 160 });
      return;
    }

    flameScale.value = withRepeat(
      withSequence(
        withTiming(targetScale + 0.04, { duration: 900 }),
        withTiming(targetScale, { duration: 900 })
      ),
      -1,
      false
    );
    flameGlow.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 880 }),
        withTiming(0.25, { duration: 880 })
      ),
      -1,
      false
    );
  }, [
    celebrate,
    flameGlow,
    flameScale,
    ignite,
    reducedMotionEnabled,
    streakCount,
  ]);

  const flameStyle = useAnimatedStyle(() => ({
    transform: [{ scale: flameScale.value }],
  }));

  const flameGlowStyle = useAnimatedStyle(() => ({
    opacity: flameGlow.value,
  }));

  const todayIndex = Math.min(
    streakTarget,
    streakCount >= streakTarget ? streakTarget : streakCount + 1
  );

  const dayItems = useMemo(
    () =>
      Array.from({ length: streakTarget }, (_, idx) => {
        const day = idx + 1;
        if (day <= streakCount) {
          return { day, status: "completed", lockedBlur: false };
        }
        if (day === todayIndex) {
          return { day, status: "today", lockedBlur: false };
        }
        return {
          day,
          status: "locked",
          lockedBlur: day === streakTarget && streakCount < streakTarget,
        };
      }),
    [streakCount, streakTarget, todayIndex]
  );

  const supercharged = dailyQuizCompleted || celebrate;
  const flameGlowColor = supercharged ? "bg-[#B026FF]/35" : "bg-[#FF5A2F]/35";
  const flameBorderColor = supercharged
    ? "border-[#B38BFF]/45"
    : "border-[#FF7A3D]/40";
  const flameBg = supercharged ? "bg-[#261B3D]/80" : "bg-[#2A1712]/80";
  const flameColor = supercharged ? "#C4A6FF" : "#FF9A3D";

  return (
    <View className="rounded-[20px] border border-white/10 bg-[#151A24] px-3 pb-3 pt-4">
      <View className="items-center">
        <View className="rounded-full border border-white/12 bg-[#1A1524] p-2.5">
          <Animated.View
            style={flameGlowStyle}
            className={`absolute -inset-2 rounded-full ${flameGlowColor}`}
          />
          <Animated.View
            style={flameStyle}
            className={`h-[76px] w-[76px] items-center justify-center rounded-full border ${flameBorderColor} ${flameBg}`}
          >
            {LottieView && isLottieNativeAvailable ? (
              <LottieView
                source={flameAnimation}
                autoPlay
                loop={!reducedMotionEnabled}
                style={{ width: 70, height: 70 }}
              />
            ) : (
              <Ionicons name="flame" size={38} color={flameColor} />
            )}
          </Animated.View>
        </View>

        <Text className="mt-3 text-[28px] font-black leading-[30px] text-white">
          {streakCount} Day Streak
        </Text>
        <Text className="mt-1 text-[12px] font-semibold text-[#A6B2CA]">
          {dailyQuizCompleted
            ? "You're on fire, Sk!"
            : "Keep the flame alive today"}
        </Text>
      </View>

      <View className="relative mt-4">
        <View className="absolute left-4 right-4 top-[30px] h-[2px] rounded-full bg-white/12" />
        <View className="absolute left-4 right-4 top-[30px] h-[2px] rounded-full bg-[#B026FF]/35" />

        <View className="flex-row items-start justify-between px-0.5">
          {dayItems.map((item, idx) => (
            <View
              key={item.day}
              style={{
                transform: [{ translateY: OFFSETS[idx % OFFSETS.length] ?? 0 }],
              }}
            >
              <StreakDay
                day={item.day}
                status={item.status as any}
                lockedBlur={item.lockedBlur}
                waveToken={waveToken}
                reducedMotionEnabled={reducedMotionEnabled}
                entryDelayMs={item.day * 35}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
