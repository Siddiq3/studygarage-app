import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';


const Sev = () => {

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
                    <Button color='#5F939A' title='నిరూపక రేఖా గణితం | అభ్యాసం 7.1  మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/vIxGwT8l4cI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' నిరూపక రేఖా గణితం | అభ్యాసం 7.2 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/MiBBBMNcNgY`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' నిరూపక రేఖా గణితం | అభ్యాసం 7.3 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/NjB1bpRZOPw`)}>
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
export default Sev;