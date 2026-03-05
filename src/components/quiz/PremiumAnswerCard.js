import React from 'react';
import { Pressable, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export default function PremiumAnswerCard({
  label,
  onPress,
  disabled = false,
  state = 'default',
}) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withTiming(0.92, { duration: 90 });
  };

  const handlePressOut = () => {
    if (disabled) return;
    scale.value = withSpring(1, { damping: 12, stiffness: 240 });
  };

  const handlePress = async () => {
    if (disabled) return;
    try {
      await Haptics.selectionAsync();
    } catch (_error) {}
    onPress?.();
  };

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const stateClassMap = {
    default: 'border-white/12 bg-white/7',
    pressed: 'border-white/30 bg-white/14',
    correct: 'border-[#00FFA3]/70 bg-[#0F2F25]',
    incorrect: 'border-[#FF3B30]/70 bg-[#3A1A18]',
    disabled: 'border-white/8 bg-white/5 opacity-70',
  };

  const textClassMap = {
    default: 'text-white',
    pressed: 'text-white',
    correct: 'text-[#B9FFE2]',
    incorrect: 'text-[#FFB7B2]',
    disabled: 'text-[#A8B0C4]',
  };

  const appliedState = disabled ? 'disabled' : state;

  return (
    <Animated.View style={style} className={`mb-3 overflow-hidden rounded-[18px] border ${stateClassMap[appliedState]}`}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        className="min-h-[62px] justify-center px-4 py-3"
      >
        <Text className={`text-[15px] font-bold leading-[22px] ${textClassMap[appliedState]}`}>{label}</Text>
      </Pressable>
      {appliedState === 'correct' ? <View className="pointer-events-none absolute inset-0 bg-[#00FFA3]/7" /> : null}
    </Animated.View>
  );
}
