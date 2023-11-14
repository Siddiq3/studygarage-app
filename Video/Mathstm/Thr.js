import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';


const Thr = () => {

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
                    <Button color='#5F939A' title='   బహుపధులు | నిర్వచనం, పరిమాణం , శూన్యాలు.' onPress={() =>
                        Linking.openURL(`https://youtu.be/KkIW3ivSHWY`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' బహుపధులు | అభ్యాసం 3.1 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/2KKx19zASzE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' బహుపధుల రేఖా చిత్రాలు ' onPress={() =>
                        Linking.openURL(`https://youtu.be/RHKarjnsEPA`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='బహుపధులు | అభ్యాసం 3.2 | మొత్తం ప్రాబ్లమ్స్.  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/NkH7bYt89_c`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='అభ్యాసం 3.3 | Q.No.1  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/gHR41AwnaOs`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' అభ్యాసం 3.3 | Q.No.2 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/kVnIhx4eOVM`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='  అభ్యాసం 3.3 | Q.No.3,4' onPress={() =>
                        Linking.openURL(`https://youtu.be/8zS4--kIuDQ`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' వర్గ బహుపధులు | గ్రాఫ్స్ (GRAPHS) ' onPress={() =>
                        Linking.openURL(`https://youtu.be/YDad5f9EJLw`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' బహుపధుల భాగాహారం | అభ్యాసం 3.4 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/SwNUaiOogWc`)}>
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
export default Thr;