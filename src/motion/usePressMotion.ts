import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import useReducedMotionPreference from '../hooks/useReducedMotionPreference';
import { motionTokens } from './tokens';

export default function usePressMotion(activeScale = 0.98) {
  const reducedMotionEnabled = useReducedMotionPreference();
  const scale = useSharedValue(1);

  const onPressIn = useCallback(() => {
    if (reducedMotionEnabled) {
      return;
    }
    scale.value = withTiming(activeScale, { duration: 90 });
  }, [activeScale, reducedMotionEnabled, scale]);

  const onPressOut = useCallback(() => {
    if (reducedMotionEnabled) {
      scale.value = 1;
      return;
    }
    scale.value = withSpring(1, motionTokens.spring.press);
  }, [reducedMotionEnabled, scale]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return {
    style,
    onPressIn,
    onPressOut,
  };
}
