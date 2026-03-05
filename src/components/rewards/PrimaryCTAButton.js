import React, { useCallback, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';

export default function PrimaryCTAButton({ label = 'Start Learning', onPress, disabled = false }) {
  const press = useSharedValue(1);
  const arrowNudge = useSharedValue(0);
  const shine = useSharedValue(0);
  const glow = useSharedValue(1);

  useEffect(() => {
    arrowNudge.value = withRepeat(
      withSequence(withTiming(1, { duration: 900 }), withTiming(0, { duration: 900 })),
      -1,
      true
    );

    shine.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 850, easing: Easing.out(Easing.cubic) }),
        withDelay(3150, withTiming(0, { duration: 0 }))
      ),
      -1,
      false
    );
  }, [arrowNudge, shine]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: press.value }],
    opacity: disabled ? 0.56 : 1,
    shadowOpacity: 0.08 + glow.value * 0.12,
  }));

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: arrowNudge.value * 4 }],
  }));

  const shineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -180 + shine.value * 360 }, { rotate: '-20deg' }],
    opacity: disabled ? 0 : 0.22,
  }));

  const handlePressIn = () => {
    if (disabled) return;
    press.value = withTiming(0.97, { duration: 90 });
    glow.value = withTiming(0.55, { duration: 120 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const handlePressOut = () => {
    if (disabled) return;
    press.value = withSpring(1, { damping: 12, stiffness: 240 });
    glow.value = withTiming(1, { duration: 160 });
  };

  const handlePress = useCallback(() => {
    if (disabled) return;
    onPress?.();
  }, [disabled, onPress]);

  return (
    <Animated.View
      style={[
        containerStyle,
        {
          shadowColor: '#8A6CFF',
          shadowOffset: { width: 0, height: 6 },
          shadowRadius: 12,
          elevation: 4,
        },
      ]}
      className="rounded-full"
    >
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        className="h-14 flex-row items-center justify-center gap-2 overflow-hidden rounded-full px-6"
        style={{
          backgroundColor: 'rgba(28,30,40,0.92)',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.12)',
        }}
      >
        <Animated.View
          pointerEvents="none"
          style={shineStyle}
          className="absolute h-24 w-16 rounded-full bg-white/45"
        />
        <View className="absolute inset-0 rounded-full bg-[#11131C]/42" pointerEvents="none" />
        <Text className="text-[16px] font-extrabold tracking-[0.2px] text-white">{label}</Text>
        <Animated.View style={arrowStyle}>
          <Text className="text-[16px] font-extrabold text-white">→</Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}
