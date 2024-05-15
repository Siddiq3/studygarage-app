import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking, TouchableWithoutFeedback, } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/6792182552';


const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'education', 'games', 'finance'],
});



const Ssc = ({ navigation }) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getQuiz = async () => {
        setIsLoading(true)
        const url1 = 'https://siddiq3.github.io/Api/subject.json';
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





                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('telugu ssc2023')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('telugu ssc2023') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.sub1)}</Text>)}
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('hindi ssc2023')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('hindi ssc2023') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.sub2)}</Text>)}
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('english ssc2023')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('english ssc2023') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.sub3)}</Text>)}
                    </TouchableWithoutFeedback>
                </Card>


                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('maths em ssc2023')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('maths em ssc2023') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.sub4)}</Text>)}
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('maths tm ssc2023')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('maths tm ssc2023') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.sub5)}</Text>)}
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('biology em ssc2023')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('biology em ssc2023') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.sub6)}</Text>)}
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('biology tm ssc2023')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('biology tm ssc2023') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.sub7)}</Text>)}
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('physics em ssc2023')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('physics em ssc2023') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.sub8)}</Text>)}
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('physics tm ssc2023')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('physics tm ssc2023') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.sub9)}</Text>)}
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('social tm ssc2023')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('social tm ssc2023') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.sub10)}</Text>)}
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('social em ssc2023')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('social em ssc2023') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.sub11)}</Text>)}
                    </TouchableWithoutFeedback>
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

export default Ssc;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});