import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, ScrollView, StyleSheet, Linking } from "react-native";
import { Card } from "react-native-shadow-cards";
import { TestIds, GAMBannerAd, BannerAdSize, AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/9410155118';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';


const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});
const Physicst = ({ navigation }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });

        // Start loading the interstitial straight away
        interstitial.load();

        // Unsubscribe from events on unmount
        return unsubscribe;
    }, []);

    // No advert ready to show yet
    if (!loaded) {
        console.log('hi');
    } const [interstitialLoaded, setInterstitialLoaded] = useState(false);


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
            <GAMBannerAd
                unitId={adUnitId2}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
            <ScrollView>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>     Chapter Wise Video Explanation</Text>





                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('1st')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('1st') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 1. ఉష్ణం</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='2.ఆమ్లాలు-క్షారాలు-లవణాలు' onPress={() =>
                        navigation.navigate('2nd')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('2nd') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2.ఆమ్లాలు-క్షారాలు-లవణాలు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='3.సమతల ఉపరితలాల వద్ద కాంతి వక్రీభవనం ' onPress={() =>
                        navigation.navigate('3rd')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('3rd') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 3.సమతల ఉపరితలాల వద్ద కాంతి వక్రీభవనం</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='4.వక్రతలాల వద్ద కాంతి వక్రీభవనం ' onPress={() =>
                        navigation.navigate('4th')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('4th') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 4.వక్రతలాల వద్ద కాంతి వక్రీభవనం</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='5.మానవుని కన్ను-రంగుల ప్రపంచం ' onPress={() =>
                        navigation.navigate('5th')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('5th') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 5.మానవుని కన్ను-రంగుల ప్రపంచం</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='6.పరమాణు నిర్మాణం ' onPress={() =>
                        navigation.navigate('6th')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('6th') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 6.పరమాణు నిర్మాణం</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='7.మూలకాల వర్గీకరణ – ఆవర్తన పట్టిక Notes' onPress={() =>
                        navigation.navigate('7th')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('7th') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 7.మూలకాల వర్గీకరణ – ఆవర్తన పట్టిక</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='8.రసాయన బంధం ' onPress={() =>
                        navigation.navigate('8th')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('8th') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 8.రసాయన బంధం</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title=' 9. విద్యుత్ ప్రవాహం Notes' onPress={() =>
                        navigation.navigate('9th')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('9th') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 9. విద్యుత్ ప్రవాహం</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='10. విద్యుదయస్కాంతత్వం Notes' onPress={() =>
                        navigation.navigate('10th')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('10th') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 10. విద్యుదయస్కాంతత్వం</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='11. లోహ సంగ్రహణ శాస్త్రం Notes' onPress={() =>
                        navigation.navigate('11th')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('11th') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 11. లోహ సంగ్రహణ శాస్త్రం</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='12.కార్బన్ – దాని సమ్మేళనాలు ' onPress={() =>
                        navigation.navigate('12th')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('12th') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 12.కార్బన్– దాని సమ్మేళనాలు</Text>
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

export default Physicst;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E9',
    },

});