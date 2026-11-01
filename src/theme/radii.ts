export const radii = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  xxl: 26,
  pill: 999,
  round: 9999,
} as const;

export type RadiiTokens = typeof radii;
