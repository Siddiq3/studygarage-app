import React, { useEffect, useState } from "react";

import { View, Text, Button, ScrollView, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/6792182552';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true
});






const Textbook = ({ navigation }) => {

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

        <View style={styles.container} horizontal={false}>
            <ScrollView>





                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('telugu textbook')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('telugu textbook') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> TELUGU</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('hindi textbook')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('hindi textbook') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> HINDI</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('english textbook')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('english textbook') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> ENGLISH</Text>
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('maths em textbook')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('maths em textbook') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> MATHAMATICS-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('maths tm textbook')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('maths tm textbook') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> MATHAMATICS-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('biology em textbook')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('biology em textbook') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> BIOLOGY-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('biology tm textbook')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('biology tm textbook') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> BIOLOGY-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('physics em textbook')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('physics em textbook') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> PHYSCICAL SCIENCE-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('physics tm textbook')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('physics tm textbook') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> PHYSCICAL SCIENCE-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('social tm textbook')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('social tm textbook') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> SOCIAL-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('social em textbook')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('social em textbook') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> SOCIAL-EM</Text>
                    </TouchableOpacity>
                </Card>







            </ScrollView>
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.LEADERBOARD]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />

        </View>

    );
}

export default Textbook;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});