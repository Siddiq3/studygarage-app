import React, { useCallback, useEffect } from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Animated, {
  interpolateColor,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  children: React.ReactNode;
  className?: string;
  onPress?: (event: GestureResponderEvent) => void;
  selected?: boolean;
  disabled?: boolean;
  showCheck?: boolean;
  checkNode?: React.ReactNode;
  hitSlop?: number;
};

const AnimatedView = Animated.createAnimatedComponent(View);

export default function AnimatedActionCard({
  children,
  className = '',
  onPress,
  selected = false,
  disabled = false,
  showCheck = false,
  checkNode,
  hitSlop = 8,
}: Props) {
  const pressScale = useSharedValue(1);
  const pressDepth = useSharedValue(0);
  const selectedProgress = useSharedValue(selected ? 1 : 0);
  const checkProgress = useSharedValue(showCheck && selected ? 1 : 0);

  useEffect(() => {
    selectedProgress.value = withTiming(selected ? 1 : 0, { duration: 220 });
    if (selected) {
      pressScale.value = withSequence(
        withSpring(1.05, { damping: 10, stiffness: 260, mass: 0.36 }),
        withSpring(1, { damping: 12, stiffness: 220, mass: 0.4 })
      );
    }
  }, [pressScale, selected, selectedProgress]);

  useEffect(() => {
    checkProgress.value = withTiming(showCheck && selected ? 1 : 0, { duration: 200 });
  }, [checkProgress, selected, showCheck]);

  const handlePress = useCallback(
    async (event: GestureResponderEvent) => {
      if (disabled) return;
      try {
        await Haptics.selectionAsync();
      } catch (_error) {
        // keep action non-blocking when haptics is unavailable
      }
      onPress?.(event);
    },
    [disabled, onPress]
  );

  const onPressIn = () => {
    if (disabled) return;
    pressScale.value = withTiming(0.92, { duration: 90 });
    pressDepth.value = withTiming(1, { duration: 90 });
  };

  const onPressOut = () => {
    if (disabled) return;
    pressScale.value = withSpring(1, { damping: 9, stiffness: 260, mass: 0.38, overshootClamping: false });
    pressDepth.value = withTiming(0, { duration: 130 });
  };

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }, { translateY: interpolate(pressDepth.value, [0, 1], [0, 1.6]) }],
    borderColor: interpolateColor(selectedProgress.value, [0, 1], ['rgba(255,255,255,0.10)', 'rgba(176,38,255,0.62)']),
    elevation: interpolate(pressDepth.value, [0, 1], [4, 2]),
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: selectedProgress.value * 0.92,
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: checkProgress.value,
    transform: [{ scale: 0.7 + checkProgress.value * 0.3 }],
  }));

  return (
    <AnimatedView
      className={`relative overflow-hidden rounded-[22px] border bg-[#1A1D27] ${className}`}
      style={[
        {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 8,
        },
        containerStyle,
      ]}
    >
      <AnimatedView pointerEvents="none" className="absolute inset-0" style={glowStyle}>
        <LinearGradient
          colors={['rgba(176,38,255,0.10)', 'rgba(91,124,255,0.08)', 'rgba(255,255,255,0.00)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0"
        />
      </AnimatedView>

      <Pressable
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled}
        hitSlop={hitSlop}
      >
        {children}
      </Pressable>

      {showCheck ? (
        <AnimatedView className="absolute right-2 top-2 rounded-full bg-[#00FFA3] p-1.5" style={checkStyle}>
          {checkNode}
        </AnimatedView>
      ) : null}
    </AnimatedView>
  );
}
