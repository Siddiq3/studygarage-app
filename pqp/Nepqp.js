import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet, TouchableWithoutFeedback, Linking, BackHandler } from "react-native";
import { Card } from "react-native-shadow-cards";


import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/6792182552';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true

});


const Nepop = ({ navigation }) => {

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



        <View style={styles.container}>
            <ScrollView>




                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('BiologyEM 2022')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('BiologyEM 2022') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2022 Public paper</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('BiologyEM 2022p')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('BiologyEM 2022p') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>2022-Prefinal paper</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('BiologyEM 2023')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('BiologyEM 2023') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Model Paper 2023</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('ScienceEM1 Blueprint')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('ScienceEM1 Blueprint') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Bule Print for 100 marks</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('BiologyEM 2019p')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('BiologyEM 2019p') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2019-public paper</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('BiologyEM 2018p')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('BiologyEM 2018p') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2018-public paper</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('BiologyEM 2017p')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('BiologyEM 2017p') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2017-public paper</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('BiologyEM 2016p')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('BiologyEM 2016p') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2016-public paper</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('BiologyEM 2015p')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('BiologyEM 2015p') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2015-public paper</Text>
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
        </View >

    );
}

export default Nepop;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE3E1',
    },

})