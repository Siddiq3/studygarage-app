// "Chalk & Paper": study screens sit on paper, big moments on the chalkboard.
export const paperColors = {
  bg: { base: '#F6F1E7', elevated: '#FFFCF5', deep: '#EDE6D7' },
  surface: { base: '#FFFCF5', strong: '#FFFCF5' },
  border: { subtle: 'rgba(29,42,36,0.12)' },
  text: { primary: '#1D2A24', secondary: '#47544D', muted: '#5F6A63' },
  accent: { mint: '#1C7C55', purple: '#17694F', gold: '#9A6400', red: '#BF3F2B' },
  interaction: {
    pressed: 'rgba(29,42,36,0.06)',
    focus: 'rgba(23,105,79,0.24)',
    selectedBg: '#DDEBE2',
    disabledBg: 'rgba(29,42,36,0.05)',
  },
  status: { success: '#1C7C55', warning: '#9A6400', info: '#2B6A8F' },
  overlay: { scrim: 'rgba(15,40,31,0.62)', toast: '#14342A' },
} as const;

export const boardColors = {
  bg: '#14342A',
  raised: '#1C4336',
  deep: '#0F281F',
  text: '#F4EFE2',
  muted: '#B5C6BB',
  line: 'rgba(244,239,226,0.16)',
  marigold: '#F2B632',
  mint: '#8FD9B4',
  coral: '#F28B76',
} as const;

export const colors = paperColors;

export type ColorTokens = typeof paperColors;
