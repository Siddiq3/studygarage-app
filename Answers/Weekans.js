
import React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, Modal, Animated, ScrollView, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { GAMBannerAd, BannerAdSize, TestIds, AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/2465924734';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});
const Weekans = ({ navigation }) => {
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
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [questions1, setQuestions1] = useState([]);
    const [questions2, setQuestions2] = useState([]);
    const [questions3, setQuestions3] = useState([]);
    const [questions4, setQuestions4] = useState([]);
    const [questions5, setQuestions5] = useState([]);
    const [questions6, setQuestions6] = useState([]);
    const [questions7, setQuestions7] = useState([]);
    const [questions8, setQuestions8] = useState([]);
    const [questions9, setQuestions9] = useState([]);
    const [questions10, setQuestions10] = useState([]);
    const [questions11, setQuestions11] = useState([]);
    const [questions12, setQuestions12] = useState([]);
    const [questions14, setQuestions14] = useState([]);
    const [questions13, setQuestions13] = useState([]);
    const getQuiz = async () => {
        setIsLoading(true)
        const url = 'https://siddiq3.github.io/Api/WeekQuizapi.json';
        const res = await fetch(url);
        const data = await res.json();

        setQuestions(data.results[0]);
        setQuestions1(data.results[1]);
        setQuestions2(data.results[2]);
        setQuestions3(data.results[3]);
        setQuestions4(data.results[4]);
        setQuestions5(data.results[5]);
        setQuestions6(data.results[6]);
        setQuestions7(data.results[7]);
        setQuestions8(data.results[8]);
        setQuestions9(data.results[9]);
        setQuestions10(data.results[10]);
        setQuestions11(data.results[11]);
        setQuestions12(data.results[12]);
        setQuestions13(data.results[13]);
        setQuestions14(data.results[14]);

        setIsLoading(false)
    };

    useEffect(() => {
        getQuiz();
    }, []);

    return (

        <View style={styles.container}>
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
            <ScrollView>
                {isLoading ? <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Text style={{ fontSize: 32, fontWeight: '700' }}>LOADING...</Text>

                </View> : questions && (
                    <View style={{ flex: 1 }}>


                        <Text style={{ fontSize: 28, fontWeight: '700', }}>Q. {decodeURIComponent(questions.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions.correct_answer)}</Text>


                        <Text ></Text>
                        <Text ></Text>

                        <Text style={{ fontSize: 28, fontWeight: '700' }}>Q. {decodeURIComponent(questions1.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions1.correct_answer)}</Text>
                        <Text ></Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 28, fontWeight: '700', }}>Q. {decodeURIComponent(questions2.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions2.correct_answer)}</Text>


                        <Text ></Text>
                        <Text ></Text>

                        <Text style={{ fontSize: 28, fontWeight: '700' }}>Q. {decodeURIComponent(questions3.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions3.correct_answer)}</Text>
                        <Text ></Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 28, fontWeight: '700', }}>Q. {decodeURIComponent(questions4.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions4.correct_answer)}</Text>


                        <Text ></Text>
                        <Text ></Text>

                        <Text style={{ fontSize: 28, fontWeight: '700' }}>Q. {decodeURIComponent(questions5.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions5.correct_answer)}</Text>
                        <Text ></Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 28, fontWeight: '700', }}>Q. {decodeURIComponent(questions6.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions6.correct_answer)}</Text>


                        <Text ></Text>
                        <Text ></Text>

                        <Text style={{ fontSize: 28, fontWeight: '700' }}>Q. {decodeURIComponent(questions7.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions7.correct_answer)}</Text>
                        <Text ></Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 28, fontWeight: '700', }}>Q. {decodeURIComponent(questions8.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions8.correct_answer)}</Text>


                        <Text ></Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 28, fontWeight: '700', }}>Q. {decodeURIComponent(questions9.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions9.correct_answer)}</Text>
                        <Text ></Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 28, fontWeight: '700' }}>Q. {decodeURIComponent(questions10.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions10.correct_answer)}</Text>
                        <Text ></Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 28, fontWeight: '700', }}>Q. {decodeURIComponent(questions11.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions11.correct_answer)}</Text>


                        <Text ></Text>
                        <Text ></Text>

                        <Text style={{ fontSize: 28, fontWeight: '700' }}>Q. {decodeURIComponent(questions12.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions12.correct_answer)}</Text>
                        <Text ></Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 28, fontWeight: '700', }}>Q. {decodeURIComponent(questions13.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions13.correct_answer)}</Text>


                        <Text ></Text>
                        <Text ></Text>

                        <Text style={{ fontSize: 28, fontWeight: '700' }}>Q. {decodeURIComponent(questions14.question)}</Text>
                        <Text ></Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', }}> Ans:{decodeURIComponent(questions14.correct_answer)}</Text>
                        <Text ></Text>
                        <Text ></Text>








                    </View>
                )}
            </ScrollView>

            <View style={styles.bottom}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('10th class')} style={styles.button}
                    onPressOut={() => {
                        if (interstitialLoaded) {

                            interstitial.show();
                        } else { navigation.navigate('10th class') }
                    }}
                >
                    <Text style={styles.buttonText}>GO TO HOME</Text>
                </TouchableWithoutFeedback>
            </View>
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.LEADERBOARD]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    )
}
export default Weekans;
const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%',
    },
    buttonText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#348AC7',
        textAlign: 'center'
    },
    bottom: {
        marginBottom: 12,
        paddingVertical: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
});