import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { LevelPlayAdSize, LevelPlayBannerAdView } from 'unity-levelplay-mediation';

const MREC_AD_UNIT_ID = 'ftie43lw30nvy12d';
const MREC_AD_SIZE = LevelPlayAdSize.MEDIUM_RECTANGLE;
const MREC_PLACEMENT_NAME = null;

const MrecAdComponent = () => {
  const mrecRef = useRef(null);

  const listener = {
    onAdLoaded: (adInfo) => {
      console.log('✅ MREC loaded', adInfo);
    },
    onAdLoadFailed: (error) => {
      console.log('❌ MREC load failed:', error);
      if (Number(error?.errorCode) === 626) {
        console.log(
          '❌ MREC ad unit ID is invalid for this app key/platform. Verify the Android MREC ad unit ID in LevelPlay dashboard.'
        );
      }
    },
    onAdDisplayed: (adInfo) => {
      console.log('📺 MREC displayed', adInfo);
    },
    onAdDisplayFailed: (adInfo, error) => {
      console.log('❌ MREC display failed:', adInfo, error);
    },
    onAdClicked: (adInfo) => {
      console.log('🖱️ MREC clicked', adInfo);
    },
    onAdExpanded: (adInfo) => {
      console.log('↕️ MREC expanded', adInfo);
    },
    onAdCollapsed: (adInfo) => {
      console.log('↔️ MREC collapsed', adInfo);
    },
    onAdLeftApplication: (adInfo) => {
      console.log('📤 MREC left application', adInfo);
    },
  };

  const loadMrec = useCallback(() => {
    mrecRef.current?.loadAd();
  }, []);

  useEffect(() => {
    return () => {
      mrecRef.current?.destroy();
    };
  }, []);

  return (
    <View style={styles.container}>
      <LevelPlayBannerAdView
        ref={mrecRef}
        adUnitId={MREC_AD_UNIT_ID}
        adSize={MREC_AD_SIZE}
        placementName={MREC_PLACEMENT_NAME}
        listener={listener}
        style={styles.mrec}
        onLayout={loadMrec}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  mrec: {
    width: MREC_AD_SIZE.width,
    height: MREC_AD_SIZE.height,
    alignSelf: 'center',
  },
});

export default MrecAdComponent;
