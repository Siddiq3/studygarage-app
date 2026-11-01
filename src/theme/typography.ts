export const typography = {
  display: {
    xl: {
      fontFamily: 'BricolageGrotesque_700Bold',
      fontSize: 40,
      lineHeight: 44,
      letterSpacing: -0.6,
    },
    lg: {
      fontFamily: 'BricolageGrotesque_700Bold',
      fontSize: 34,
      lineHeight: 38,
      letterSpacing: -0.5,
    },
  },
  title: {
    lg: {
      fontFamily: 'BricolageGrotesque_700Bold',
      fontSize: 28,
      lineHeight: 32,
      letterSpacing: -0.3,
    },
    md: {
      fontFamily: 'BricolageGrotesque_700Bold',
      fontSize: 24,
      lineHeight: 28,
      letterSpacing: -0.2,
    },
  },
  body: {
    lg: {
      fontFamily: 'PlusJakartaSans_500Medium',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
    md: {
      fontFamily: 'PlusJakartaSans_500Medium',
      fontSize: 14,
      lineHeight: 22,
      letterSpacing: 0,
    },
  },
  caption: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  micro: {
    upper: {
      fontFamily: 'PlusJakartaSans_600SemiBold',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.2,
    },
  },
  button: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  tab: {
    label: {
      fontFamily: 'PlusJakartaSans_500Medium',
      fontSize: 11,
      lineHeight: 14,
      letterSpacing: 0.2,
    },
  },
  metric: {
    fontFamily: 'BricolageGrotesque_700Bold',
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -0.4,
  },
} as const;

export type TypographyTokens = typeof typography;
