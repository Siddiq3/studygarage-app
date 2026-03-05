import { Easing } from 'react-native-reanimated';
import { motion } from '../theme/premiumTokens';

export const motionTokens = {
  duration: motion.duration,
  easing: {
    out: Easing.out(Easing.cubic),
    inOut: Easing.inOut(Easing.cubic),
    emphasized: Easing.bezier(...motion.easing.emphasized),
    standard: Easing.bezier(...motion.easing.standard),
  },
  spring: {
    soft: { damping: 16, stiffness: 180, mass: 0.85 },
    press: { damping: 14, stiffness: 260, mass: 0.6 },
    pop: { damping: 12, stiffness: 220, mass: 0.75 },
  },
} as const;
