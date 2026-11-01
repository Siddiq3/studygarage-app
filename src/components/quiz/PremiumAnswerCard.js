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
    default: 'border-[#F4EFE2]/12 bg-[#F4EFE2]/7',
    pressed: 'border-[#F4EFE2]/30 bg-[#F4EFE2]/14',
    correct: 'border-[#8FD9B4] bg-[#8FD9B4]/18',
    incorrect: 'border-[#F28B76] bg-[#F28B76]/18',
    disabled: 'border-[#F4EFE2]/8 bg-[#F4EFE2]/5 opacity-70',
  };

  const textClassMap = {
    default: 'text-[#F4EFE2]',
    pressed: 'text-[#F4EFE2]',
    correct: 'text-[#F4EFE2]',
    incorrect: 'text-[#F4EFE2]',
    disabled: 'text-[#F4EFE2]',
  };

  // A revealed answer must stay visible while the options are locked.
  const appliedState = state === 'correct' || state === 'incorrect' ? state : disabled ? 'disabled' : state;

  return (
    <Animated.View style={style} className={`mb-3 overflow-hidden rounded-[18px] border ${stateClassMap[appliedState]}`}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        className="min-h-[62px] justify-center px-4 py-3"
      >
        <Text className={`text-[15px] font-sg-bold leading-[22px] ${textClassMap[appliedState]}`}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}
