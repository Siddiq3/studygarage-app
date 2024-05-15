import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';
//const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';


const Thre = () => {

    return (
        <View>

            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' సంభావ్యత (Probability) | Introduction ' onPress={() =>
                        Linking.openURL(`https://youtu.be/ji67SexJ_jo`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' సంభావ్యత(PROBABILITY) | అభ్యాసం 13.1 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/z8dYahQGkns`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='  సంభావ్యత(PROBABILITY) | అభ్యాసం 13.2 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/fRrhHGyOht8`)}>
                    </Button>
                </Card>

            </ScrollView>
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
}
export default Thre;