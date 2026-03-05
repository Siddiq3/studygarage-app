import React, { useCallback } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import useReducedMotionPreference from '../../src/hooks/useReducedMotionPreference';

type HapticType = 'none' | 'light' | 'success';

type Props = PressableProps & {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  activeScale?: number;
  hapticType?: HapticType;
};

export default function PressableScale({
  children,
  className = '',
  containerClassName = '',
  disabled = false,
  activeScale = 0.92,
  hapticType = 'light',
  onPress,
  onPressIn,
  onPressOut,
  ...rest
}: Props) {
  const reduceMotion = useReducedMotionPreference();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(
    async (event) => {
      if (disabled) return;

      try {
        if (hapticType === 'light') {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        if (hapticType === 'success') {
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      } catch (_error) {
        // haptics not available on all devices
      }

      onPress?.(event);
    },
    [disabled, hapticType, onPress]
  );

  const handlePressIn = useCallback(
    (event) => {
      if (!disabled) {
        scale.value = withTiming(reduceMotion ? 0.97 : activeScale, { duration: 90 });
      }
      onPressIn?.(event);
    },
    [activeScale, disabled, onPressIn, reduceMotion, scale]
  );

  const handlePressOut = useCallback(
    (event) => {
      if (!disabled) {
        scale.value = withSpring(1, {
          damping: 8,
          stiffness: 280,
          mass: 0.36,
          overshootClamping: false,
        });
      }
      onPressOut?.(event);
    },
    [disabled, onPressOut, scale]
  );

  return (
    <Animated.View style={animatedStyle} className={containerClassName}>
      <Pressable
        {...rest}
        className={className}
        disabled={disabled}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
