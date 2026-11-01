import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import SGCard from '../../design-system/components/SGCard';
import PressableScale from '../../components/ui/PressableScale';

const AnimatedView = Animated.createAnimatedComponent(View);

const getMilestoneLevel = (count: number) => {
  if (count >= 10) return 3;
  if (count >= 5) return 2;
  if (count >= 1) return 1;
  return 0;
};

export default function ReferralProgressBar({
  referralsCount = 0,
  onViewMilestones,
}) {
  const previousLevelRef = useRef(getMilestoneLevel(referralsCount));
  const [trackWidth, setTrackWidth] = useState(0);

  const progress = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  const progressRatio = useMemo(
    () => Math.min(referralsCount / 10, 1),
    [referralsCount]
  );

  const nextMilestoneText = useMemo(() => {
    if (referralsCount >= 10) return 'All milestones complete';
    if (referralsCount >= 5) return `${10 - referralsCount} referrals to +1000 coins`;
    if (referralsCount >= 1) return `${5 - referralsCount} referrals to +300 bonus coins`;
    return '1 referral to start earning bonus coins';
  }, [referralsCount]);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(progressRatio, {
      duration: 560,
      easing: Easing.out(Easing.cubic),
    });

    const currentLevel = getMilestoneLevel(referralsCount);
    if (currentLevel > previousLevelRef.current) {
      glowOpacity.value = withSequence(
        withTiming(0.3, { duration: 180 }),
        withTiming(0, { duration: 340 })
      );
    }

    previousLevelRef.current = currentLevel;
  }, [glowOpacity, progress, progressRatio, referralsCount]);

  const fillStyle = useAnimatedStyle(() => {
    const p = Math.max(0.001, progress.value);
    const shift = trackWidth > 0 ? -((1 - p) * trackWidth) / 2 : 0;

    return {
      transform: [{ translateX: shift }, { scaleX: p }],
    };
  });

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: 0.92 + glowOpacity.value * 0.4 }],
  }));

  const marker1 = referralsCount >= 1;
  const marker5 = referralsCount >= 5;
  const marker10 = referralsCount >= 10;

  return (
    <SGCard className="rounded-[18px] border-sg-border bg-sg-surface">
      <View className="flex-row items-center justify-between">
        <Text className="text-[12px] font-sg-bold text-[#1D2A24]">
          Referral Milestones
        </Text>
        <PressableScale
          activeScale={0.96}
          className="rounded-full border border-sg-border bg-[#FFFCF5] px-3 py-1.5"
          onPress={onViewMilestones}
        >
          <Text className="text-[12px] font-sg-bold text-[#1D2A24]">
            View Milestones
          </Text>
        </PressableScale>
      </View>

      <View className="relative mt-4 rounded-full">
        <AnimatedView
          pointerEvents="none"
          style={glowStyle}
          className="absolute -inset-1 rounded-full bg-[#E5A019]/15"
        />

        <View
          onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
          className="h-[8px] overflow-hidden rounded-full border border-sg-border bg-sg-surface"
        >
          <AnimatedView style={fillStyle} className="h-full w-full overflow-hidden">
            <LinearGradient
              colors={['#FBEFD2', '#E5A019', '#E5A019']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              className="h-full w-full"
            />
          </AnimatedView>
        </View>
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <View className="items-center">
          <View
            className={`h-2.5 w-2.5 rounded-full ${
              marker1 ? 'bg-[#E5A019]' : 'bg-sg-text/25'
            }`}
          />
          <Text className="mt-1 text-[12px] font-sg-semibold text-[#1D2A24]">1</Text>
        </View>

        <View className="items-center">
          <View
            className={`h-2.5 w-2.5 rounded-full ${
              marker5 ? 'bg-[#E5A019]' : 'bg-sg-text/25'
            }`}
          />
          <Text className="mt-1 text-[12px] font-sg-semibold text-[#1D2A24]">5</Text>
        </View>

        <View className="items-center">
          <View
            className={`h-2.5 w-2.5 rounded-full ${
              marker10 ? 'bg-[#E5A019]' : 'bg-sg-text/25'
            }`}
          />
          <Text className="mt-1 text-[12px] font-sg-semibold text-[#1D2A24]">10</Text>
        </View>
      </View>

      <Text className="mt-2 text-[12px] font-sg-medium text-[#1D2A24]">
        {nextMilestoneText}
      </Text>
    </SGCard>
  );
}
