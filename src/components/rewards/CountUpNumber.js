import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';
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

export default function CountUpNumber({
  target = 50,
  start = false,
  onComplete,
  showPlus = true,
  suffix = 'Coins',
}) {
  const [display, setDisplay] = useState(0);
  const progress = useSharedValue(0);
  const popScale = useSharedValue(1);
  const glowPulse = useSharedValue(0);

  useEffect(() => {
    if (!start) return;

    setDisplay(0);
    progress.value = 0;
    progress.value = withTiming(
      1,
      { duration: 900, easing: Easing.out(Easing.cubic) },
      (finished) => {
        if (finished && onComplete) {
          popScale.value = withSequence(
            withTiming(1.08, { duration: 120, easing: Easing.out(Easing.cubic) }),
            withSpring(1, { damping: 10, stiffness: 240 })
          );
          glowPulse.value = withSequence(
            withTiming(0.35, { duration: 160, easing: Easing.out(Easing.cubic) }),
            withTiming(0, { duration: 300, easing: Easing.inOut(Easing.quad) })
          );
          runOnJS(onComplete)();
        }
      }
    );
  }, [glowPulse, onComplete, popScale, progress, start]);

  useAnimatedReaction(
    () => progress.value,
    (p) => {
      const next = Math.round(target * p);
      runOnJS(setDisplay)(next);
    },
    [target]
  );

  const popStyle = useAnimatedStyle(() => ({
    transform: [{ scale: popScale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowPulse.value,
    transform: [{ scale: 0.92 + glowPulse.value * 0.25 }],
  }));

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.92, translateY: 10 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 420 }}
      className="items-center"
    >
      <View className="relative px-4">
        <Animated.View style={glowStyle} className="absolute -inset-2 rounded-full bg-white/20" />
        <Animated.View style={popStyle}>
          <Text className="text-[74px] font-black leading-[78px] tracking-[-1.4px] text-[#F5F8FF]">
            {showPlus ? `+${display}` : display}
          </Text>
          <Text className="absolute left-0 right-0 top-[3px] text-center text-[74px] font-black leading-[78px] tracking-[-1.4px] text-[#AEB8CD]/35">
            {showPlus ? `+${display}` : display}
          </Text>
        </Animated.View>
      </View>
      <Text className="mt-1 text-[14px] font-semibold text-[#C6CEE0]">{suffix}</Text>
    </MotiView>
  );
}
