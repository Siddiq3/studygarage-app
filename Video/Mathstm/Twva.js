import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';
//const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';


const Twve = () => {

    return (
        <View>

            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' త్రికోణమితి అనువర్తనాలు | ఊర్థ్వ మరియు నిమ్న కోణాలు ' onPress={() =>
                        Linking.openURL(`https://youtu.be/dMrTryyTS18`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='త్రికోణమితి అనువర్తనాలు | అభ్యాసం 12.1 | మొత్తం ప్రాబ్లమ్స్  ' onPress={() =>
                        Linking.openURL(`త్రికోణమితి అనువర్తనాలు | అభ్యాసం 12.1 | మొత్తం ప్రాబ్లమ్స్`)}>
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
export default Twve;