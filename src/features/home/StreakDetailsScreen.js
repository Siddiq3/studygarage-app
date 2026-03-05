import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";
import SGCard from "../../design-system/components/SGCard";
import StreakBadge from "../../components/streak/StreakBadge";
import PressableScale from "../../components/ui/PressableScale";
import { localStore } from "../../services/storage/localStore";
import useRemoteConfig from "../../hooks/useRemoteConfig";
import { defaultConfig } from "../../config/remoteConfig";
import {
  DEFAULT_STREAK_MILESTONES,
  getCurrentMilestone,
  getNextMilestone,
  getProgressToNext,
  normalizeMilestones,
} from "../../services/streak/streakMilestones";

function StatTile({ label, value, accent }) {
  return (
    <View className="mb-3 w-[31.5%] overflow-hidden rounded-[16px] border border-white/10 bg-white/5 px-3 py-3.5">
      <View
        className="absolute right-0 top-0 h-12 w-12 rounded-full"
        style={{ backgroundColor: `${accent}18` }}
      />
      <Text className="text-[10px] font-bold uppercase tracking-[1.1px] text-[#8E98AF]">
        {label}
      </Text>
      <Text className="mt-2 text-[22px] font-black text-white">{value}</Text>
    </View>
  );
}

export default function StreakDetailsScreen({ route, navigation }) {
  const params = route?.params ?? {};
  const { config: remoteConfig } = useRemoteConfig();
  const streakTarget = Math.max(
    1,
    Number(
      params.streakTarget ??
        remoteConfig?.streakDays ??
        defaultConfig.streakDays
    )
  );
  const streakBonusCoins = Math.max(
    0,
    Number(
      params.streakBonusCoins ??
        remoteConfig?.streakBonusCoins ??
        defaultConfig.streakBonusCoins
    )
  );
  const currentStreak = Math.max(0, Number(params.streakCount) || 0);
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
  const currentMilestone = useMemo(
    () => getCurrentMilestone(currentStreak, milestones),
    [currentStreak, milestones]
  );
  const nextMilestone = useMemo(
    () => getNextMilestone(currentStreak, milestones),
    [currentStreak, milestones]
  );
  const displayTarget = nextMilestone?.days || streakTarget;
  const displayBonus = nextMilestone?.bonusCoins ?? streakBonusCoins;
  const fallbackProgress = Math.min(
    100,
    Math.round(
      getProgressToNext(
        currentStreak,
        displayTarget,
        currentMilestone?.days || 0
      ) * 100
    )
  );
  const progressPct = Number.isFinite(Number(params.streakProgressPct))
    ? Math.max(0, Math.min(100, Number(params.streakProgressPct)))
    : fallbackProgress;
  const [bestStreak, setBestStreak] = useState(currentStreak);
  const [streakCoinsEarned, setStreakCoinsEarned] = useState(0);

  const progressFill = useSharedValue(0);
  const shimmerX = useSharedValue(-42);

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

      if (!mounted) {
        return;
      }

      const normalizedClaims = new Set(
        Array.isArray(milestoneClaims) ? milestoneClaims : []
      );
      const earnedCoins = milestones.reduce((sum, milestone) => {
        return normalizedClaims.has(`day${milestone.days}`)
          ? sum + milestone.bonusCoins
          : sum;
      }, 0);
      setBestStreak(Math.max(currentStreak, persistedStreak));
      setStreakCoinsEarned(earnedCoins);
    };

    hydrateStreakStats().catch(() => {});

    return () => {
      mounted = false;
    };
  }, [currentStreak, milestones]);

  useEffect(() => {
    progressFill.value = withTiming(progressPct / 100, {
      duration: 560,
      easing: Easing.out(Easing.cubic),
    });
  }, [progressFill, progressPct]);

  useEffect(() => {
    shimmerX.value = withRepeat(
      withSequence(
        withTiming(188, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
        withTiming(-42, { duration: 1500, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    );
  }, [shimmerX]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${Math.max(2, progressFill.value * 100)}%`,
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerX.value }],
  }));

  const nextRewardText = useMemo(() => {
    if (!nextMilestone) {
      return "Milestone unlocked. Keep going to protect your streak.";
    }
    const daysLeft = Math.max(0, nextMilestone.days - currentStreak);
    return `${daysLeft} day${daysLeft > 1 ? "s" : ""} left for +${
      nextMilestone.bonusCoins
    } streak coins`;
  }, [currentStreak, nextMilestone]);

  return (
    <ScreenLayoutContainer variant="reward" contentClassName="px-4 pb-8" scroll>
      <Animated.View entering={FadeInDown.duration(230)}>
        <SGCard className="mb-4 border-white/10">
          <Text className="text-[11px] font-bold uppercase tracking-[1.2px] text-sg-muted dark:text-sgd-muted">
            Streak Overview
          </Text>
          <Text className="mt-1 text-[30px] font-extrabold leading-[34px] text-sg-text dark:text-sgd-text">
            Learning Streak
          </Text>
          <Text className="mt-1 text-[13px] font-medium text-sg-muted dark:text-sgd-muted">
            Keep your daily momentum by completing quiz + study minutes.
          </Text>

          <View className="mt-4">
            <StreakBadge
              streakCount={currentStreak || 1}
              ignite={params.igniteToday}
              celebrate={Boolean(params.milestoneReached)}
              dailyQuizCompleted={params.dailyQuizCompleted}
              dailyUsageMinutes={params.dailyUsageMinutes || 0}
              minUsageMinutes={params.minUsageMinutes || 30}
              progressPct={progressPct}
              progressLabel={
                params.streakProgressLabel ||
                `Streak Progress: 0/${streakTarget} (0%)`
              }
              motivationalLine={
                params.motivationalLine || "Don't break your streak!"
              }
              milestones={milestones}
              currentMilestone={currentMilestone}
              nextMilestone={nextMilestone}
            />
          </View>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(45).duration(230)}>
        <SGCard className="mb-4 border-white/10 bg-white/[0.03]">
          <Text className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#8E98AF]">
            Streak Stats
          </Text>

          <View className="mt-3 flex-row flex-wrap justify-between">
            <StatTile
              label="Current"
              value={`${currentStreak}d`}
              accent="#FF7A3D"
            />
            <StatTile label="Best" value={`${bestStreak}d`} accent="#B026FF" />
            <StatTile
              label="Streak Coins"
              value={`${streakCoinsEarned}`}
              accent="#FFD700"
            />
          </View>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(80).duration(230)}>
        <SGCard className="mb-4 border-white/10 bg-white/[0.03]">
          <Text className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#8E98AF]">
            Next Reward
          </Text>
          <Text className="mt-1 text-[18px] font-black leading-[22px] text-white">
            +{displayBonus} Coins at {displayTarget} days
          </Text>
          <Text className="mt-1 text-[12px] font-semibold text-[#AEB8CE]">
            {nextRewardText}
          </Text>

          <View className="mt-4 h-[8px] overflow-hidden rounded-full bg-white/8">
            <Animated.View
              style={fillStyle}
              className="h-[8px] overflow-hidden rounded-full"
            >
              <LinearGradient
                colors={["#7E2CFF", "#B026FF", "#FF9A3D"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="h-[8px] w-full rounded-full"
              />
              <Animated.View
                pointerEvents="none"
                style={shimmerStyle}
                className="absolute inset-y-0 left-0 w-8"
              >
                <LinearGradient
                  colors={[
                    "rgba(255,255,255,0)",
                    "rgba(255,255,255,0.42)",
                    "rgba(255,255,255,0)",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="h-full w-full"
                />
              </Animated.View>
            </Animated.View>
          </View>

          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-[12px] font-semibold text-[#B8C0D4]">
              Progress: {Math.max(0, Math.min(currentStreak, displayTarget))}/
              {displayTarget}
            </Text>
            <Text className="text-[12px] font-black text-[#FFD57F]">
              {progressPct}%
            </Text>
          </View>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(60).duration(220)}>
        <View className="items-start">
          <PressableScale
            onPress={() => navigation.goBack()}
            activeScale={0.97}
            className="flex-row items-center px-1 py-1.5"
          >
            <Ionicons name="chevron-back" size={14} color="#9EA8BE" />
            <Text className="ml-1 text-[12px] font-semibold text-[#9EA8BE]">
              Back to Home
            </Text>
          </PressableScale>
        </View>
      </Animated.View>
    </ScreenLayoutContainer>
  );
}
