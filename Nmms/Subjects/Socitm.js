import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking, TouchableOpacity, Image } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/1754891563';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/7426607370';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'education,games,finance'],
});




const Nmmssot = ({ navigation }) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getQuiz = async () => {
        setIsLoading(true)
        const url1 = 'https://siddiq3.github.io/Api/nmms.json';
        const res = await fetch(url1);
        const data = await res.json();

        setQuestions(data.results[0]);

        setIsLoading(false)

    };

    useEffect(() => {
        getQuiz();
    }, []);
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






                <Card style={{ padding: 10, margin: 15 }} >
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('nmmssot1')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmmssot1') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmmssot1)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }} >
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('nmmssot2')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmmssot2') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmmssot2)}</Text>)}
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 10, margin: 15 }} >
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('nmmssot3')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmmssot3') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmmssot3)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }} >
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('nmmssot4')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmmssot4') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmmssot4)}</Text>)}
                    </TouchableOpacity>
                </Card>




                <Card style={{ padding: 10, margin: 15 }} >
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('nmmssot5')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmmssot5') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmmssot5)}</Text>)}
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }} >
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('nmmssot6')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmmssot6') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmmssot6)}</Text>)}
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }} >
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('nmmssot7')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmmssot7') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmmssot7)}</Text>)}
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }} >
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('nmmssot8')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmmssot8') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmmssot8)}</Text>)}
                    </TouchableOpacity>
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

export default Nmmssot;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});