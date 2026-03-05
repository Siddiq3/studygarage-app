export const darkColors = {
  bg: {
    base: '#121212',
    elevated: '#1A1C2E',
    deep: '#101116',
  },
  surface: {
    base: 'rgba(255,255,255,0.06)',
    strong: 'rgba(255,255,255,0.08)',
  },
  border: {
    subtle: 'rgba(255,255,255,0.10)',
  },
  text: {
    primary: '#F5F7FF',
    secondary: '#B8C0D4',
    muted: '#AEB5C7',
  },
  accent: {
    mint: '#36D8A3',
    purple: '#B026FF',
    gold: '#E9C667',
    red: '#FF3B30',
  },
  interaction: {
    pressed: 'rgba(255,255,255,0.08)',
    focus: 'rgba(176,38,255,0.28)',
    selectedBg: 'rgba(176,38,255,0.16)',
    disabledBg: 'rgba(255,255,255,0.04)',
  },
  status: {
    success: '#36D8A3',
    warning: '#F5B91A',
    info: '#33BECC',
  },
  overlay: {
    scrim: 'rgba(10,10,10,0.78)',
    toast: 'rgba(18,18,18,0.92)',
  },
} as const;

export const lightColors = {
  bg: {
    base: '#F7F8FB',
    elevated: '#FFFFFF',
    deep: '#EEF1F7',
  },
  surface: {
    base: 'rgba(255,255,255,0.86)',
    strong: 'rgba(255,255,255,0.95)',
  },
  border: {
    subtle: 'rgba(15,24,40,0.10)',
  },
  text: {
    primary: '#111827',
    secondary: '#334155',
    muted: '#64748B',
  },
  accent: {
    mint: '#00A874',
    purple: '#7A20CC',
    gold: '#C89C00',
    red: '#DC2626',
  },
  interaction: {
    pressed: 'rgba(15,24,40,0.08)',
    focus: 'rgba(122,32,204,0.20)',
    selectedBg: 'rgba(122,32,204,0.12)',
    disabledBg: 'rgba(15,24,40,0.05)',
  },
  status: {
    success: '#00A874',
    warning: '#C78E00',
    info: '#0EA5E9',
  },
  overlay: {
    scrim: 'rgba(15,23,42,0.52)',
    toast: 'rgba(255,255,255,0.95)',
  },
} as const;

export const colors = darkColors;

export type ColorTokens = typeof darkColors;
