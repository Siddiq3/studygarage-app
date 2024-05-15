import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button, } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

//const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';
const Amlalu = () => {

    return (
        <View>

            <ScrollView>


                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='  ఆమ్లాలు -క్షారాలు - లవణాలు -1' onPress={() =>
                        Linking.openURL(`https://youtu.be/tOC5HCdmrBc`)}>
                    </Button>

                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' ఆమ్లాలు -క్షారాలు - లవణాలు -2 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/li7P9IaH5ZE`)}>
                    </Button>

                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' ఆమ్లాలు -క్షారాలు - లవణాలు -3 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/CKwHmTIXnpM`)}>
                    </Button>

                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='ఆమ్లాలు -క్షారాలు - లవణాలు -4' onPress={() =>
                        Linking.openURL(`https://youtu.be/JoMgwGmTIN8`)}>
                    </Button>

                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' ఆమ్లాలు -క్షారాలు - లవణాలు -5 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Mo1h1q6lGo8`)}>
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
export default Amlalu;
