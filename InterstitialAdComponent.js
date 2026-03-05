import { useCallback, useEffect, useRef } from "react";
import { Platform } from "react-native";
import { LevelPlayInterstitialAd } from "unity-levelplay-mediation";

const INTERSTITIAL_AD_UNIT_ID = Platform.select({
  android: "2limbhk1ojg0pato",
});
const INTERSTITIAL_PLACEMENT_NAME = null;

const MAX_EXPONENTIAL_RETRY_COUNT = 6;
const INVALID_AD_UNIT_ID_ERROR_CODE = 626;

const useInterstitialAd = () => {
  const retryAttempt = useRef(0);
  const retryTimeoutRef = useRef(null);
  const closeWaitersRef = useRef([]);
  const adReadyRef = useRef(false);
  const interstitialAdRef = useRef(
    INTERSTITIAL_AD_UNIT_ID
      ? new LevelPlayInterstitialAd(INTERSTITIAL_AD_UNIT_ID)
      : null
  );

  const clearRetryTimeout = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  const loadAd = useCallback(async () => {
    const interstitialAd = interstitialAdRef.current;
    if (!interstitialAd) {
      console.log(
        "LevelPlay interstitial ad unit ID is missing for this platform."
      );
      return;
    }

    try {
      await interstitialAd.loadAd();
    } catch (error) {
      console.log("Interstitial load call failed:", error);
    }
  }, []);

  const scheduleReload = useCallback(() => {
    retryAttempt.current += 1;
    if (retryAttempt.current > MAX_EXPONENTIAL_RETRY_COUNT) {
      return;
    }

    const retryDelaySeconds = Math.pow(
      2,
      Math.min(MAX_EXPONENTIAL_RETRY_COUNT, retryAttempt.current)
    );
    console.log(`Retrying interstitial load in ${retryDelaySeconds} seconds`);

    clearRetryTimeout();
    retryTimeoutRef.current = setTimeout(() => {
      loadAd();
    }, retryDelaySeconds * 1000);
  }, [clearRetryTimeout, loadAd]);

  const isInvalidAdUnitIdError = useCallback((error) => {
    return Number(error?.errorCode) === INVALID_AD_UNIT_ID_ERROR_CODE;
  }, []);

  const resolveCloseWaiters = useCallback((didClose = false) => {
    if (!closeWaitersRef.current.length) return;
    const queue = [...closeWaitersRef.current];
    closeWaitersRef.current = [];
    queue.forEach((resolve) => {
      try {
        resolve(Boolean(didClose));
      } catch (_error) {}
    });
  }, []);

  useEffect(() => {
    const interstitialAd = interstitialAdRef.current;
    if (!interstitialAd) {
      return;
    }

    interstitialAd.setListener({
      onAdLoaded: (adInfo) => {
        console.log("Interstitial loaded", adInfo);
        retryAttempt.current = 0;
        adReadyRef.current = true;
      },
      onAdLoadFailed: (error) => {
        console.log("Interstitial load failed:", error);
        adReadyRef.current = false;
        if (isInvalidAdUnitIdError(error)) {
          console.log(
            "❌ Interstitial ad unit ID is invalid for this app key/platform. Check LevelPlay dashboard Ad Units and use the Android interstitial ad unit ID for this app key."
          );
          clearRetryTimeout();
          return;
        }
        scheduleReload();
      },
      onAdInfoChanged: (adInfo) => {
        console.log("Interstitial ad info changed", adInfo);
      },
      onAdDisplayed: (adInfo) => {
        console.log("Interstitial displayed", adInfo);
      },
      onAdDisplayFailed: (error, adInfo) => {
        console.log("Interstitial display failed:", error, adInfo);
        adReadyRef.current = false;
        resolveCloseWaiters(false);
        if (isInvalidAdUnitIdError(error)) {
          clearRetryTimeout();
          return;
        }
        scheduleReload();
      },
      onAdClicked: (adInfo) => {
        console.log("Interstitial clicked", adInfo);
      },
      onAdClosed: (adInfo) => {
        console.log("Interstitial closed", adInfo);
        adReadyRef.current = false;
        resolveCloseWaiters(true);
        loadAd();
      },
    });

    loadAd();

    return () => {
      clearRetryTimeout();
      resolveCloseWaiters(false);
      interstitialAd.remove().catch((error) => {
        console.log("Interstitial remove failed:", error);
      });
    };
  }, [
    clearRetryTimeout,
    loadAd,
    resolveCloseWaiters,
    scheduleReload,
    isInvalidAdUnitIdError,
  ]);

  const showAd = useCallback(
    async (placementName = INTERSTITIAL_PLACEMENT_NAME) => {
      const interstitialAd = interstitialAdRef.current;
      if (!interstitialAd) {
        console.log(
          "LevelPlay interstitial ad unit ID is missing for this platform."
        );
        return;
      }

      try {
        const isReady = await interstitialAd.isAdReady();
        if (isReady) {
          await interstitialAd.showAd(placementName);
        } else {
          console.log("Interstitial not ready yet");
          await loadAd();
        }
      } catch (error) {
        console.log("Interstitial show failed:", error);
        if (isInvalidAdUnitIdError(error)) {
          clearRetryTimeout();
          return;
        }
        scheduleReload();
      }
    },
    [clearRetryTimeout, isInvalidAdUnitIdError, loadAd, scheduleReload]
  );

  const showAdAndWaitForClose = useCallback(
    async (placementName = INTERSTITIAL_PLACEMENT_NAME) => {
      const interstitialAd = interstitialAdRef.current;
      if (!interstitialAd) {
        console.log(
          "LevelPlay interstitial ad unit ID is missing for this platform."
        );
        return false;
      }

      try {
        const isReady = await interstitialAd.isAdReady();
        adReadyRef.current = Boolean(isReady);

        if (!isReady) {
          await loadAd();
          return false;
        }

        return await new Promise((resolve) => {
          closeWaitersRef.current.push(resolve);
          interstitialAd.showAd(placementName).catch(async (error) => {
            console.log("Interstitial show failed:", error);
            if (isInvalidAdUnitIdError(error)) {
              clearRetryTimeout();
              resolveCloseWaiters(false);
              return;
            }

            scheduleReload();
            resolveCloseWaiters(false);
          });
        });
      } catch (error) {
        console.log("Interstitial ready-check failed:", error);
        scheduleReload();
        return false;
      }
    },
    [
      clearRetryTimeout,
      isInvalidAdUnitIdError,
      loadAd,
      resolveCloseWaiters,
      scheduleReload,
    ]
  );

  return { showAd, showAdAndWaitForClose };
};

export default useInterstitialAd;
