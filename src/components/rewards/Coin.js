import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

export default function Coin({ size = 26, label = 'C', compact = false }) {
  const shine = useSharedValue(0);
  const glow = useSharedValue(0.4);

  useEffect(() => {
    shine.value = withRepeat(withTiming(1, { duration: 1800, easing: Easing.linear }), -1, false);
    glow.value = withRepeat(withSequence(withTiming(0.72, { duration: 900 }), withTiming(0.4, { duration: 900 })), -1, false);
  }, [glow, shine]);

  const shineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -size + shine.value * size * 2.35 }, { rotate: '-20deg' }],
    opacity: 0.42,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  return (
    <View className="items-center justify-center">
      <Animated.View
        style={[glowStyle, { width: size + 12, height: size + 12 }]}
        className="pointer-events-none absolute rounded-full bg-[#FFD700]/35"
      />
      <View
        className="items-center justify-center overflow-hidden rounded-full border border-[#E8B51F]"
        style={{ width: size, height: size }}
      >
        <LinearGradient
          colors={['#7D5600', '#D79E00', '#FFD700', '#FDE68A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0"
        />
        <View className="absolute rounded-full border border-white/30" style={{ width: size * 0.72, height: size * 0.72 }} />
        <Animated.View
          pointerEvents="none"
          style={[shineStyle, { position: 'absolute', width: Math.max(6, size * 0.28), height: size * 1.2 }]}
          className="rounded-full bg-white"
        />
        <Text className={`${compact ? 'text-[9px]' : 'text-[11px]'} font-black text-[#5A4300]`}>{label}</Text>
      </View>
    </View>
  );
}
