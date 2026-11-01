export const rewardDarkPalette = {
  bg: '#14342A',
  bg2: '#1C4336',
  card: 'rgba(244,239,226,0.08)',
  cardBorder: 'rgba(244,239,226,0.16)',
  text: '#F4EFE2',
  muted: '#B5C6BB',
  primary: '#F2B632',
  secondary: '#F2B632',
  success: '#8FD9B4',
  locked: '#B5C6BB',
};

export const rewardLightPalette = {
  bg: '#F6F1E7',
  bg2: '#EDE6D7',
  card: '#FFFCF5',
  cardBorder: 'rgba(29,42,36,0.12)',
  text: '#1D2A24',
  muted: '#5F6A63',
  primary: '#17694F',
  secondary: '#17694F',
  success: '#1C7C55',
  locked: '#5F6A63',
};

export const getRewardPalette = (isDark) => (isDark ? rewardDarkPalette : rewardLightPalette);
