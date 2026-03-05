import { AppState } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toLocalDateKey } from "../utils/dateKey";
import { addCoins, getLedger } from "../wallet/walletStore";

const DAILY_CLAIM_GATE_KEY = "sg_daily_claim_last_claimed";
const LEGACY_DAILY_CLAIM_KEYS = [
  "daily_checkin_last_claimed",
  "dailyClaimDate",
];
const DEFAULT_COOLDOWN_MINUTES = 10;

type RefreshOptions = {
  ignoreCooldown?: boolean;
};

type UseDailyClaimGateOptions = {
  cooldownMinutes?: number;
};

export function useDailyClaimGate({
  cooldownMinutes = DEFAULT_COOLDOWN_MINUTES,
}: UseDailyClaimGateOptions = {}) {
  const [isReady, setIsReady] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  const appStateRef = useRef(AppState.currentState);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastDismissedAtRef = useRef(0);
  const cooldownMs = Math.max(1, cooldownMinutes) * 60 * 1000;

  const clearCooldownTimer = useCallback(() => {
    if (cooldownTimerRef.current) {
      clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = null;
    }
  }, []);

  const loadLastClaimedDate = useCallback(async (): Promise<string> => {
    const keys = [DAILY_CLAIM_GATE_KEY, ...LEGACY_DAILY_CLAIM_KEYS];
    const pairs = await AsyncStorage.multiGet(keys);

    let resolved = "";
    for (let index = 0; index < pairs.length; index += 1) {
      const value = pairs[index]?.[1] ?? "";
      if (value) {
        resolved = value;
        break;
      }
    }

    if (resolved) {
      await AsyncStorage.setItem(DAILY_CLAIM_GATE_KEY, resolved).catch(
        () => {}
      );
    }

    return resolved;
  }, []);

  const isClaimEventProcessed = useCallback(async (today: string) => {
    try {
      const ledger = await getLedger();
      return ledger.processedEventIds.includes(`dailyClaim:${today}`);
    } catch (_error) {
      return false;
    }
  }, []);

  const refresh = useCallback(
    async ({ ignoreCooldown = false }: RefreshOptions = {}) => {
      const today = toLocalDateKey();
      const lastClaimed = await loadLastClaimedDate();
      const isClaimedToday =
        lastClaimed === today || (await isClaimEventProcessed(today));

      if (isClaimedToday) {
        clearCooldownTimer();
        setShouldShow(false);
        setIsReady(true);
        return;
      }

      const withinSessionCooldown =
        !ignoreCooldown &&
        lastDismissedAtRef.current > 0 &&
        Date.now() - lastDismissedAtRef.current < cooldownMs;

      setShouldShow(!withinSessionCooldown);
      setIsReady(true);
    },
    [clearCooldownTimer, cooldownMs, isClaimEventProcessed, loadLastClaimedDate]
  );

  const markClaimedToday = useCallback(async () => {
    const today = toLocalDateKey();
    clearCooldownTimer();
    lastDismissedAtRef.current = 0;

    await AsyncStorage.multiSet([
      [DAILY_CLAIM_GATE_KEY, today],
      ["daily_checkin_last_claimed", today],
      ["dailyClaimDate", today],
    ]);
    await addCoins({
      eventId: `dailyClaim:${today}`,
      amount: 0,
      source: "daily_claim",
      meta: { markerOnly: true },
    }).catch(() => {});
    setShouldShow(false);
  }, [clearCooldownTimer]);

  const dismissSession = useCallback(() => {
    lastDismissedAtRef.current = Date.now();
    setShouldShow(false);
    clearCooldownTimer();

    cooldownTimerRef.current = setTimeout(() => {
      refresh({ ignoreCooldown: true }).catch(() => {});
    }, cooldownMs);
  }, [clearCooldownTimer, cooldownMs, refresh]);

  useEffect(() => {
    refresh().catch(() => {
      setIsReady(true);
    });
  }, [refresh]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      const prevState = appStateRef.current;
      appStateRef.current = nextState;

      if (prevState.match(/inactive|background/) && nextState === "active") {
        refresh().catch(() => {});
      }
    });

    return () => {
      subscription.remove();
    };
  }, [refresh]);

  useEffect(
    () => () => {
      clearCooldownTimer();
    },
    [clearCooldownTimer]
  );

  return {
    isReady,
    shouldShow,
    refresh,
    dismissSession,
    markClaimedToday,
    storageKey: DAILY_CLAIM_GATE_KEY,
  };
}

export default useDailyClaimGate;
