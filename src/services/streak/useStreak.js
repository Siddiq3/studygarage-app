import { useCallback } from "react";
import useStreakManager from "../../hooks/useStreakManager";

export function useStreak() {
  const streak = useStreakManager();

  const addUsageMinutes = useCallback(
    async (minutesToAdd = 1) => {
      const safe = Math.max(0, Number(minutesToAdd) || 0);
      if (!safe) return;
      const nextSeconds = streak.activeStudySecondsToday + safe * 60;
      streak.recordActiveStudySeconds(nextSeconds);
    },
    [streak]
  );

  return {
    ...streak,
    addUsageMinutes,
  };
}

export default useStreak;
