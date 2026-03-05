import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";
import Coin from "../rewards/Coin";
import useQuestionTimer from "../../features/quiz/useQuestionTimer";

export default function PremiumQuizTopBar({
  currentIndex = 1,
  totalQuestions = 1,
  progressMode = "index",
  sessionLabel = "Quiz Session",
  correctCount = 0,
  targetCorrect = 7,
  helperText = "",
  timeLeft = 0,
  onBackPress,
  showTimer = true,
  timerSeconds = 10,
  timerKey = 0,
  timerPaused = false,
  onTimeUp,
  coinBalance = null,
}) {
  const reducedMotionEnabled = useReducedMotionPreference();
  const pulse = useSharedValue(1);
  const managedTimerEnabled = showTimer && typeof onTimeUp === "function";
  const managedTimeLeft = useQuestionTimer({
    initialSeconds: timerSeconds,
    resetKey: timerKey,
    paused: timerPaused,
    enabled: managedTimerEnabled,
    onExpire: onTimeUp,
  });

  const clampedTotal = Math.max(1, totalQuestions);
  const clampedTarget = Math.max(1, targetCorrect);
  const progressPct =
    progressMode === "goal"
      ? Math.max(0, Math.min((correctCount / clampedTarget) * 100, 100))
      : Math.max(0, Math.min((currentIndex / clampedTotal) * 100, 100));
  const resolvedTimeLeft = showTimer
    ? managedTimerEnabled
      ? managedTimeLeft
      : timeLeft
    : 0;
  const danger = showTimer && resolvedTimeLeft <= 5;

  useEffect(() => {
    if (!showTimer || reducedMotionEnabled || !danger) {
      pulse.value = withTiming(1, { duration: 120 });
      return;
    }

    pulse.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 280, easing: Easing.out(Easing.quad) }),
        withTiming(1, { duration: 280, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );
  }, [danger, pulse, reducedMotionEnabled, showTimer]);

  const timerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <View className="mb-3 rounded-[20px] border border-white/10 bg-white/6 px-4 py-2.5">
      <View className="flex-row items-center justify-between">
        <Pressable
          onPress={onBackPress}
          className="h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/6"
        >
          <Ionicons name="arrow-back" size={18} color="#F4F7FF" />
        </Pressable>

        <Text
          numberOfLines={1}
          className="mx-3 flex-1 text-center text-[12px] font-bold uppercase tracking-[1px] text-white/70"
        >
          {progressMode === "goal"
            ? sessionLabel
            : `Question ${currentIndex}/${clampedTotal}`}
        </Text>

        <View className="flex-row items-center">
          {showTimer ? (
            <Animated.View
              style={timerStyle}
              className={`rounded-full border px-3 py-1 ${
                danger
                  ? "border-[#FF3B30]/70 bg-[#3B1918]"
                  : "border-white/10 bg-white/7"
              }`}
            >
              <Text
                className={`text-[12px] font-extrabold ${
                  danger ? "text-[#FF8A84]" : "text-[#C7D2E9]"
                }`}
              >
                {resolvedTimeLeft}s
              </Text>
            </Animated.View>
          ) : null}
          {coinBalance !== null ? (
            <View
              className={`flex-row items-center rounded-full border border-[#FFD700]/30 bg-[#2A2312] px-2 py-1 ${
                showTimer ? "ml-2" : ""
              }`}
            >
              <Coin size={12} compact />
              <Text className="ml-1 text-[11px] font-extrabold text-[#FFD700]">
                {coinBalance}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <View className="mt-2.5 h-[7px] overflow-hidden rounded-full bg-white/8">
        <View
          className={`h-full ${danger ? "bg-[#FF3B30]" : "bg-[#00FFA3]"}`}
          style={{ width: `${progressPct}%` }}
        />
      </View>

      {progressMode === "goal" ? (
        <View className="mt-2 flex-row items-center justify-between">
          <Text className="text-[12px] font-semibold text-white/78">
            Correct: {Math.min(correctCount, clampedTarget)} / {clampedTarget}
          </Text>
          {helperText ? (
            <Text className="ml-3 flex-1 text-right text-[11px] font-medium text-white/58">
              {helperText}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
