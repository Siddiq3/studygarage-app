import { Dimensions, PixelRatio } from 'react-native';
import { colors } from './colors';
import { radii } from './radii';
import { spacing } from './spacing';
import { shadows } from './shadows';

const baseWidth = 390;

function clamp(min: number, value: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export const motion = {
  duration: {
    fast: 140,
    medium: 220,
    slow: 320,
    ritual: 520,
  },
  easing: {
    standard: [0.2, 0.0, 0, 1],
    emphasized: [0.16, 1, 0.3, 1],
  },
  interaction: {
    pressedScale: 0.98,
    modalBackdropOpacity: 0.55,
  },
} as const;

export const typographyScale = {
  display: { min: 30, max: 42, lineRatio: 1.08, tracking: -0.5, weight: '900' as const },
  title: { min: 20, max: 30, lineRatio: 1.15, tracking: -0.2, weight: '800' as const },
  subtitle: { min: 15, max: 20, lineRatio: 1.24, tracking: 0.1, weight: '700' as const },
  body: { min: 13, max: 17, lineRatio: 1.42, tracking: 0, weight: '500' as const },
  caption: { min: 11, max: 13, lineRatio: 1.35, tracking: 0.2, weight: '600' as const },
  overline: { min: 10, max: 12, lineRatio: 1.2, tracking: 1.1, weight: '700' as const, uppercase: true },
  button: { min: 14, max: 17, lineRatio: 1.2, tracking: 0.2, weight: '700' as const },
  metric: { min: 26, max: 40, lineRatio: 1.08, tracking: -0.5, weight: '800' as const },
  mono: { min: 14, max: 18, lineRatio: 1.25, tracking: 1, weight: '700' as const },
} as const;

export function getResponsiveSize(min: number, max: number, fontScale = PixelRatio.getFontScale()) {
  const { width } = Dimensions.get('window');
  const widthFactor = clamp(0.88, width / baseWidth, 1.15);
  const scaled = min + (max - min) * ((widthFactor - 0.88) / (1.15 - 0.88));
  return clamp(min, scaled / clamp(0.9, fontScale, 1.32), max);
}

export const premiumTokens = {
  colors,
  spacing,
  radii,
  shadows,
  motion,
  typographyScale,
  surface: {
    elevated: {
      backgroundColor: colors.surface.strong,
      borderColor: colors.border.subtle,
      borderWidth: 1,
      borderRadius: radii.xl,
    },
    glass: {
      backgroundColor: colors.surface.base,
      borderColor: colors.border.subtle,
      borderWidth: 1,
      borderRadius: radii.lg,
    },
  },
} as const;

export type PremiumTokens = typeof premiumTokens;
