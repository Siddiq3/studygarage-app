import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function ReferralStatsCounter({
  value = 0,
  label = 'Friends Joined',
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimatedRef = useRef(false);

  const progress = useSharedValue(0);
  const scale = useSharedValue(1);

  const applyDisplayValue = useCallback((next: number) => {
    setDisplayValue(next);
  }, []);

  useAnimatedReaction(
    () => progress.value,
    (p) => {
      const next = Math.round(Math.max(0, value) * p);
      runOnJS(applyDisplayValue)(next);
    },
    [value]
  );

  useEffect(() => {
    if (!hasAnimatedRef.current) {
      progress.value = 0;
      progress.value = withTiming(1, {
        duration: 520,
        easing: Easing.out(Easing.cubic),
      });

      scale.value = withSequence(
        withTiming(1.05, { duration: 140 }),
        withSpring(1, { damping: 13, stiffness: 220, mass: 0.72 })
      );

      hasAnimatedRef.current = true;
      return;
    }

    setDisplayValue(Math.max(0, value));
  }, [progress, scale, value]);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedView style={scaleStyle} className="items-start">
      <Text className="text-[10px] font-bold uppercase tracking-[1px] text-[#AAB3C9]">
        {label}
      </Text>
      <Text className="mt-1 text-[27px] font-black text-[#F5F7FF]">
        {displayValue} Friends Joined
      </Text>
    </AnimatedView>
  );
}
