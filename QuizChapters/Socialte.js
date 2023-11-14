import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking, TouchableWithoutFeedback } from "react-native";
import { Card } from "react-native-shadow-cards";

import { TestIds, GAMBannerAd, BannerAdSize, AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/9410155118';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});
const Socialte1 = ({ navigation }) => {
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
                        navigation.navigate('St1')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St1') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 1 భారతదేశం: భౌగోళిక స్వరూపాలు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St2')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St2') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2 అభివృద్ధి భావనలు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St3')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St3') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 3 ఉత్పత్తి, ఉపాధి </Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St4')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St4') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 4 భారతదేశ శీతోష్ణస్థితి</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St5')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St5') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 5 భారతదేశ నదులు, నీటి వనరులు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St6')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St6') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 6 ప్రజలు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St7')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St7') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 7 ప్రజలు –నివాస ప్రాంతాలు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St8') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 8 ప్రజలు –వలసలు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St9')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St9') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 9 రాంపురం : గ్రామ ఆర్థిక వ్యవస్థ</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St10')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St10') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 10 ప్రపంచీకరణ</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St11')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St11') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 11 ఆహార భద్రత</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St12')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St12') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 12 సమానత – సుస్థిర అభివృద్ధి </Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St13')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St13') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 13 ప్రపంచ యుద్ధాల మధ్య ప్రపంచం 1900-1950 : భాగం-I  భాగం-II</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St14')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St14') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 1 భారతదేశం: భౌగోళిక స్వరూపాలు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St15')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St15') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 15 వలస పాలిత ప్రాంతాలలో జాతి విముక్తి ఉద్యమాలు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St16')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St16') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 16 భారతదేశ జాతీయోద్యమం-దేశ విభజన, స్వాతంత్య్రం: 1939-1947</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St17')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St17') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 17 స్వతంత్ర భారత రాజ్యాంగ నిర్మాణం</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St18')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St18') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 18 స్వతంత్ర భారతదేశం (మొదటి ముప్ఫై సంవత్సరాలు-1947-1977)</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St19')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St19') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 19 రాజకీయ ధోరణుల ఆవిర్భావం : 1977-2000</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St20')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St20') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 20 ప్రపంచ యుద్దాల తరువాత ప్రపంచం, భారతదేశం</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St21')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St21') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>  21 సమకాలీన సామాజిక ఉద్యమాలు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('St22')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('St22') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>22 పౌరులు, ప్రభుత్వాలు</Text>
                    </TouchableWithoutFeedback>
                </Card>

























            </ScrollView>
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.MEDIUM_RECTANGLE]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />

        </View>

    );
}

export default Socialte1;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E9',
    },

});