import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking, } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/7122732961';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/7164109268';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'education', 'games', 'finance'],
});



const Class8tb = ({ navigation }) => {

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









                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('telugu tb8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('telugu tb8') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.ttb8)}</Text>)}
                    </TouchableOpacity >
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('hindi tb8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('hindi tb8') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.htb8)}</Text>)}
                    </TouchableOpacity >
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('english tb8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('english tb8') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.etb8)}</Text>)}
                    </TouchableOpacity >
                </Card>



                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('mathstm tb8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('mathstm tb8') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.mttb8)}</Text>)}
                    </TouchableOpacity >
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('mathsem tb8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('mathsem tb8') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.metb8)}</Text>)}
                    </TouchableOpacity >
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('nstm tb8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nstm tb8') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.nttb8)}</Text>)}
                    </TouchableOpacity >
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('nsem tb8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('nsem tb8') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.netb8)}</Text>)}
                    </TouchableOpacity >
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('pstm tb8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('pstm tb8') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.pttb8)}</Text>)}
                    </TouchableOpacity >
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('psem tb8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('psem tb8') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.petb8)}</Text>)}
                    </TouchableOpacity >
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('socialtm tb8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('socialtm tb8') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.sttb8)}</Text>)}
                    </TouchableOpacity >
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('socialem tb8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('socialem tb8') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.setb8)}</Text>)}
                    </TouchableOpacity >
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>
                        navigation.navigate('social3m tb8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('social3m tb8') }
                        }}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.s3tb8)}</Text>)}
                    </TouchableOpacity >
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

export default Class8tb;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});