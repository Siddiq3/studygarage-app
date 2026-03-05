import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const statusStyles = {
  completed: {
    border: 'border-[#B026FF]/80',
    text: 'text-white',
  },
  today: {
    border: 'border-[#FF5A2F]',
    text: 'text-white',
  },
  locked: {
    border: 'border-[#434958]',
    text: 'text-[#7B8499]',
  },
};

export default function StreakDay({
  day,
  status = 'locked',
  lockedBlur = false,
  waveToken = 0,
  reducedMotionEnabled = false,
  entryDelayMs = 0,
}) {
  const pulse = useSharedValue(1);
  const glow = useSharedValue(0);
  const entryOpacity = useSharedValue(reducedMotionEnabled ? 1 : 0);
  const entryY = useSharedValue(reducedMotionEnabled ? 0 : 8);
  const ringOpacity = useSharedValue(0);

  useEffect(() => {
    if (reducedMotionEnabled) {
      entryOpacity.value = 1;
      entryY.value = 0;
      return;
    }

    entryOpacity.value = withDelay(entryDelayMs, withTiming(1, { duration: 210 }));
    entryY.value = withDelay(entryDelayMs, withTiming(0, { duration: 220 }));
  }, [entryDelayMs, entryOpacity, entryY, reducedMotionEnabled]);

  useEffect(() => {
    if (status === 'today') {
      if (reducedMotionEnabled) {
        pulse.value = withTiming(1, { duration: 120 });
        glow.value = withTiming(0.3, { duration: 120 });
        ringOpacity.value = withTiming(0.6, { duration: 140 });
        return;
      }

      pulse.value = withRepeat(
        withSequence(withTiming(1.07, { duration: 720 }), withTiming(1, { duration: 720 })),
        -1,
        false
      );
      glow.value = withRepeat(
        withSequence(withTiming(0.55, { duration: 760 }), withTiming(0.2, { duration: 760 })),
        -1,
        false
      );
      ringOpacity.value = withRepeat(
        withSequence(withTiming(1, { duration: 640 }), withTiming(0.55, { duration: 640 })),
        -1,
        false
      );
      return;
    }

    ringOpacity.value = withTiming(0, { duration: 140 });
    glow.value = withTiming(0, { duration: 180 });
    pulse.value = withSpring(1, { damping: 12, stiffness: 220 });
  }, [glow, pulse, reducedMotionEnabled, ringOpacity, status]);

  useEffect(() => {
    if (!waveToken || reducedMotionEnabled) return;

    const delay = day * 55;
    if (status === 'completed') {
      pulse.value = withDelay(
        delay,
        withSequence(
          withSpring(1.09, { damping: 11, stiffness: 260 }),
          withSpring(1, { damping: 13, stiffness: 240 })
        )
      );
      glow.value = withDelay(
        delay,
        withSequence(withTiming(0.66, { duration: 150 }), withTiming(0, { duration: 180 }))
      );
    }

    if (status === 'today') {
      ringOpacity.value = withDelay(
        delay + 40,
        withSequence(withTiming(1, { duration: 160 }), withTiming(0.55, { duration: 220 }))
      );
      pulse.value = withDelay(
        delay + 40,
        withSequence(
          withSpring(1.11, { damping: 10, stiffness: 260 }),
          withSpring(1.03, { damping: 12, stiffness: 220 })
        )
      );
    }
  }, [day, glow, pulse, reducedMotionEnabled, ringOpacity, status, waveToken]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  const ringStyle = useAnimatedStyle(() => ({
    opacity: ringOpacity.value,
    transform: [{ scale: pulse.value }],
  }));

  const entryStyle = useAnimatedStyle(() => ({
    opacity: entryOpacity.value,
    transform: [{ translateY: entryY.value }],
  }));

  const styleGroup = statusStyles[status] || statusStyles.locked;

  return (
    <Animated.View style={entryStyle} className="items-center">
      <Animated.View style={pulseStyle} className="items-center">
        <Animated.View style={glowStyle} className="absolute -inset-1 rounded-full bg-[#FF5A2F]/40" />
        <Animated.View style={ringStyle} className="absolute -inset-1.5 rounded-full border border-[#FF8A5E]/70" />
        <View className={`relative h-11 w-11 items-center justify-center overflow-hidden rounded-full border ${styleGroup.border}`}>
          {status === 'completed' ? (
            <LinearGradient colors={['#411665', '#7B2BCA', '#B026FF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="absolute inset-0" />
          ) : null}

          {status === 'today' ? <View className="absolute inset-[2px] rounded-full border border-[#FF8A5E]/80" /> : null}

          <Text className={`text-[12px] font-black ${styleGroup.text}`}>{day}</Text>

          {lockedBlur ? <View className="absolute inset-0 bg-black/42" /> : null}
        </View>
        <Text className={`mt-1 text-[10px] font-semibold ${styleGroup.text}`}>Day {day}</Text>
      </Animated.View>
    </Animated.View>
  );
}
