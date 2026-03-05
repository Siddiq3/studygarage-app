export const navigatorTransitions = {
  standard: {
    animation: 'slide_from_right' as const,
    animationDuration: 240,
  },
  modal: {
    animation: 'fade_from_bottom' as const,
    presentation: 'transparentModal' as const,
    animationDuration: 220,
  },
};
