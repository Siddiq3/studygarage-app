export const rewardDarkPalette = {
  bg: '#0B0E14',
  bg2: '#121722',
  card: 'rgba(255,255,255,0.08)',
  cardBorder: 'rgba(255,255,255,0.16)',
  text: '#F7F9FC',
  muted: '#9FA8BD',
  primary: '#7C5CFF',
  secondary: '#3DA7FF',
  success: '#27DFA8',
  locked: '#3B4254',
};

export const rewardLightPalette = {
  bg: '#F6F8FC',
  bg2: '#EEF2FA',
  card: 'rgba(255,255,255,0.88)',
  cardBorder: 'rgba(17,24,39,0.12)',
  text: '#101828',
  muted: '#5E667A',
  primary: '#6549FF',
  secondary: '#258DFF',
  success: '#0FBC86',
  locked: '#D1D8E6',
};

export const getRewardPalette = (isDark) => (isDark ? rewardDarkPalette : rewardLightPalette);
