import React from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/9492220282';

const Hinp6 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/13pBpHfD8W3yFOJzjkEN7VN5w7E_lQPvN/view?usp=share_link`,
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
export default Hinp6;