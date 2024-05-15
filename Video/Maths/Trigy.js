import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

//const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';

const Trigy = () => {

    return (
        <View>


            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Trigonometry Part-1' onPress={() =>
                        Linking.openURL(`https://youtu.be/523pD5Yl-sc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Trigonometry Part-2' onPress={() =>
                        Linking.openURL(`https://youtu.be/pWubM5nGpxw`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Trigonometry Part-3' onPress={() =>
                        Linking.openURL(`https://youtu.be/FNc4ol3mQro`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Trigonometry Part-4' onPress={() =>
                        Linking.openURL(`https://youtu.be/kTq7bWJNx_8`)}>
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
export default Trigy;