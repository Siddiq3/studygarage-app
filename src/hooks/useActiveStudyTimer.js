import { AppState } from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toLocalDateKey } from "../utils/dateKey";

const ACTIVE_SECONDS_KEY = "sg_active_study_seconds_today";
const ACTIVE_SECONDS_DATE_KEY = "sg_active_study_seconds_date";

export function useActiveStudyTimer({
  isEligibleScreen = true,
  idleTimeoutSeconds = 90,
  onThirtyMinutesReached,
} = {}) {
  const [activeStudySecondsToday, setActiveStudySecondsToday] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const appStateRef = useRef(AppState.currentState);
  const lastInteractionTsRef = useRef(Date.now());
  const intervalRef = useRef(null);
  const hasFiredThirtyMinuteRef = useRef(false);
  const dateKeyRef = useRef(toLocalDateKey());

  const isIdle = useMemo(() => {
    const idleMs = Math.max(5, idleTimeoutSeconds) * 1000;
    return Date.now() - lastInteractionTsRef.current > idleMs;
  }, [activeStudySecondsToday, idleTimeoutSeconds]);

  const persistSeconds = useCallback(async (seconds) => {
    await AsyncStorage.multiSet([
      [ACTIVE_SECONDS_KEY, String(Math.max(0, seconds))],
      [ACTIVE_SECONDS_DATE_KEY, toLocalDateKey()],
    ]);
  }, []);

  const registerInteraction = useCallback(() => {
    lastInteractionTsRef.current = Date.now();
  }, []);

  const resetForNewDay = useCallback(async () => {
    hasFiredThirtyMinuteRef.current = false;
    setActiveStudySecondsToday(0);
    await AsyncStorage.multiSet([
      [ACTIVE_SECONDS_KEY, "0"],
      [ACTIVE_SECONDS_DATE_KEY, toLocalDateKey()],
    ]);
  }, []);

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      const today = toLocalDateKey();
      const [[, rawSeconds], [, storedDate]] = await AsyncStorage.multiGet([
        ACTIVE_SECONDS_KEY,
        ACTIVE_SECONDS_DATE_KEY,
      ]);

      if (!mounted) return;

      if (storedDate !== today) {
        await AsyncStorage.multiSet([
          [ACTIVE_SECONDS_KEY, "0"],
          [ACTIVE_SECONDS_DATE_KEY, today],
        ]);
        dateKeyRef.current = today;
        setActiveStudySecondsToday(0);
        hasFiredThirtyMinuteRef.current = false;
      } else {
        const parsed = Number(rawSeconds);
        const safe = Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
        dateKeyRef.current = today;
        setActiveStudySecondsToday(safe);
        hasFiredThirtyMinuteRef.current = safe >= 1800;
      }

      setIsReady(true);
    };

    hydrate().catch(() => {
      if (mounted) setIsReady(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      const prevState = appStateRef.current;
      appStateRef.current = nextState;

      if (prevState.match(/inactive|background/) && nextState === "active") {
        registerInteraction();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [registerInteraction]);

  useEffect(() => {
    if (!isReady) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = setInterval(() => {
      const nowDateKey = toLocalDateKey();
      if (dateKeyRef.current !== nowDateKey) {
        dateKeyRef.current = nowDateKey;
        hasFiredThirtyMinuteRef.current = false;
        setActiveStudySecondsToday(0);
        AsyncStorage.multiSet([
          [ACTIVE_SECONDS_KEY, "0"],
          [ACTIVE_SECONDS_DATE_KEY, nowDateKey],
        ]).catch(() => {});
        return;
      }

      if (!isEligibleScreen) return;
      if (appStateRef.current !== "active") return;

      const idleMs = Math.max(5, idleTimeoutSeconds) * 1000;
      if (Date.now() - lastInteractionTsRef.current > idleMs) {
        return;
      }

      setActiveStudySecondsToday((prev) => {
        const next = prev + 1;

        if (!hasFiredThirtyMinuteRef.current && next >= 1800) {
          hasFiredThirtyMinuteRef.current = true;
          onThirtyMinutesReached?.();
        }

        if (next % 5 === 0) {
          persistSeconds(next).catch(() => {});
        }

        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [idleTimeoutSeconds, isEligibleScreen, isReady, onThirtyMinutesReached, persistSeconds]);

  useEffect(
    () => () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    },
    []
  );

  useEffect(() => {
    if (!isReady) return;
    const today = toLocalDateKey();
    AsyncStorage.setItem(ACTIVE_SECONDS_DATE_KEY, today).catch(() => {});
  }, [isReady]);

  return {
    isReady,
    activeStudySecondsToday,
    activeStudyMinutesToday: Math.floor(activeStudySecondsToday / 60),
    isIdle,
    registerInteraction,
    resetForNewDay,
  };
}

export default useActiveStudyTimer;
