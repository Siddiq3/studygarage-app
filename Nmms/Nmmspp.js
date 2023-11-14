import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking, TouchableOpacity, Image } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/6943855982';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/7368142213';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'education,games,finance'],
});




const Nmmspp = ({ navigation }) => {


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





                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() =>
                            navigation.navigate('nmms2023em')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms203em') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2023em)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2023tm')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2023tm') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2023tm)}</Text>)}
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2022em')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2022em') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2022em)}</Text>)}
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2022tm')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2022tm') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2022tm)}</Text>)}
                    </TouchableOpacity>
                </Card>



                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2019em1')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2019em1') }
                        }} >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2019em1)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2019em2')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2019em2') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2019em2)}</Text>)}
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2019em3')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2019em3') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2019em3)}</Text>)}
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2019em4')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2019em4') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2019em4)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2019tm1')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2019tm1') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2019tm1)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2019tm2')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2019tm2') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2019tm2)}</Text>)}
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2019tm3')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2019tm3') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2019tm3)}</Text>)}
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2019tm4')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2019tm4') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2019tm4)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2018em1')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2018em1') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2018em1)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2018em2')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2018em2') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2018em2)}</Text>)}
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2018em3')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2018em3') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2018em3)}</Text>)}
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2018em4')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2018em4') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2018em4)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2018tm1')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2018tm1') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2018tm1)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2018tm2')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2018tm2') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2018tm2)}</Text>)}
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2018tm3')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2018tm3') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2018tm3)}</Text>)}
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2018tm4')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2018tm4') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2018tm4)}</Text>)}
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2017em')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2017em') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2017em)}</Text>)}
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2017tm')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2017tm') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2017tm)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2016em')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2016em') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2016em)}</Text>)}
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2016tm')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2016tm') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2016tm)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2015em')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2015em') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2015em)}</Text>)}
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2015tm')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2015tm') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2015tm)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2014em')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2014em') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2014em)}</Text>)}
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() =>
                        navigation.navigate('nmms2014tm')}
                        onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nmms2014tm') }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nmms2014tm)}</Text>)}
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

export default Nmmspp;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});
