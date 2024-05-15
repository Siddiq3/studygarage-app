

import React from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';

const Engp = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1G2EDrn5YAE7Y2pDfpTFU5qMGcVK2Cl9B/view?usp=share_link`,
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
export default Engp;