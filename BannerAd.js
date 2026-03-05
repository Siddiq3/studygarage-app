import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { LevelPlayAdSize, LevelPlayBannerAdView } from 'unity-levelplay-mediation';

const LEVELPLAY_BANNER_ANDROID_DEFAULT_ID = 'bp8awtxn68kk95bs';

const BANNER_AD_UNIT_ID = Platform.select({
  android:
    process.env.EXPO_PUBLIC_LEVELPLAY_BANNER_AD_UNIT_ID ||
    process.env.LEVELPLAY_BANNER_AD_UNIT_ID ||
    LEVELPLAY_BANNER_ANDROID_DEFAULT_ID,
  ios:
    process.env.EXPO_PUBLIC_LEVELPLAY_BANNER_AD_UNIT_ID_IOS ||
    process.env.LEVELPLAY_BANNER_AD_UNIT_ID_IOS ||
    '',
});
const BANNER_AD_SIZE = LevelPlayAdSize.BANNER;
const BANNER_PLACEMENT_NAME = null;

const BannerAdComponent = () => {
  const bannerRef = useRef(null);
  const isAvailable = useMemo(() => Boolean(BANNER_AD_UNIT_ID), []);

  const listener = {
    onAdLoaded: (adInfo) => {
      console.log('✅ Banner ad loaded', adInfo);
    },
    onAdLoadFailed: (error) => {
      console.log('❌ Banner failed to load:', error);
      if (Number(error?.errorCode) === 626) {
        console.log(
          '❌ Banner ad unit ID is invalid for this app key/platform. Verify the Android banner ad unit ID in LevelPlay dashboard.'
        );
      }
    },
    onAdDisplayed: (adInfo) => {
      console.log('📺 Banner displayed', adInfo);
    },
    onAdDisplayFailed: (adInfo, error) => {
      console.log('❌ Banner display failed:', adInfo, error);
    },
    onAdClicked: (adInfo) => {
      console.log('🖱️ Banner clicked', adInfo);
    },
    onAdExpanded: (adInfo) => {
      console.log('↕️ Banner expanded', adInfo);
    },
    onAdCollapsed: (adInfo) => {
      console.log('↔️ Banner collapsed', adInfo);
    },
    onAdLeftApplication: (adInfo) => {
      console.log('📤 Banner left application', adInfo);
    },
  };

  const loadBanner = useCallback(() => {
    if (!isAvailable) return;
    bannerRef.current?.loadAd();
  }, [isAvailable]);

  useEffect(() => {
    if (!isAvailable) return undefined;

    return () => {
      bannerRef.current?.destroy();
    };
  }, [isAvailable]);

  if (!isAvailable) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LevelPlayBannerAdView
        ref={bannerRef}
        adUnitId={BANNER_AD_UNIT_ID}
        adSize={BANNER_AD_SIZE}
        placementName={BANNER_PLACEMENT_NAME}
        listener={listener}
        style={styles.banner}
        onLayout={loadBanner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  banner: {
    width: BANNER_AD_SIZE.width,
    height: BANNER_AD_SIZE.height,
    alignSelf: 'center',
  },
});

export default BannerAdComponent;
