import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { Card } from "react-native-shadow-cards";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInMilliseconds } from 'date-fns';


const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/7122732961';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/1382670753';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'education', 'games', 'finance'],
});



const class8 = ({ navigation }) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
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
        checkButtonStatus();
    }, []);
    useEffect(() => {
        if (buttonDisabled) {
            const intervalId = setInterval(() => {
                updateRemainingTime();
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [buttonDisabled]);
    const saveLastButtonClickTime = async () => {
        try {
            const currentTime = new Date();
            await AsyncStorage.setItem('lastButtonClickTime2', currentTime.toString());
        } catch (error) {
            console.error('Error saving last button click time:', error);
        }
    };

    const checkButtonStatus = async () => {
        try {
            const lastButtonClickTime2 = await AsyncStorage.getItem('lastButtonClickTime2');
            if (lastButtonClickTime2) {
                const timeDifference = differenceInMilliseconds(new Date(), new Date(lastButtonClickTime2));
                const fourHoursInMilliseconds = 24 * 60 * 60 * 1000;

                if (timeDifference < fourHoursInMilliseconds) {
                    setButtonDisabled(true);
                    setRemainingTime(fourHoursInMilliseconds - timeDifference);
                } else {
                    setButtonDisabled(false);
                }
            }
        } catch (error) {
            console.error('Error checking button status:', error);
        }
    };

    const updateRemainingTime = () => {
        setRemainingTime((prevTime) => {
            if (prevTime > 1000) {
                return prevTime - 1000;
            } else {
                setButtonDisabled(false);
                return 0;
            }
        });
    };

    const formatRemainingTime = (milliseconds) => {
        const seconds = Math.ceil(milliseconds / 1000);
        return `${Math.floor(seconds / 3600)}:${Math.floor((seconds % 3600) / 60)}:${seconds % 60}`;
    };

    const setButton = () => {
        if (!buttonDisabled) {
            // Add 5 coins to totalScore
            navigation.navigate('Question8');
            saveLastButtonClickTime();
            setButtonDisabled(true);
            setRemainingTime(24 * 60 * 60 * 1000);

            // Move the checkButtonStatus call here
            checkButtonStatus();

        }
    };


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



                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        marginLeft: 20,
                        backgroundColor: '#0C2A53',
                        borderRadius: 20,
                        height: responsiveHeight(21.5),
                        width: responsiveWidth(90),
                        marginTop: 5,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // Add a conditional style for a disabled button
                        opacity: buttonDisabled ? 0.5 : 1,
                        // Add a conditional background color for a disabled button
                        backgroundColor: buttonDisabled ? '#999999' : '#0C2A53',
                    }}
                    onPress={setButton}
                    disabled={buttonDisabled}
                >
                    {buttonDisabled ? (
                        <Text style={{
                            fontSize: responsiveFontSize(2),
                            fontWeight: '400',
                            color: '#caf0f8',
                            textAlign: 'center',
                            padding: 10,
                            backgroundColor: '#0C2A53',
                            borderRadius: 10,
                            marginTop: 10,
                        }}>
                            Today's Quiz Completed! To Earn More, Click on the "Earn With Quiz" Button.
                            {'\n'}
                            Or Try After 24 hours  Remaining Time: {formatRemainingTime(remainingTime)}
                        </Text>
                    ) : (
                        <>
                            {isLoading ? (
                                <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '500', color: '#ffffff' }}>
                                    Loading...
                                </Text>
                            ) : (
                                <>
                                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                                        {decodeURIComponent(questions?.t8 || '')} Quiz
                                    </Text>
                                    <Text style={{ fontSize: responsiveFontSize(2), color: '#ffffff' }}>
                                        Q. {decodeURIComponent(questions?.q8 || '')}?
                                    </Text>
                                </>
                            )}

                            <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '400', color: '#caf0f8' }}>
                                Click here for the answer
                            </Text>
                        </>
                    )}
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