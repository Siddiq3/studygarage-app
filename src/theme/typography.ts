export const typography = {
  display: {
    xl: {
      fontFamily: 'Inter_800ExtraBold',
      fontSize: 40,
      lineHeight: 44,
      fontWeight: '900',
      letterSpacing: -0.6,
    },
    lg: {
      fontFamily: 'Inter_800ExtraBold',
      fontSize: 34,
      lineHeight: 38,
      fontWeight: '900',
      letterSpacing: -0.5,
    },
  },
  title: {
    lg: {
      fontFamily: 'Inter_700Bold',
      fontSize: 28,
      lineHeight: 32,
      fontWeight: '800',
      letterSpacing: -0.3,
    },
    md: {
      fontFamily: 'Inter_700Bold',
      fontSize: 24,
      lineHeight: 28,
      fontWeight: '700',
      letterSpacing: -0.2,
    },
  },
  body: {
    lg: {
      fontFamily: 'Inter_500Medium',
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '500',
      letterSpacing: 0,
    },
    md: {
      fontFamily: 'Inter_500Medium',
      fontSize: 14,
      lineHeight: 22,
      fontWeight: '500',
      letterSpacing: 0,
    },
  },
  caption: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  micro: {
    upper: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 11,
      lineHeight: 14,
      fontWeight: '600',
      letterSpacing: 1,
      textTransform: 'uppercase' as const,
    },
  },
  button: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  tab: {
    label: {
      fontFamily: 'Inter_500Medium',
      fontSize: 11,
      lineHeight: 14,
      fontWeight: '500',
      letterSpacing: 0.2,
    },
  },
  metric: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
} as const;

export type TypographyTokens = typeof typography;
