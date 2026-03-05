import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

export default function QuizLoadingSkeleton() {
  const pulse = useSharedValue(0.42);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(0.82, { duration: 700 }),
        withTiming(0.42, { duration: 700 })
      ),
      -1,
      true
    );
  }, [pulse]);

  const style = useAnimatedStyle(() => ({
    opacity: pulse.value,
  }));

  return (
    <View className="flex-1">
      <Animated.View style={style} className="mb-4 h-[88px] rounded-[20px] border border-white/10 bg-white/8" />
      {[0, 1, 2, 3].map((idx) => (
        <Animated.View key={`q-skeleton-${idx}`} style={style} className="mb-3 h-[62px] rounded-[18px] border border-white/10 bg-white/8" />
      ))}
    </View>
  );
}
