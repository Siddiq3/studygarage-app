import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

//const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';

const Real = () => {

    return (
        <View>

            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Real Numbers Part-1' onPress={() =>
                        Linking.openURL(`https://youtu.be/ZuSGh0JbK3k`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Real Numbers Part-2' onPress={() =>
                        Linking.openURL(`https://youtu.be/9gGwNN0Pc04`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Real Numbers Part-3' onPress={() =>
                        Linking.openURL(`https://youtu.be/8Kp8okXG5XU`)}>
                    </Button>
                </Card>

            </ScrollView>
            <GAMBannerAd
                unitId={adUnitId2}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
}
export default Real;