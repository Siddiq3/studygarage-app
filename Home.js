import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity, BackHandler } from "react-native";
import { Card } from "react-native-shadow-cards";
import { InterstitialAd, AdEventType, TestIds, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import WebView from "react-native-webview";

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/7465549093';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});




const Home = ({ navigation }) => {

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

                <Text style={{ fontSize: 25, textAlign: 'center', color: '#D82148' }}>        Previous Year Question Papers


                </Text>




                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('telugu')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('telugu') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> TELUGU</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('hindi')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('hindi') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> HINDI</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('english')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('english') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> ENGLISH</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('maths em')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('maths em') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> MATHAMATICS-EM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('maths tm')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('maths tm') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> MATHAMATICS-TM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('biology em')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('biology em') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> BIOLOGY-EM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('biology tm')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('biology tm') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> BIOLOGY-TM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('physics em')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('physics em') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> PHYSCICAL SCIENCE-EM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('physics tm')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('physics tm') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> PHYSCICAL SCIENCE-TM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('social tm')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('social tm') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> SOCIAL-TM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('social em')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('social em') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> SOCIAL-EM</Text>
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

export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffafbd'

    },

});