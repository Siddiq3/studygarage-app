import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking, TouchableOpacity, Image, BackHandler } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/7465549093';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'education,games,finance'],
});




const Nmms = ({ navigation }) => {
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


            <View>


                <ScrollView horizontal={true}>





                    <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(45), height: responsiveWidth(45), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }}

                        onPressOut={() => {
                            navigation.navigate('nmmssm')
                        }}
                        onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmmssm') }
                        }}>
                        <Image style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5, }} source={require('./assets/nmmssm.png')} />



                    </TouchableOpacity>


                    <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(45), height: responsiveWidth(45), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }}
                        onPress={() =>
                            navigation.navigate('nmmspp')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmmspp') }
                        }}>
                        <Image style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5, }} source={require('./assets/nmmspp.png')} />



                    </TouchableOpacity>
                </ScrollView>
            </View>

            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.LEADERBOARD]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />

            <View>
                <ScrollView horizontal={true}>

                    <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(45), height: responsiveWidth(45), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }}

                        onPress={() =>
                            navigation.navigate('nmmstp')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmmstp') }
                        }}>
                        <Image style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5, }} source={require('./assets/nmmstp.png')} />



                    </TouchableOpacity>



                    <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(45), height: responsiveWidth(45), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }}

                        onPress={() =>
                            navigation.navigate('nmmsdt')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmmsdt') }
                        }}>
                        <Image style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5, }} source={require('./assets/nmmsdt.png')} />



                    </TouchableOpacity>


                </ScrollView>
            </View>
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

export default Nmms;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});