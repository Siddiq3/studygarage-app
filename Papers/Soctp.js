import React, { useEffect } from "react";
import { Text, View } from "react-native";

import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const Soctp = () => {

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
export default Soctp;