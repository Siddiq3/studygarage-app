import React from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const Mathep7 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `https://drive.google.com/file/d/1MRGWKkEOajTf8KgcpvqM7tqbH3xjxpnn/view?usp=share_link`, }}
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
export default Mathep7;