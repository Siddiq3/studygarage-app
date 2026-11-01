import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
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
import {
  DayChip,
  headlineFor,
} from "../../components/streak/StreakCelebrationOverlay";
import SGButton from "../../design-system/components/SGButton";
import SGSectionHeader from "../../design-system/components/SGSectionHeader";
import { localStore } from "../../services/storage/localStore";
import useRemoteConfig from "../../hooks/useRemoteConfig";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";
import {
  DEFAULT_STREAK_MILESTONES,
  normalizeMilestones,
} from "../../services/streak/streakMilestones";

const WEEK = 7;
const EMBER = "#C4481A";
const CHALK = "#F4EFE2";

function TaskRow({ icon, title, detail, done, last }) {
  return (
    <View
      className={`min-h-[68px] flex-row items-center px-4 py-3 ${
        last ? "" : "border-b border-sg-border"
      }`}
    >
      <View
        className={`h-10 w-10 items-center justify-center rounded-[12px] ${
          done ? "bg-sg-success" : "bg-sg-emberSoft"
        }`}
      >
        <Ionicons
          name={done ? "checkmark" : icon}
          size={21}
          color={done ? "#FFFCF5" : EMBER}
        />
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-[15px] font-sg-bold text-sg-text">{title}</Text>
        <Text className="mt-0.5 text-[13px] font-sg-medium text-sg-muted">
          {detail}
        </Text>
      </View>
    </View>
  );
}

function MilestoneStop({ milestone, status, daysLeft, last }) {
  const reached = status === "reached";
  const next = status === "next";

  return (
    <View className="flex-row">
      <View className="w-9 items-center">
        <View
          className={`h-9 w-9 items-center justify-center rounded-[12px] ${
            reached ? "bg-sg-board" : next ? "bg-[#C4481A]" : "bg-sg-bg2"
          }`}
        >
          <Ionicons
            name={reached ? "checkmark" : next ? "flame" : "lock-closed"}
            size={next || reached ? 19 : 15}
            color={reached ? "#F2B632" : next ? CHALK : "#5F6A63"}
          />
        </View>
        {last ? null : (
          <View
            className={`my-1 w-[3px] flex-1 rounded-full ${
              reached ? "bg-sg-board" : "bg-sg-bg2"
            }`}
          />
        )}
      </View>
      <View className={`ml-3 flex-1 ${last ? "" : "pb-5"}`}>
        <View className="min-h-[36px] flex-row items-center justify-between">
          <Text
            className={`text-[17px] font-sg-display ${
              status === "locked" ? "text-sg-muted" : "text-sg-text"
            }`}
          >
            {milestone.days} days
          </Text>
          <Text
            className={`text-[15px] font-sg-bold ${
              status === "locked" ? "text-sg-muted" : "text-sg-accent"
            }`}
          >
            +{milestone.bonusCoins} coins
          </Text>
        </View>
        {next ? (
          <Text className="text-[13px] font-sg-semibold text-sg-ember">
            {daysLeft} {daysLeft === 1 ? "day" : "days"} to go
          </Text>
        ) : null}
      </View>
    </View>
  );
}

export default function StreakDetailsScreen({ route, navigation }) {
  const params = route?.params ?? {};
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotionPreference();
  const { config: remoteConfig } = useRemoteConfig();

  const currentStreak = Math.max(0, Number(params.streakCount) || 0);
  const quizDone = Boolean(params.dailyQuizCompleted);
  const usageMinutes = Math.max(0, Number(params.dailyUsageMinutes) || 0);
  const minUsageMinutes = Math.max(1, Number(params.minUsageMinutes) || 30);
  const studyDone = usageMinutes >= minUsageMinutes;
  const todayDone = quizDone && studyDone;

  const milestones = useMemo(
    () =>
      normalizeMilestones(
        params.streakMilestones ??
          remoteConfig?.streakMilestones ??
          remoteConfig?.rewards?.streak?.milestones,
        DEFAULT_STREAK_MILESTONES
      ),
    [params.streakMilestones, remoteConfig]
  );
  const sortedMilestones = useMemo(
    () => [...milestones].sort((a, b) => a.days - b.days),
    [milestones]
  );
  const nextDays = sortedMilestones.find((m) => m.days > currentStreak)?.days;

  const [bestStreak, setBestStreak] = useState(currentStreak);
  const [coinsEarned, setCoinsEarned] = useState(0);

  const weekStart = Math.floor(Math.max(0, currentStreak - 1) / WEEK) * WEEK;
  const days = Array.from({ length: WEEK }, (_, i) => weekStart + i + 1);

  const stamp = useSharedValue(reducedMotion ? 1 : 0);

  useEffect(() => {
    if (reducedMotion) {
      stamp.value = 1;
      return;
    }
    stamp.value = withDelay(
      120,
      withSpring(1, { damping: 9, stiffness: 150, mass: 0.8 })
    );
  }, [reducedMotion, stamp]);

  useEffect(() => {
    let mounted = true;

    const hydrateStreakStats = async () => {
      const persistedStreak = await localStore.getNumber(
        localStore.keys.streakCount,
        currentStreak
      );
      const milestoneClaims = await localStore.getJSON(
        localStore.keys.streakMilestones,
        []
      );
      if (!mounted) return;

      const claims = new Set(
        Array.isArray(milestoneClaims) ? milestoneClaims : []
      );
      setBestStreak(Math.max(currentStreak, persistedStreak));
      setCoinsEarned(
        milestones.reduce(
          (sum, m) => (claims.has(`day${m.days}`) ? sum + m.bonusCoins : sum),
          0
        )
      );
    };

    hydrateStreakStats().catch(() => {});
    return () => {
      mounted = false;
    };
  }, [currentStreak, milestones]);

  const stampStyle = useAnimatedStyle(() => ({
    opacity: Math.min(1, stamp.value * 2.5),
    transform: [
      { scale: 1.7 - stamp.value * 0.7 },
      { rotate: `${-10 + stamp.value * 7}deg` },
    ],
  }));

  const openQuiz = () =>
    navigation.navigate("QuizZoneScreen", {
      stateBoard: params.stateBoard,
      classValue: params.classValue,
    });

  return (
    <View className="flex-1 bg-sg-bg">
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        <View
          className="overflow-hidden rounded-b-[28px] px-5 pb-6"
          style={{ backgroundColor: EMBER, paddingTop: insets.top + 12 }}
        >
          <View
            pointerEvents="none"
            style={{ position: "absolute", right: -60, top: 30, opacity: 0.14 }}
          >
            <Ionicons name="flame" size={330} color="#14342A" />
          </View>

          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="h-11 w-11 items-center justify-center rounded-[14px] bg-[#14342A]/20 active:opacity-60"
          >
            <Ionicons name="arrow-back" size={20} color={CHALK} />
          </Pressable>

          <Animated.View
            style={[stampStyle, { alignSelf: "flex-start", marginTop: 8 }]}
          >
            <Text
              className="font-sg-display text-[#F4EFE2]"
              style={{
                fontSize: 120,
                lineHeight: 128,
                letterSpacing: -4,
                fontVariant: ["tabular-nums"],
              }}
            >
              {currentStreak}
            </Text>
          </Animated.View>
          <Text className="-mt-1 text-[22px] font-sg-display text-[#14342A]">
            day streak
          </Text>
          <Text className="mt-2 text-[26px] leading-[31px] font-sg-display tracking-[-0.4px] text-[#F4EFE2]">
            {headlineFor(currentStreak)}
          </Text>

          <View className="mt-5 flex-row justify-between">
            {days.map((day, index) => (
              <DayChip
                key={day}
                day={day}
                index={index}
                done={day < currentStreak}
                isToday={day === currentStreak}
                animate={!reducedMotion}
              />
            ))}
          </View>
        </View>

        <View className="px-4 pt-6">
          <SGSectionHeader
            title={todayDone ? "Today is locked in" : "To keep it alive today"}
            subtitle={
              todayDone ? "Come back tomorrow for the next day." : "Do both today."
            }
            className="mb-3"
          />
          <View className="overflow-hidden rounded-[18px] border border-sg-border bg-sg-surface">
            <TaskRow
              icon="help-circle-outline"
              title="Finish 1 quiz"
              detail={quizDone ? "Done" : "Any subject counts"}
              done={quizDone}
            />
            <TaskRow
              icon="timer-outline"
              title={`Study ${minUsageMinutes} minutes`}
              detail={`${Math.min(usageMinutes, minUsageMinutes)} of ${minUsageMinutes} min`}
              done={studyDone}
              last
            />
          </View>
          {quizDone ? null : (
            <SGButton label="Start a quiz" onPress={openQuiz} className="mt-3" />
          )}

          <View className="mt-4 flex-row gap-2.5">
            <View className="flex-1 rounded-[16px] bg-sg-board p-4">
              <Text className="text-[30px] leading-[34px] font-sg-display text-[#F4EFE2]">
                {bestStreak}
              </Text>
              <Text className="text-[13px] font-sg-medium text-[#B5C6BB]">
                Best streak
              </Text>
            </View>
            <View className="flex-1 rounded-[16px] bg-sg-board p-4">
              <Text className="text-[30px] leading-[34px] font-sg-display text-[#F2B632]">
                {coinsEarned}
              </Text>
              <Text className="text-[13px] font-sg-medium text-[#B5C6BB]">
                Streak coins earned
              </Text>
            </View>
          </View>

          <SGSectionHeader
            title="Rewards on the way"
            subtitle="Coins land when you hit each one."
            className="mb-4 mt-7"
          />
          {sortedMilestones.map((milestone, index) => (
            <MilestoneStop
              key={milestone.days}
              milestone={milestone}
              daysLeft={milestone.days - currentStreak}
              status={
                milestone.days <= currentStreak
                  ? "reached"
                  : milestone.days === nextDays
                  ? "next"
                  : "locked"
              }
              last={index === sortedMilestones.length - 1}
            />
          ))}
        </View>
      </ScrollView>
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: insets.top,
          backgroundColor: EMBER,
        }}
      />
    </View>
  );
}
