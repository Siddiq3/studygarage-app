import React from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/9492220282';
const Mathep13 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `https://drive.google.com/file/d/10NT4E-pxy2gXQXvx4vPpYUNx6dGwSgE-/view?usp=share_link`, }}
            />
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.MEDIUM_RECTANGLE]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
}
export default Mathep13;