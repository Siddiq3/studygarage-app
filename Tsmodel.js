import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking, TouchableOpacity, BackHandler } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/6792182552';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true
});




const Tsmodel = ({ navigation }) => {
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

                <Text style={{ fontSize: 25, textAlign: 'center', color: '#D82148' }}>        MODEL  PAPERS


                </Text>




                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('telugu testpapersTS')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('telugu testpapersTS') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> TELUGU</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('hindi testpapersTS')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('hindi testpapersTS') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> HINDI</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('english testpapersTS')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('english testpapersTS') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> ENGLISH</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('maths em testpapersTS')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('maths em testpapersTS') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> MATHAMATICS-EM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('maths tm testpapersTS')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('maths tm testpapersTS') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> MATHAMATICS-TM</Text>
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('physics em testpapersTS')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('physics em testpapersTS') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> PS-EM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('physics tm testpapersTS')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('physics tm testpapersTS') }
                        }}
                    >

                        <Text style={{ fontSize: 20 }}> PS-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('ns em testpapersTS')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('ns em testpapersTS') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> NS-EM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('ns tm testpapersTS')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('ns tm testpapersTS') }
                        }}
                    >

                        <Text style={{ fontSize: 20 }}> NS-TM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('social tm testpapersTS')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('social tm testpapersTS') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> SOCIAL-TM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('social em testpapersTS')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('social em testpapersTS') }
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

export default Tsmodel;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});