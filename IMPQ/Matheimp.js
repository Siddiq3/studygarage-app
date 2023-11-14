import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking, TouchableWithoutFeedback } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5720822270';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/1382670753';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'education', 'games', 'finance', 'trade'],
});




const Matei = ({ navigation }) => {
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






                <Card style={{ padding: 15, margin: 15 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('mathsem material')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('mathsem material') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> MathsEm MATERIAL</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 15, margin: 15 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('mathsem 8m')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('mathsem 8m') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> 8 MARK IMP QUES(GUNSHOT)</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 15, margin: 15 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('mathsem 4m')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('mathsem 4m') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> 4 MARK IMPQUES</Text>
                    </TouchableWithoutFeedback>
                </Card>



                <Card style={{ padding: 15, margin: 15 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('mathsem 2m')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('mathsem 2m') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> 2 MARK IMP QUES</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 15, margin: 15 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('mathsem 1m')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('mathsem 1m') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> 1 MARK IMP QUES</Text>
                    </TouchableWithoutFeedback>
                </Card>


                <Card style={{ padding: 15, margin: 15 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('mathsem bits')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('mathsem bits') }
                        }}
                    >
                        <Text style={{ fontSize: 20 }}> MATHSEM-BITS</Text>
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

export default Matei;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});
