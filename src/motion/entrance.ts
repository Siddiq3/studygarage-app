import { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import useReducedMotionPreference from '../hooks/useReducedMotionPreference';
import { motionTokens } from './tokens';

export function useEntranceMotion(delayMs = 0) {
  const reducedMotionEnabled = useReducedMotionPreference();

  if (reducedMotionEnabled) {
    return {
      entering: FadeInDown.duration(110).delay(delayMs),
      exiting: FadeOutDown.duration(90),
    };
  }

  return {
    entering: FadeInDown
      .duration(motionTokens.duration.medium)
      .delay(delayMs),
    exiting: FadeOutDown.duration(motionTokens.duration.fast),
  };
}
