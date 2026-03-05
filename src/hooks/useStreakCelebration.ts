import { useCallback, useEffect, useRef, useState } from "react";

type Params = {
  shouldCelebrate: boolean;
  canShow?: boolean;
  showDelayMs?: number;
};

type UseStreakCelebrationResult = {
  isVisible: boolean;
  close: () => void;
};

export default function useStreakCelebration({
  shouldCelebrate,
  canShow = true,
  showDelayMs = 0,
}: Params): UseStreakCelebrationResult {
  const [isVisible, setIsVisible] = useState(false);
  const prevShouldCelebrateRef = useRef(false);
  const pendingRef = useRef(false);
  const signalVersionRef = useRef(0);
  const consumedSignalVersionRef = useRef(-1);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Trigger a new celebration signal only on false -> true edge.
    if (shouldCelebrate && !prevShouldCelebrateRef.current) {
      signalVersionRef.current += 1;
      pendingRef.current = true;
    }
    prevShouldCelebrateRef.current = shouldCelebrate;

    if (
      pendingRef.current &&
      canShow &&
      !isVisible &&
      consumedSignalVersionRef.current !== signalVersionRef.current
    ) {
      consumedSignalVersionRef.current = signalVersionRef.current;
      pendingRef.current = false;
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = null;
      }

      if (showDelayMs > 0) {
        delayTimerRef.current = setTimeout(() => {
          setIsVisible(true);
          delayTimerRef.current = null;
        }, showDelayMs);
      } else {
        setIsVisible(true);
      }
    }
  }, [canShow, isVisible, shouldCelebrate, showDelayMs]);

  useEffect(
    () => () => {
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = null;
      }
    },
    []
  );

  const close = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    isVisible,
    close,
  };
}
