import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { LevelPlayRewardedAd } from "unity-levelplay-mediation";

const LEVELPLAY_REWARDED_ANDROID_DEFAULT_ID = "3unwk9yvn0metykg";

const REWARDED_AD_UNIT_ID = Platform.select({
  android:
    process.env.EXPO_PUBLIC_LEVELPLAY_REWARDED_AD_UNIT_ID ||
    process.env.LEVELPLAY_REWARDED_AD_UNIT_ID ||
    LEVELPLAY_REWARDED_ANDROID_DEFAULT_ID,
  ios:
    process.env.EXPO_PUBLIC_LEVELPLAY_REWARDED_AD_UNIT_ID_IOS ||
    process.env.LEVELPLAY_REWARDED_AD_UNIT_ID_IOS ||
    "",
});

type RewardedShowResult = {
  shown: boolean;
  rewarded: boolean;
  reason?: string;
};

type RewardedWaiter = (result: RewardedShowResult) => void;

const buildErrorMessage = (error: any, fallback: string) => {
  if (!error) return fallback;
  const code = error?.errorCode ? ` (${error.errorCode})` : "";
  const message = error?.message || error?.errorMessage || fallback;
  return `${message}${code}`;
};

export function useRewardedAdsService() {
  const adRef = useRef<LevelPlayRewardedAd | null>(
    REWARDED_AD_UNIT_ID ? new LevelPlayRewardedAd(REWARDED_AD_UNIT_ID) : null
  );
  const hasRewardRef = useRef(false);
  const waitersRef = useRef<RewardedWaiter[]>([]);
  const isLoadingRef = useRef(false);
  const isShowingRef = useRef(false);
  const closeResolveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const resolveWaiters = useCallback((result: RewardedShowResult) => {
    if (!waitersRef.current.length) return;
    const queue = [...waitersRef.current];
    waitersRef.current = [];
    queue.forEach((resolve) => {
      try {
        resolve(result);
      } catch (_error) {}
    });
  }, []);

  const clearCloseResolveTimer = useCallback(() => {
    if (closeResolveTimerRef.current) {
      clearTimeout(closeResolveTimerRef.current);
      closeResolveTimerRef.current = null;
    }
  }, []);

  const preload = useCallback(async () => {
    const ad = adRef.current;
    if (!ad) {
      setLastError("Rewarded ad unit is missing.");
      return false;
    }
    if (isLoadingRef.current || isShowingRef.current) return false;

    isLoadingRef.current = true;
    setIsLoading(true);
    try {
      await ad.loadAd();
      return true;
    } catch (error) {
      setIsLoaded(false);
      setLastError(buildErrorMessage(error, "Unable to load rewarded ad."));
      return false;
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const ad = adRef.current;
    if (!ad) return;

    ad.setListener({
      onAdLoaded: () => {
        setIsLoaded(true);
        isLoadingRef.current = false;
        setIsLoading(false);
        setLastError(null);
      },
      onAdLoadFailed: (error) => {
        setIsLoaded(false);
        isLoadingRef.current = false;
        setIsLoading(false);
        setLastError(buildErrorMessage(error, "Rewarded ad failed to load."));
      },
      onAdDisplayed: () => {
        isShowingRef.current = true;
        setIsShowing(true);
      },
      onAdDisplayFailed: (error) => {
        clearCloseResolveTimer();
        isShowingRef.current = false;
        setIsShowing(false);
        setIsLoaded(false);
        setLastError(buildErrorMessage(error, "Rewarded ad failed to show."));
        resolveWaiters({
          shown: false,
          rewarded: false,
          reason: "display_failed",
        });
      },
      onAdRewarded: () => {
        hasRewardRef.current = true;
      },
      onAdClosed: () => {
        // Some adapters can dispatch close slightly before reward callback.
        // Wait briefly so we don't miss valid reward completion.
        clearCloseResolveTimer();
        closeResolveTimerRef.current = setTimeout(() => {
          closeResolveTimerRef.current = null;
          const rewarded = hasRewardRef.current;
          hasRewardRef.current = false;
          isShowingRef.current = false;
          setIsShowing(false);
          setIsLoaded(false);
          resolveWaiters({
            shown: true,
            rewarded,
            reason: rewarded ? undefined : "closed_without_reward",
          });
          preload().catch(() => {});
        }, 250);
      },
    });

    preload().catch(() => {});

    return () => {
      clearCloseResolveTimer();
      isLoadingRef.current = false;
      isShowingRef.current = false;
      resolveWaiters({ shown: false, rewarded: false, reason: "cleanup" });
      ad.remove().catch(() => {});
    };
  }, [clearCloseResolveTimer, preload, resolveWaiters]);

  const showAndWaitForReward = useCallback(async (): Promise<RewardedShowResult> => {
    const ad = adRef.current;
    if (!ad) {
      return {
        shown: false,
        rewarded: false,
        reason: "missing_ad_unit",
      };
    }
    if (isShowingRef.current) {
      return { shown: false, rewarded: false, reason: "already_showing" };
    }

    try {
      const ready = await ad.isAdReady();
      if (!ready) {
        await preload();
        return { shown: false, rewarded: false, reason: "not_ready" };
      }

      clearCloseResolveTimer();
      hasRewardRef.current = false;
      isShowingRef.current = true;
      setIsShowing(true);
      return await new Promise<RewardedShowResult>((resolve) => {
        waitersRef.current.push(resolve);
        ad.showAd("").catch((error) => {
          clearCloseResolveTimer();
          isShowingRef.current = false;
          setIsShowing(false);
          setIsLoaded(false);
          setLastError(buildErrorMessage(error, "Rewarded ad show failed."));
          resolveWaiters({
            shown: false,
            rewarded: false,
            reason: "show_exception",
          });
          preload().catch(() => {});
        });
      });
    } catch (error) {
      setLastError(
        buildErrorMessage(error, "Unable to prepare rewarded ad right now.")
      );
      return { shown: false, rewarded: false, reason: "ready_check_failed" };
    }
  }, [clearCloseResolveTimer, preload, resolveWaiters]);

  return {
    isAvailable: Boolean(adRef.current),
    isLoaded,
    isLoading,
    isShowing,
    lastError,
    preload,
    showAndWaitForReward,
  };
}

export default useRewardedAdsService;
