import React from "react";
import { Text, View } from "react-native";


import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';
const Phytp = () => {

    return (
        <View style={{ flex: 1 }}>

            <Text style={{ fontSize: 40, textAlign: 'center' }}> UPLOADED SHORTLY...</Text>
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
export default Phytp;