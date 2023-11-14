import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking, TouchableWithoutFeedback } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/7122732961';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/1382670753';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true
});




const Engtp = ({ navigation }) => {
    const [interstitialLoaded, setInterstitialLoaded] = useState(false);


    const loadInterstitial = () => {
        const unsubscribeLoaded = interstitial.addAdEventListener(
            AdEventType.LOADED,
            () => {
                setInterstitialLoaded(true);
            }
        );

        const unsubscribeClosed = interstitial.addAdEventListener(
            AdEventType.CLOSED,
            () => {
                setInterstitialLoaded(false);
                interstitial.load();
            }
        );

        interstitial.load();

        return () => {
            unsubscribeClosed();
            unsubscribeLoaded();
        }
    }
    useEffect(() => {
        const unsubscribeInterstitialEvents = loadInterstitial();

        return () => {
            unsubscribeInterstitialEvents();

        };
    }, [])
    return (

        <View style={styles.container}>
            <ScrollView>






                <Card style={{ padding: 10, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('english tp1')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('english tp1') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> Model Paper-1</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 10, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('english tp2')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('english tp2') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> Model Paper-2</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 10, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('english tp3')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('english tp3') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> Model Paper-3</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 10, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('english tp4')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('english tp4') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> Model Paper-4</Text>
                    </TouchableWithoutFeedback>
                </Card>





            </ScrollView>

            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.MEDIUM_RECTANGLE]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }} />
        </View>

    );
}

export default Engtp;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});
