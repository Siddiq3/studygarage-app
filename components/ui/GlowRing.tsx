import React, { useEffect } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import useReducedMotionPreference from '../../src/hooks/useReducedMotionPreference';

type Props = {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  ringClassName?: string;
  accent?: 'mint' | 'purple';
};

export default function GlowRing({
  children,
  active = false,
  className = '',
  ringClassName = 'rounded-[20px]',
  accent = 'purple',
}: Props) {
  const reduceMotion = useReducedMotionPreference();
  const pulse = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    if (!active) {
      pulse.value = withTiming(0, { duration: 180 });
      return;
    }

    if (reduceMotion) {
      pulse.value = withTiming(1, { duration: 160 });
      return;
    }

    pulse.value = withRepeat(
      withSequence(withTiming(1, { duration: 850 }), withTiming(0.45, { duration: 850 })),
      -1,
      false
    );
  }, [active, pulse, reduceMotion]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
  }));

  const glowColor = accent === 'mint' ? 'bg-[#1C7C55]/26' : 'bg-[#17694F]/28';
  const ringColors = accent === 'mint' ? ['#DDEFE3', '#1C7C55'] : ['#DDEBE2', '#17694F'];

  return (
    <View className={`relative ${className}`}>
      <Animated.View pointerEvents="none" className={`absolute -inset-1 ${ringClassName} ${glowColor}`} style={glowStyle} />
      {active ? (
        <LinearGradient colors={ringColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className={`p-[1.3px] ${ringClassName}`}>
          <View className={ringClassName}>{children}</View>
        </LinearGradient>
      ) : (
        children
      )}
    </View>
  );
}
