import React from "react";
import { View, Button, StyleSheet, ScrollView, Linking } from "react-native";
import { Card } from "react-native-shadow-cards";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';


const Telv = ({ navigation }) => {

    return (

        <View style={styles.container}>
            <GAMBannerAd
                unitId={adUnitId2}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
            <ScrollView>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='ప్రకృతి వికృతులు' onPress={() =>
                        Linking.openURL(`https://youtu.be/0lQdldMIpjg`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='తెలుగు వ్యాకరణం | సంధులు' onPress={() =>
                        Linking.openURL(`https://youtu.be/5a0W-tI7Ylg`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='grammar in Amaravathi lesson' onPress={() =>
                        Linking.openURL(`https://youtu.be/_nocBp5Pykc`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Nanarthalu ' onPress={() =>
                        Linking.openURL(`https://youtu.be/yuf5fLxtbzA`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='అలంకారములు ' onPress={() =>
                        Linking.openURL(`https://youtu.be/7EtMePPAp6o`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' సమాసాలు' onPress={() =>
                        Linking.openURL(`https://youtu.be/CNbjMD4dtlk`)}>
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

export default Telv;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E9',
    },

});