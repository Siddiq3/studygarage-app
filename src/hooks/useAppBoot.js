import { useCallback, useEffect, useState } from "react";
import { localStore } from "../services/storage/localStore";
import { getBalance } from "../wallet/walletStore";
import {
  getBoolean,
  getNumber,
  getString,
  getTodayString,
  setBoolean,
  setNumber,
  setString,
} from "../services/storage/persistence";

const LEGACY_DAILY_CLAIM_KEY = "daily_checkin_last_claimed";

export function useAppBoot() {
  const [isBootReady, setIsBootReady] = useState(false);
  const [shouldShowDailyRewardOnOpen, setShouldShowDailyRewardOnOpen] =
    useState(false);
  const [isFirstInstallOpen, setIsFirstInstallOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      const today = getTodayString();

      const [
        firstOpenDone,
        firstOpenDate,
        dailyClaimDate,
        dailyClaimDateAlias,
        legacyDailyClaimDate,
        storedStreakCount,
      ] = await Promise.all([
        getBoolean(localStore.keys.firstOpenDone, false),
        getString(localStore.keys.firstOpenDate, ""),
        getString(localStore.keys.dailyClaimDate, ""),
        getString(localStore.keys.dailyClaimDateAlias, ""),
        getString(LEGACY_DAILY_CLAIM_KEY, ""),
        getNumber(localStore.keys.streakCountRaw, NaN),
      ]);
      const storedCoinsBalance = await getBalance();

      const resolvedClaimDate =
        dailyClaimDate || dailyClaimDateAlias || legacyDailyClaimDate;

      if (!Number.isFinite(storedCoinsBalance)) {
        // Wallet store always provides a finite number, this is a safety fallback.
        await getBalance().catch(() => {});
      }

      if (!Number.isFinite(storedStreakCount)) {
        await Promise.all([
          setNumber(localStore.keys.streakCountRaw, 1),
          setNumber(localStore.keys.streakCount, 1),
          setNumber(localStore.keys.currentStreak, 1),
        ]);
      }

      let nextShouldShow = false;
      let firstInstall = false;

      if (!firstOpenDone) {
        firstInstall = true;
        nextShouldShow = true;
        await Promise.all([
          setBoolean(localStore.keys.firstOpenDone, true),
          setString(localStore.keys.firstOpenDate, today),
          setString(localStore.keys.dailyRewardShownDate, today),
          setString(localStore.keys.dailyRewardShownDateAlias, today),
        ]);
      } else {
        const shouldShowToday = resolvedClaimDate !== today;
        nextShouldShow = shouldShowToday;

        if (shouldShowToday) {
          await Promise.all([
            setString(localStore.keys.dailyRewardShownDate, today),
            setString(localStore.keys.dailyRewardShownDateAlias, today),
          ]);
        }

        if (!firstOpenDate) {
          await setString(localStore.keys.firstOpenDate, today);
        }
      }

      if (!mounted) return;

      setIsFirstInstallOpen(firstInstall);
      setShouldShowDailyRewardOnOpen(nextShouldShow);
      setIsBootReady(true);
    };

    hydrate().catch(() => {
      if (mounted) setIsBootReady(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const markDailyRewardClaimed = useCallback(async () => {
    const today = getTodayString();
    await Promise.all([
      setString(localStore.keys.dailyClaimDate, today),
      setString(localStore.keys.dailyClaimDateAlias, today),
      setString(localStore.keys.dailyRewardShownDate, today),
      setString(localStore.keys.dailyRewardShownDateAlias, today),
      setString("daily_checkin_last_claimed", today),
    ]);
    setShouldShowDailyRewardOnOpen(false);
  }, []);

  const syncCoinsBalance = useCallback(async () => {
    // Coin state is now owned by walletStore atomically.
    await getBalance().catch(() => {});
  }, []);

  return {
    isBootReady,
    isFirstInstallOpen,
    shouldShowDailyRewardOnOpen,
    markDailyRewardClaimed,
    syncCoinsBalance,
  };
}

export default useAppBoot;
