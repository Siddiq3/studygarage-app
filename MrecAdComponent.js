import React from "react";
import { StyleSheet } from "react-native";
import { AdView, AdFormat } from "react-native-applovin-max";

const MREC_AD_UNIT_ID = "5f19e01d2d596582"; // replace with real ID

const MrecAdComponent = () => {
  return (
    <AdView
      adUnitId={MREC_AD_UNIT_ID}
      adFormat={AdFormat.MREC} // MREC type
      style={styles.mrec}
      placement="main_mrec"
      onAdLoaded={() => console.log("✅ MREC loaded")}
      onAdLoadFailed={(error) => console.log("❌ MREC load failed:", error)}
      onAdClicked={() => console.log("🖱 MREC clicked")}
    />
  );
};

const styles = StyleSheet.create({
  mrec: {
    width: '100%',
    height: 250,
    alignSelf: "center",
   backgroundColor: "rgba(221, 209, 209, 0.81)",
  },
});

export default MrecAdComponent;
