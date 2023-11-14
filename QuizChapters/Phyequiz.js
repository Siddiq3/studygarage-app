import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, ScrollView, StyleSheet, Linking } from "react-native";
import { Card } from "react-native-shadow-cards";
import { TestIds, GAMBannerAd, BannerAdSize, AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/9410155118';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';



const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});
const Phyequiz = ({ navigation }) => {
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

            <ScrollView>






                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('Pe1')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Pe1') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 1. Heat</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='2.ఆమ్లాలు-క్షారాలు-లవణాలు' onPress={() =>
                        navigation.navigate('Pe2')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Pe2') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Acids, Bases and Salts</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='Refraction of Light at Plane Surfaces ' onPress={() =>
                        navigation.navigate('Pe3')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Pe3') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Refraction of Light at Plane Surfaces</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title=' Refraction of Light at Curved Surfaces ' onPress={() =>
                        navigation.navigate('Pe4')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Pe4') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>  Refraction of Light at Curved Surfaces</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='Human Eye and Colourful World ' onPress={() =>
                        navigation.navigate('Pe5')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Pe5') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Human Eye and Colourful World</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='Structure of Atom ' onPress={() =>
                        navigation.navigate('Pe6')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Pe6') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Structure of Atom</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='7.మూలకాల వర్గీకరణ – ఆవర్తన పట్టిక Notes' onPress={() =>
                        navigation.navigate('Pe7')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Pe7') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Classification of Elements- The Periodic Table</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title=' Chemical Bonding ' onPress={() =>
                        navigation.navigate('Pe8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Pe8') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>  Chemical Bonding</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title=' Electric Current Notes' onPress={() =>
                        navigation.navigate('Pe9')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Pe9') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Electric Current</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='10. విద్యుదయస్కాంతత్వం Notes' onPress={() =>
                        navigation.navigate('Pe10')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Pe10') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Electromagnetism </Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='11. లోహ సంగ్రహణ శాస్త్రం Notes' onPress={() =>
                        navigation.navigate('Pe11')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Pe11') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Principles of Metallurgy</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='12.కార్బన్ – దాని సమ్మేళనాలు ' onPress={() =>
                        navigation.navigate('Pe12')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Pe12') }
                        }}
                    >
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

export default Phyequiz;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E9',
    },

});