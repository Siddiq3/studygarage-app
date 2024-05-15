import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, TouchableWithoutFeedback, BackHandler } from "react-native";
import { Card } from "react-native-shadow-cards";
import { InterstitialAd, AdEventType, TestIds, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import WebView from "react-native-webview";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/7426607370';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});




const Tspoly = ({ navigation }) => {

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

        <View style={styles.container} horizontal={false}>
            <ScrollView>






                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('poly2022t')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('poly2022t') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> 2022 PAPERS</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('poly2021t')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('poly2021t') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>2021 PAPERS</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('poly2020t')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('poly2020t') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> 2020 PAPERS</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('poly2019t')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('poly2019t') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>2019 PAPERS</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('poly2018t')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('poly2018t') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> 2018 PAPERS</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('poly2017t')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('poly2017t') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> 2017 PAPERS</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('poly2016t')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('poly2016t') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> 2016 PAPERS</Text>
                    </TouchableWithoutFeedback>
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

export default Tspoly;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffafbd'

    },

});