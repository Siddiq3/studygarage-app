

import React from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';

const Hinp = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/18Ri6hvuOPYQckpKQsbf43UMBGUjskZC5/view?usp=sharing`,
                }}
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
export default Hinp;