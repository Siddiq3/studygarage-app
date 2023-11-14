import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { Card } from "react-native-shadow-cards";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';


const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/7122732961';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/1382670753';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'education', 'games', 'finance'],
});



const class8 = ({ navigation }) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getQuiz = async () => {
        setIsLoading(true)
        const url1 = 'https://siddiq3.github.io/Api/Cardapi.json';
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



                <TouchableOpacity activeOpacity={1} style={{ marginLeft: 15, color: '#772262', backgroundColor: '#e5383b', borderRadius: 20, height: responsiveHeight(21.5), width: responsiveWidth(90), marginTop: 25 }} onPress={() =>
                    navigation.navigate('Question8')}>

                    {isLoading ? <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '500', color: '#ffffff', textAlign: 'center' }}>Loading...</Text> : questions && (<Text style={{ fontSize: responsiveFontSize(3), textAlign: 'center', fontWeight: 'bold', color: '#000000' }} >Q. {decodeURIComponent(questions.t8)}</Text>)}
                    {isLoading ? <Text style={{ fontSize: responsiveFontSize(3), fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2.5), textAlignVertical: 'center', color: '#ffffff' }} >Q. {decodeURIComponent(questions.q8)}?</Text>)}

                    <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '400', color: '#ffffff', textAlign: 'center' }}>click here for answer</Text>

                </TouchableOpacity>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('8thclass tb')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('8thclass tb') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.tb8)}</Text>)}
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('8thclass imp')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('8thclass imp') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.imp8)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('8thclass study')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('8thclass study') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.study8)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('8thclass exam')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('8thclass exam') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.exam8)}</Text>)}
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

export default class8;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});