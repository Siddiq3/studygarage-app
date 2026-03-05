import { useCallback } from "react";

export function useRewardSound() {
  const playReveal = useCallback(async () => {
    // Sound disabled for now.
    return false;
  }, []);

  const playCoinLand = useCallback(async () => {
    // Sound disabled for now.
    return false;
  }, []);

  const playWelcomeReward = useCallback(async () => {
    // Sound disabled for now.
    return false;
  }, []);

  const playDailyClaim = useCallback(async () => {
    // Sound disabled for now.
    return false;
  }, []);

  const playStreakReward = useCallback(async () => {
    // Sound disabled for now.
    return false;
  }, []);

  // Backward-compatible aliases used by existing screens.
  return {
    playReveal,
    playCoinLand,
    playWelcomeReward,
    playDailyClaim,
    playStreakReward,
    playSoftRewardSound: playReveal,
    playRewardConfirmSound: playCoinLand,
  };
}
