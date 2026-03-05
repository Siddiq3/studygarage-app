import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
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

export default function CoinAnimatedValue({ value = 0 }) {
  const [displayValue, setDisplayValue] = useState(Math.max(0, value));
  const displayRef = useRef(Math.max(0, value));

  const fromValue = useSharedValue(Math.max(0, value));
  const toValue = useSharedValue(Math.max(0, value));
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);
  const shimmer = useSharedValue(0);

  const applyDisplay = useCallback((next: number) => {
    if (displayRef.current === next) return;
    displayRef.current = next;
    setDisplayValue(next);
  }, []);

  useAnimatedReaction(
    () => progress.value,
    (p) => {
      const next = Math.round(fromValue.value + (toValue.value - fromValue.value) * p);
      runOnJS(applyDisplay)(next);
    },
    [applyDisplay]
  );

  useEffect(() => {
    const safeValue = Math.max(0, value);
    if (safeValue === displayRef.current) return;

    fromValue.value = displayRef.current;
    toValue.value = safeValue;
    progress.value = 0;

    shimmer.value = 0;
    shimmer.value = withTiming(1, {
      duration: 560,
      easing: Easing.out(Easing.cubic),
    });

    progress.value = withTiming(
      1,
      {
        duration: 560,
        easing: Easing.out(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          scale.value = withSequence(
            withTiming(1.08, { duration: 120 }),
            withSpring(1, { damping: 13, stiffness: 220, mass: 0.72 })
          );
        }
      }
    );
  }, [fromValue, progress, scale, shimmer, toValue, value]);

  const wrapperStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: shimmer.value > 0.01 ? 0.2 : 0,
    transform: [{ translateY: -4 - shimmer.value * 12 }],
  }));

  return (
    <AnimatedView
      style={wrapperStyle}
      className="relative flex-row items-center rounded-full border border-[#FFD700]/30 bg-[#2A2312] px-3 py-1.5"
    >
      <Ionicons name="logo-bitcoin" size={14} color="#FFD700" />
      <Text className="ml-1.5 text-[12px] font-extrabold text-[#FFD700]">
        {displayValue}
      </Text>

      <AnimatedView pointerEvents="none" style={shimmerStyle} className="absolute right-2">
        <Ionicons name="sparkles" size={10} color="#FFD700" />
      </AnimatedView>
    </AnimatedView>
  );
}
