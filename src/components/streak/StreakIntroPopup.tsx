import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import PressableScale from "../ui/PressableScale";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";
import useRemoteConfig from "../../hooks/useRemoteConfig";
import { defaultConfig } from "../../config/remoteConfig";

type Props = {
  visible: boolean;
  streakCount?: number;
  onClose: () => void;
};

const EMBER = "#C4481A";
const BOARD = "#14342A";
const CLOSE_MS = 200;
const TILTS = ["-4deg", "3deg", "-2deg", "4deg"];

export default function StreakIntroPopup({ visible, onClose }: Props) {
  const reducedMotion = useReducedMotionPreference();
  const insets = useSafeAreaInsets();
  const { config } = useRemoteConfig();
  const [isMounted, setIsMounted] = useState(visible);

  const screen = useSharedValue(0);
  const flame = useSharedValue(0);
  const content = useSharedValue(0);

  const milestones = useMemo(
    () =>
      [...(config?.streakMilestones ?? defaultConfig.streakMilestones)]
        .sort((a, b) => a.days - b.days)
        .slice(0, 4),
    [config?.streakMilestones]
  );

  useEffect(() => {
    if (!visible) {
      screen.value = withTiming(0, { duration: CLOSE_MS });
      const timer = setTimeout(() => setIsMounted(false), CLOSE_MS + 40);
      return () => clearTimeout(timer);
    }

    setIsMounted(true);
    if (reducedMotion) {
      screen.value = 1;
      flame.value = 1;
      content.value = 1;
      return undefined;
    }
    flame.value = 0;
    content.value = 0;
    screen.value = withTiming(1, { duration: 220 });
    flame.value = withDelay(
      120,
      withSpring(1, { damping: 8, stiffness: 140, mass: 0.8 })
    );
    content.value = withDelay(
      320,
      withTiming(1, { duration: 340, easing: Easing.out(Easing.cubic) })
    );
    return undefined;
  }, [visible, reducedMotion]);

  const screenStyle = useAnimatedStyle(() => ({ opacity: screen.value }));
  const flameStyle = useAnimatedStyle(() => ({
    opacity: Math.min(1, flame.value * 2),
    transform: [{ scale: 0.4 + flame.value * 0.6 }, { rotate: "-6deg" }],
  }));
  const contentStyle = useAnimatedStyle(() => ({
    opacity: content.value,
    transform: [{ translateY: (1 - content.value) * 18 }],
  }));

  if (!isMounted) return null;

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
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 18,
          paddingHorizontal: 20,
        },
      ]}
    >
      <StatusBar style="light" />
      <View className="flex-1 justify-center">
        <Animated.View style={[flameStyle, { alignSelf: "flex-start" }]}>
          <Ionicons name="flame" size={112} color="#F2B632" />
        </Animated.View>

        <Animated.View style={contentStyle}>
          <Text className="mt-2 text-[44px] leading-[47px] font-sg-display tracking-[-1px] text-[#F4EFE2]">
            Don't break the chain.
          </Text>
          <Text className="mt-3 text-[16px] leading-[23px] font-sg-medium text-[#F4EFE2]">
            Do both today and your streak grows.
          </Text>

          <View className="mt-5 flex-row gap-2.5">
            <View className="flex-1 rounded-[16px] bg-[#F4EFE2] p-4">
              <Ionicons name="help-circle" size={24} color={EMBER} />
              <Text className="mt-2 text-[20px] font-sg-display text-[#14342A]">1 quiz</Text>
            </View>
            <View className="flex-1 rounded-[16px] bg-[#F4EFE2] p-4">
              <Ionicons name="timer" size={24} color={EMBER} />
              <Text className="mt-2 text-[20px] font-sg-display text-[#14342A]">30 min</Text>
            </View>
          </View>

          <Text className="mb-3 mt-6 text-[16px] font-sg-bold text-[#14342A]">
            Keep going, get paid in coins
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {milestones.map((item, index) => (
              <View
                key={item.days}
                className="rounded-[12px] bg-[#F2B632] px-3 py-2"
                style={{ transform: [{ rotate: TILTS[index % TILTS.length] }] }}
              >
                <Text className="text-[14px] font-sg-bold text-[#14342A]">
                  {item.days} days +{item.bonusCoins}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </View>

      <PressableScale
        onPress={onClose}
        activeScale={0.98}
        className="min-h-[56px] items-center justify-center rounded-[16px] bg-[#14342A]"
      >
        <Text className="text-[17px] font-sg-bold text-[#F2B632]">I'm in</Text>
      </PressableScale>
    </Animated.View>
  );
}
