import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { InterstitialAd } from "react-native-applovin-max";

const INTERSTITIAL_AD_UNIT_ID = Platform.select({
  android: "81cf569076087360",
  ios: "YOUR_IOS_INTERSTITIAL_AD_UNIT_ID",
});

const MAX_EXPONENTIAL_RETRY_COUNT = 6;

const useInterstitialAd = () => {
  const retryAttempt = useRef(0);

  useEffect(() => {
    // Ad loaded
    const loadedListener = InterstitialAd.addAdLoadedEventListener(() => {
      retryAttempt.current = 0;
      console.log("✅ Interstitial loaded");
    });

    // Ad failed to load
    const failedListener = InterstitialAd.addAdLoadFailedEventListener((error) => {
      retryAttempt.current += 1;
      if (retryAttempt.current > MAX_EXPONENTIAL_RETRY_COUNT) return;

      const retryDelay = Math.pow(
        2,
        Math.min(MAX_EXPONENTIAL_RETRY_COUNT, retryAttempt.current)
      );
      console.log(`Retrying in ${retryDelay} seconds`);
      setTimeout(() => {
        InterstitialAd.loadAd(INTERSTITIAL_AD_UNIT_ID);
      }, retryDelay * 1000);
    });

    // Ad hidden / dismissed
    const hiddenListener = InterstitialAd.addAdHiddenEventListener(() => {
      InterstitialAd.loadAd(INTERSTITIAL_AD_UNIT_ID); // Load next ad
    });

    // Load first ad
    InterstitialAd.loadAd(INTERSTITIAL_AD_UNIT_ID);

   
  }, []);

  const showAd = async () => {
    const isReady = await InterstitialAd.isAdReady(INTERSTITIAL_AD_UNIT_ID);
    if (isReady) {
      InterstitialAd.showAd(INTERSTITIAL_AD_UNIT_ID);
    } else {
      console.log("Interstitial not ready yet");
      InterstitialAd.loadAd(INTERSTITIAL_AD_UNIT_ID);
    }
  };

  return { showAd };
};

export default useInterstitialAd;
