import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import PressableScale from "../ui/PressableScale";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";
import {
  DEFAULT_STREAK_MILESTONES,
  getCurrentMilestone,
  getNextMilestone,
  getProgressToNext,
  normalizeMilestones,
} from "../../services/streak/streakMilestones";

const formatDays = (value) => `${value} day${value === 1 ? "" : "s"}`;

export default function StreakBadge({
  streakCount = 1,
  ignite = false,
  celebrate = false,
  progressPct = 0,
  motivationalLine = "Don't break your streak!",
  milestones = DEFAULT_STREAK_MILESTONES,
  currentMilestone = null,
  nextMilestone = null,
}) {
  const reducedMotionEnabled = useReducedMotionPreference();
  const cardScale = useSharedValue(1);
  const progressWidth = useSharedValue(0);
  const nextPulseScale = useSharedValue(1);
  const animatedDay = useSharedValue(Math.max(1, streakCount));
  const [displayDay, setDisplayDay] = useState(Math.max(1, streakCount));
  const previousDayRef = useRef(Math.max(1, streakCount));

  const resolvedMilestones = useMemo(
    () => normalizeMilestones(milestones, DEFAULT_STREAK_MILESTONES),
    [milestones]
  );
  const resolvedCurrentMilestone =
    currentMilestone || getCurrentMilestone(streakCount, resolvedMilestones);
  const resolvedNextMilestone =
    nextMilestone || getNextMilestone(streakCount, resolvedMilestones);
  const segmentStartDays = Math.max(0, resolvedCurrentMilestone?.days || 0);
  const segmentTargetDays = Math.max(
    resolvedNextMilestone?.days ||
      resolvedMilestones[resolvedMilestones.length - 1]?.days ||
      1,
    segmentStartDays + 1
  );
  const computedProgress = resolvedNextMilestone
    ? Math.round(
        getProgressToNext(streakCount, segmentTargetDays, segmentStartDays) *
          100
      )
    : 100;
  const progressValue = Number.isFinite(Number(progressPct))
    ? Math.max(0, Math.min(100, Number(progressPct)))
    : computedProgress;
  const nextRewardLine = resolvedNextMilestone
    ? `Next: ${formatDays(resolvedNextMilestone.days)} -> +${
        resolvedNextMilestone.bonusCoins
      } coins`
    : "All streak milestones unlocked.";

  useEffect(() => {
    if (reducedMotionEnabled) {
      cardScale.value = 1;
      return;
    }
    if (ignite || celebrate) {
      cardScale.value = withSequence(
        withTiming(1.02, { duration: 130 }),
        withSpring(1, { damping: 14, stiffness: 220 })
      );
    }
  }, [cardScale, celebrate, ignite, reducedMotionEnabled]);

  useEffect(() => {
    if (reducedMotionEnabled) {
      progressWidth.value = progressValue;
      return;
    }
    progressWidth.value = withTiming(progressValue, {
      duration: 450,
      easing: Easing.out(Easing.cubic),
    });
  }, [progressValue, progressWidth, reducedMotionEnabled]);

  useEffect(() => {
    const safeDay = Math.max(1, streakCount);
    if (reducedMotionEnabled) {
      animatedDay.value = safeDay;
      setDisplayDay(safeDay);
      previousDayRef.current = safeDay;
      return;
    }

    const start = previousDayRef.current;
    animatedDay.value = start;
    animatedDay.value = withTiming(safeDay, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
    previousDayRef.current = safeDay;
  }, [animatedDay, reducedMotionEnabled, streakCount]);

  useAnimatedReaction(
    () => Math.round(animatedDay.value),
    (current, previous) => {
      if (current !== previous) {
        runOnJS(setDisplayDay)(current);
      }
    }
  );

  useEffect(() => {
    if (!resolvedNextMilestone || reducedMotionEnabled) {
      nextPulseScale.value = 1;
      return;
    }
    nextPulseScale.value = withSequence(
      withTiming(1.03, { duration: 160 }),
      withTiming(1, { duration: 190 })
    );
  }, [nextPulseScale, reducedMotionEnabled, resolvedNextMilestone?.days]);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${Math.max(3, progressWidth.value)}%`,
  }));

  const nextPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: nextPulseScale.value }],
  }));

  return (
    <Animated.View
      style={cardStyle}
      className="mt-1 rounded-[22px] border border-white/10 bg-[#1A1D27] p-4"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="mr-2.5 h-7 w-7 items-center justify-center rounded-full bg-[#2B1A2B]">
            <Ionicons name="flame" size={14} color="#FFB66E" />
          </View>
          <Text className="text-[18px] font-black tracking-tight text-white">
            Learning Streak
          </Text>
        </View>

        <View className="rounded-full border border-[#B026FF]/35 bg-[#27153A] px-3 py-1">
          <Text className="text-[12px] font-extrabold text-[#D8B8FF]">
            Day {displayDay}
          </Text>
        </View>
      </View>

      <Text className="mt-3 text-[12px] font-semibold text-[#B8C2D8]">
        {nextRewardLine}
      </Text>

      <View className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
        <Animated.View
          style={progressStyle}
          className="h-2 rounded-full bg-[#00D9A4]"
        />
      </View>
      <View className="mt-1.5 flex-row items-center justify-between">
        <Text className="text-[11px] font-semibold text-[#A9B4CA]">
          {Math.min(streakCount, segmentTargetDays)}/{segmentTargetDays} days
        </Text>
        <Text className="text-[11px] font-black text-[#FFD57F]">
          {progressValue}%
        </Text>
      </View>

      <View className="mt-4 flex-row flex-wrap justify-between">
        {resolvedMilestones.map((milestone) => {
          const milestoneKey = `day-${milestone.days}`;
          const completed = streakCount >= milestone.days;
          const isNext = resolvedNextMilestone?.days === milestone.days;
          const daysRemaining = Math.max(0, milestone.days - streakCount);

          return (
            <PressableScale
              key={milestoneKey}
              onPress={() => {}}
              activeScale={0.96}
              hapticType="none"
              containerClassName="mb-2 w-[48.5%]"
              className={`rounded-2xl border px-3 py-2.5 ${
                completed
                  ? "border-[#4BCF9B]/45 bg-[#123027]"
                  : isNext
                  ? "border-[#B48CFF]/55 bg-[#221A34]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <Animated.View style={isNext ? nextPulseStyle : undefined}>
                <View className="flex-row items-center justify-between">
                  <Text className="text-[13px] font-black text-white">
                    {formatDays(milestone.days)}
                  </Text>
                  {completed ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#88F6C7"
                    />
                  ) : (
                    <Ionicons
                      name="lock-closed"
                      size={13}
                      color={isNext ? "#D8C5FF" : "#99A4BD"}
                    />
                  )}
                </View>
                <Text className="mt-1 text-[12px] font-semibold text-[#C7D1E6]">
                  +{milestone.bonusCoins} coins
                </Text>
                <Text className="mt-1 text-[11px] font-medium text-[#9AA6BF]">
                  {completed
                    ? "Completed"
                    : isNext
                    ? "Next milestone"
                    : `Need ${daysRemaining} more day${
                        daysRemaining === 1 ? "" : "s"
                      }`}
                </Text>
              </Animated.View>
            </PressableScale>
          );
        })}
      </View>

      <Text className="mt-1 text-[12px] font-medium text-[#9AA6BF]">
        {motivationalLine}
      </Text>
    </Animated.View>
  );
}
