import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-shadow-cards";
import { InterstitialAd, AdEventType, TestIds, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import WebView from "react-native-webview";


import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-6705313336055612/2757267457';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/2465924734';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});




const Emcet12 = ({ navigation }) => {

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

        <View style={{ flex: 1 }}>
            <ScrollView>





                <Text style={{ fontSize: responsiveFontSize(3.5), marginTop: 30, marginBottom: 60, textAlign: 'center' }}>
                    🎖️ Everyday We Will UPLOAD 6 Questions from Maths-1A,Maths-1B,Physics,Zoology,Botany.It Will Be Usefull For Compitative Exams✍
                    CLICK START BUTTON 👇🏻👇🏻
                </Text>

                <TouchableOpacity style={{ padding: 10, margin: 15, borderRadius: 15, marginTop: 20, backgroundColor: '#03045e' }} onPress={() =>
                    navigation.navigate('Question12')} onPressOut={() => {
                        if (interstitialLoaded) {

                            interstitial.show();
                        } else { navigation.navigate('Question12') }
                    }}
                >
                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '500', textAlign: 'center', color: '#ffffff' }}>START</Text>
                </TouchableOpacity>


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

export default Emcet12;
