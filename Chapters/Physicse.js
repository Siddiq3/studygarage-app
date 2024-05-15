import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, ScrollView, StyleSheet, Linking } from "react-native";
import { Card } from "react-native-shadow-cards";
import { TestIds, GAMBannerAd, BannerAdSize, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/6792182552';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});

const Physicse = ({ navigation }) => {
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
                <Text style={{ fontSize: 30, textAlign: 'center' }}>     Chapter Wise Video Explanation</Text>





                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1. Heat ' onPress={() =>
                        navigation.navigate('Heat')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('stats') }
                        }}
                        delayPressOut={40000}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 1. Heat</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='Acids, Bases and Salts ' onPress={() =>
                        Linking.openURL(`https://youtu.be/-HdLhWJo90Y`)}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Acids, Bases and Salts</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title=' Refraction of Light at Plane Surfaces ' onPress={() =>
                        navigation.navigate('plane')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('stats') }
                        }}
                        delayPressOut={40000}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>  Refraction of Light at Plane Surfaces</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='Refraction of Light at Curved Surfaces ' onPress={() =>
                        navigation.navigate('curved')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('curved') }
                        }}
                        delayPressOut={40000}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Refraction of Light at Curved Surfaces</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='Human Eye and Colourful World ' onPress={() =>
                        navigation.navigate('eye')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('eye') }
                        }}
                        delayPressOut={40000}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Human Eye and Colourful World</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='Structure of Atom ' onPress={() =>
                        navigation.navigate('atom')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('atom') }
                        }}
                        delayPressOut={40000}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Structure of Atom</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='Classification of Elements- The Periodic Table ' onPress={() =>
                        Linking.openURL(`https://youtu.be/BgUgbdiNUUQ`)}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Classification of Elements- The Periodic Table</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title=' Chemical Bonding ' onPress={() =>
                        navigation.navigate('chemical')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chemical') }
                        }}
                        delayPressOut={40000}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Chemical Bonding</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='Electric Current ' onPress={() =>
                        navigation.navigate('current')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('current') }
                        }}
                        delayPressOut={40000}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Electric Current</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='Electromagnetism ' onPress={() =>
                        navigation.navigate('electro')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('electro') }
                        }}
                        delayPressOut={40000}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Electromagnetism</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='Principles of Metallurgy ' onPress={() =>
                        Linking.openURL(`https://youtu.be/R7xPGLV3FB0`)}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Principles of Metallurgy</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='Carbon and its Compounds ' onPress={() =>
                        Linking.openURL(`https://youtu.be/1HaE_37dWU0`)}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Carbon and its Compounds</Text>
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

export default Physicse;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E9',
    },

});