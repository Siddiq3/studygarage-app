import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';
//const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';


const One = () => {

    return (
        <View>

            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.1' onPress={() =>
                        Linking.openURL(`https://youtu.be/B48dmS6gIWQ`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.2' onPress={() =>
                        Linking.openURL(`https://youtu.be/gXa3Ua2kne4`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.3' onPress={() =>
                        Linking.openURL(`https://youtu.be/ScIgeCvPgrY`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.4' onPress={() =>
                        Linking.openURL(`https://youtu.be/3tSWy34cdLU`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.5' onPress={() =>
                        Linking.openURL(`https://youtu.be/dyIzJfzymo8`)}>
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
export default One;