import React from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const Mathep4 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `https://drive.google.com/file/d/1nbpCO5bHXBP3hFCvKFicDg-ULTaJo_p5/view?usp=share_link`, }}
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
export default Mathep4;