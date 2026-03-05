export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const spacingScale = [4, 8, 12, 16, 20, 24, 32] as const;

export type SpacingTokens = typeof spacing;
