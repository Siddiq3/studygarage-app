import { useCallback, useEffect, useRef, useState } from "react";

export default function useQuestionTimer({
  initialSeconds = 10,
  resetKey = 0,
  paused = false,
  enabled = true,
  onExpire,
}) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const timeoutRef = useRef(null);
  const runningRef = useRef(false);
  const timeRef = useRef(initialSeconds);
  const onExpireRef = useRef(onExpire);

  const clearTick = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    runningRef.current = false;
    clearTick();
  }, [clearTick]);

  const tick = useCallback(() => {
    clearTick();
    if (!runningRef.current) return;

    timeoutRef.current = setTimeout(() => {
      if (!runningRef.current) return;

      const next = Math.max(0, timeRef.current - 1);
      timeRef.current = next;
      setTimeLeft(next);

      if (next <= 0) {
        runningRef.current = false;
        clearTick();
        onExpireRef.current?.();
        return;
      }

      tick();
    }, 1000);
  }, [clearTick]);

  const start = useCallback(() => {
    if (!enabled || runningRef.current || timeRef.current <= 0) return;
    runningRef.current = true;
    tick();
  }, [enabled, tick]);

  const reset = useCallback(
    (nextSeconds = initialSeconds) => {
      stop();
      const safeSeconds = Math.max(
        0,
        Number.isFinite(nextSeconds) ? nextSeconds : initialSeconds
      );
      timeRef.current = safeSeconds;
      setTimeLeft(safeSeconds);
    },
    [initialSeconds, stop]
  );

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    reset(initialSeconds);
  }, [initialSeconds, reset, resetKey]);

  useEffect(() => {
    if (!enabled || paused) {
      stop();
      return;
    }

    if (timeRef.current > 0) {
      start();
    }
  }, [enabled, paused, resetKey, start, stop]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return timeLeft;
}
