import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

const createSparkles = (count = 10) =>
  Array.from({ length: count }).map((_, index) => {
    const angle = (index / count) * Math.PI * 2;
    const radius = 26 + (index % 3) * 8;
    return {
      id: `sparkle-${index}`,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      delay: index * 22,
      size: 4 + (index % 2),
    };
  });

export default function SparkleBurst({ enabled = true, count = 10 }) {
  const sparkles = useMemo(() => createSparkles(count), [count]);

  if (!enabled) return null;

  return (
    <View className="pointer-events-none absolute inset-0 items-center justify-center">
      {sparkles.map((sparkle) => (
        <SparkleParticle key={sparkle.id} sparkle={sparkle} />
      ))}
    </View>
  );
}

function SparkleParticle({ sparkle }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      sparkle.delay,
      withTiming(1, {
        duration: 360,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [progress, sparkle.delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    opacity: 0.45 * (1 - progress.value),
    transform: [
      { translateX: sparkle.x * progress.value },
      { translateY: sparkle.y * progress.value },
      { scale: 1 - progress.value * 0.2 },
    ],
  }));

  return <Animated.View style={[animatedStyle, { width: sparkle.size, height: sparkle.size }]} className="rounded-full bg-white" />;
}
