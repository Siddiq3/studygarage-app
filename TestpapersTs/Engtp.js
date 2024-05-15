import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking, TouchableWithoutFeedback, BackHandler } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/3250245563';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/4460111801';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true
});




const Engtpts = ({ navigation }) => {
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
    useEffect(() => {


        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack(); // Navigate back when back button is pressed
            return true; // Prevent default behavior
        });

        return () => backHandler.remove();
    }, []);
    return (

        <View style={styles.container}>
            <ScrollView>






                <Card style={{ padding: 10, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('english ts tp1')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('english ts tp1') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> TestPaper-1</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 10, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('english ts tp2')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('english ts tp2') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> TestPaper-2</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 10, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('english ts tp3')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('english ts tp3') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> TestPaper-3</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 10, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('english ts tp4')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('english ts tp4') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> TestPaper-4</Text>
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

export default Engtpts;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});
