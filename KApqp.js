import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity, BackHandler } from "react-native";
import { Card } from "react-native-shadow-cards";
import { InterstitialAd, AdEventType, TestIds, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import WebView from "react-native-webview";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/3250245563';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/4460111801';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});




const Kapqp = ({ navigation }) => {

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
                <Text style={{ fontSize: 25, textAlign: 'center', color: '#D82148' }}>        Previous Year 2015-2023 Question Papers


                </Text>




                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('kanada ka')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('kanada ka') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> KANADA</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('hindi ka')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('hindi ka') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> HINDI</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('english ka')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('english ka') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> ENGLISH</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('maths ka')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('maths ka') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> MATHAMATICS- EM & KM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('biology ka')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('biology ka') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> SCIENCE EM & KM</Text>
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('social ka')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('social ka') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> SOCIAL-EM & KM</Text>
                    </TouchableOpacity>
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

export default Kapqp;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffafbd'

    },

});