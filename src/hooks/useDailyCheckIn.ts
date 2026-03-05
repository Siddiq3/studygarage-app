import { useCallback, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DAILY_CHECKIN_STORAGE_KEY = "daily_checkin_last_claimed";

const toDateKey = (date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

type UseDailyCheckInResult = {
  isReady: boolean;
  claimedToday: boolean;
  lastClaimedDate: string;
  disabledReason?: string;
  refresh: () => Promise<void>;
  claim: () => Promise<void>;
};

export function useDailyCheckIn(
  storageKey = DAILY_CHECKIN_STORAGE_KEY
): UseDailyCheckInResult {
  const [isReady, setIsReady] = useState(false);
  const [lastClaimedDate, setLastClaimedDate] = useState("");

  const refresh = useCallback(async () => {
    try {
      const last = await AsyncStorage.getItem(storageKey);
      setLastClaimedDate(last ?? "");
    } finally {
      setIsReady(true);
    }
  }, [storageKey]);

  useEffect(() => {
    refresh().catch(() => {
      setIsReady(true);
    });
  }, [refresh]);

  const claim = useCallback(async () => {
    const today = toDateKey();
    await AsyncStorage.setItem(storageKey, today);
    setLastClaimedDate(today);
  }, [storageKey]);

  const claimedToday = useMemo(
    () => lastClaimedDate === toDateKey(),
    [lastClaimedDate]
  );

  return {
    isReady,
    claimedToday,
    lastClaimedDate,
    disabledReason: undefined,
    refresh,
    claim,
  };
}

export default useDailyCheckIn;
