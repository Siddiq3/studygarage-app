import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';


const Five = () => {

    return (
        <View>
            <GAMBannerAd
                unitId={adUnitId2}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' వర్గ సమీకరణాలు | అభ్యాసం 5.1 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Zr4QqzQdKnc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' వర్గ సమీకరణాలు | అభ్యాసం 5.2 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/urh52q5xMtQ`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' వర్గ సమీకరణాలు | అభ్యాసం 5.3 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/QMESznH2NSY`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='వర్గ సమీకరణాలు | అభ్యాసం 5.4 | మొత్తం ప్రాబ్లమ్స్  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/on3NofiI6cw`)}>
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
export default Five;