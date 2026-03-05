import React, { useCallback } from 'react';
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { cn } from './cn';
import useReducedMotionPreference from '../../hooks/useReducedMotionPreference';
import { haptics, type HapticAction } from '../../services/haptics';

type Props = PressableProps & {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  containerStyle?: StyleProp<ViewStyle>;
  activeScale?: number;
  hapticType?: HapticAction | 'none';
  soundOnPress?: boolean;
};

export default function PressableScale({
  children,
  className,
  containerClassName,
  containerStyle,
  activeScale = 0.97,
  hapticType = 'tap',
  soundOnPress = false,
  disabled,
  onPress,
  onPressIn,
  onPressOut,
  ...rest
}: Props) {
  const reducedMotionEnabled = useReducedMotionPreference();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(
    (event) => {
      if (!disabled && !reducedMotionEnabled) {
        scale.value = withTiming(activeScale, { duration: 80 });
      }
      onPressIn?.(event);
    },
    [activeScale, disabled, onPressIn, reducedMotionEnabled, scale]
  );

  const handlePressOut = useCallback(
    (event) => {
      if (!disabled) {
        if (reducedMotionEnabled) {
          scale.value = 1;
        } else {
          scale.value = withSpring(1, {
            damping: 14,
            stiffness: 260,
            mass: 0.6,
          });
        }
      }
      onPressOut?.(event);
    },
    [disabled, onPressOut, reducedMotionEnabled, scale]
  );

  const handlePress = useCallback(
    async (event) => {
      if (!disabled && hapticType !== 'none') {
        haptics.trigger(hapticType);
      }
      if (!disabled && soundOnPress) {
        // Sound disabled for now.
        // sound.play('tap');
      }
      await onPress?.(event);
    },
    [disabled, hapticType, onPress, soundOnPress]
  );

  return (
    <Animated.View className={cn(containerClassName)} style={[containerStyle, animatedStyle]}>
      <Pressable
        {...rest}
        disabled={disabled}
        className={cn(className)}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
