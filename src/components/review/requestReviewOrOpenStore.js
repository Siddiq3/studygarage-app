import { Linking, Platform } from "react-native";
import * as StoreReview from "expo-store-review";

const ANDROID_PACKAGE_ID = "siddiqkolimidev.tenth_app";

const buildAndroidMarketUrl = (packageId) => `market://details?id=${packageId}`;

const parsePackageIdFromUrl = (appUrl) => {
  const match = String(appUrl || "").match(/[?&]id=([^&]+)/i);
  return match?.[1] || ANDROID_PACKAGE_ID;
};

const openUrlSafely = async (url) => {
  if (!url) return false;
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) return false;
    await Linking.openURL(url);
    return true;
  } catch (_error) {
    return false;
  }
};

export async function requestReviewOrOpenStore(appUrl) {
  try {
    const canUseInAppReview = await StoreReview.isAvailableAsync();
    if (canUseInAppReview) {
      await StoreReview.requestReview();
      return {
        openedStore: true,
        usedInAppReview: true,
        usedStoreFallback: false,
      };
    }
  } catch (_error) {
    // Fall back to store listing.
  }

  const packageId = parsePackageIdFromUrl(appUrl);
  const marketUrl =
    Platform.OS === "android" ? buildAndroidMarketUrl(packageId) : null;
  const webUrl =
    appUrl ||
    `https://play.google.com/store/apps/details?id=${packageId}&hl=en_IN`;

  if (marketUrl) {
    const openedMarket = await openUrlSafely(marketUrl);
    if (openedMarket) {
      return {
        openedStore: true,
        usedInAppReview: false,
        usedStoreFallback: true,
      };
    }
  }

  const openedWeb = await openUrlSafely(webUrl);
  return {
    openedStore: openedWeb,
    usedInAppReview: false,
    usedStoreFallback: openedWeb,
  };
}

export default requestReviewOrOpenStore;
