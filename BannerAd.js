import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { LevelPlayAdSize, LevelPlayBannerAdView } from 'unity-levelplay-mediation';

const BANNER_AD_UNIT_ID = 'bp8awtxn68kk95bs';
const BANNER_AD_SIZE = LevelPlayAdSize.BANNER;
const BANNER_PLACEMENT_NAME = null;

const BannerAdComponent = () => {
  const bannerRef = useRef(null);

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
    bannerRef.current?.loadAd();
  }, []);

  useEffect(() => {
    return () => {
      bannerRef.current?.destroy();
    };
  }, []);

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
