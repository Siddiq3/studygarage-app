// BannerAdComponent.js
import React from "react";
import { StyleSheet } from "react-native";
import { AdView, AdFormat } from "react-native-applovin-max";

const BANNER_AD_UNIT_ID = "dcbd43171d24de08";

const BannerAdComponent = () => {
  return (
    <AdView
      adUnitId={BANNER_AD_UNIT_ID}
      adFormat={AdFormat.BANNER}
      style={styles.banner}
      placement="main_banner"
      onAdLoaded={() => console.log("✅ Banner ad loaded")}
      onAdLoadFailed={(error) => console.log("❌ Banner failed to load:", error)}
      onAdClicked={() => console.log("🖱️ Banner clicked")}
    />
  );
};

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: 50,
   //backgroundColor: "#f4ebebb6",
  },
});

export default BannerAdComponent;