export const radii = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
  pill: 999,
  round: 9999,
} as const;

export type RadiiTokens = typeof radii;
