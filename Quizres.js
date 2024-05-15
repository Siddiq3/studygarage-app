import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7830179472';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/4792952596';


const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true
});
const QuizResults = ({ route, navigation }) => {
    const { totalQuestions, correctQuestions, incorrectQuestions, score } = route.params;
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

        // Load the interstitial ad when the component mounts
        interstitial.load();

        return () => {
            unsubscribeInterstitialEvents();
        };
    }, []);
    // Calculate the percentage of correct answers
    const percentageCorrect = (correctQuestions / totalQuestions) * 100;

    // Define a function to award coins if the percentage is 50% or more
    const awardCoins = () => {
        if (percentageCorrect >= 50) {
            // Add your logic to award coins here
            // For example, you might call an API to add coins to the user's account
            console.log('Congratulations! You earned coins!');
        }
    };

    useEffect(() => {
        // Call the function to award coins when the component mounts
        awardCoins();
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        // Cleanup the event listener when the component unmounts
        return () => backHandler.remove();
    }, []);


    const handleRetry = async () => {
        try {
            // Retrieve stored stateBoard and classValue
            const storedStateBoard = await AsyncStorage.getItem('stateBoard');
            const storedClassValue = await AsyncStorage.getItem('classValue');

            if (storedStateBoard && storedClassValue) {
                // Data found, navigate to ChapterDetailsPage with stored data
                navigation.navigate('SubjectDataPage', {
                    stateBoard: storedStateBoard,
                    classValue: storedClassValue,
                });
            } else {
                // Data not found, show an alert
                Alert.alert('Data not found', 'Please fill in all required fields in the FirstPage.');
            }
        } catch (error) {
            console.error('Error checking stored data:', error);
        }
    };
    const handleContinue = async () => {
        try {
            const storedUserName = await AsyncStorage.getItem('userName');
            const storedAvatar = await AsyncStorage.getItem('avatar');
            const storedStateBoard = await AsyncStorage.getItem('stateBoard');
            const storedClassValue = await AsyncStorage.getItem('classValue');

            if (storedUserName && storedAvatar && storedStateBoard && storedClassValue) {
                // Data found, navigate to SecondPage with stored data
                navigation.navigate('SecondPage', {
                    userName: storedUserName,
                    stateBoard: storedStateBoard,
                    classValue: storedClassValue,
                    avatar: storedAvatar,
                });
            } else {
                // Data not found, show an alert
                Alert.alert('Data not found', 'Please fill in all required fields in the FirstPage.');
            }
        } catch (error) {
            console.error('Error checking stored data:', error);
        }
    };
    const handleBackPress = () => {
        // Show an alert with options for "Cancel" and "Back"
        Alert.alert(
            'Exit',
            'Are you sure you want to go back?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Back', onPress: handleContinue }
            ],
            { cancelable: false }
        );

        // Return true to prevent the default back button behavior
        return true;
    };




    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.card}>
                    <Text style={styles.resultText}>Quiz Results</Text>
                    <View style={styles.resultItem}>
                        <Text style={styles.labelText}>Total Questions:</Text>
                        <Text style={styles.valueText}>{totalQuestions}</Text>
                    </View>
                    <View style={styles.resultItem}>
                        <Text style={styles.labelTextCorrect}>Correct Questions:</Text>
                        <Text style={styles.valueTextCorrect}>{correctQuestions}</Text>
                    </View>
                    <View style={styles.resultItem}>
                        <Text style={styles.labelTextIncorrect}>Incorrect Questions:</Text>
                        <Text style={styles.valueTextIncorrect}>{incorrectQuestions}</Text>
                    </View>
                    <View style={styles.resultItem}>
                        <Text style={styles.labelText1}>Percentage Correct:</Text>
                        <Text style={styles.valueText}>{percentageCorrect.toFixed(2)}%</Text>
                    </View>


                </View>
                <Text style={styles.labelText2}>Need Minimum 50% Marks to Upload On Total Coins</Text>
                <TouchableOpacity style={styles.button} onPressOut={handleRetry} onPress={() => {
                    if (interstitialLoaded) {

                        interstitial.show();
                    } else { handleRetry }
                }}>
                    <Text style={styles.buttonText}>Retry</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPressOut={handleContinue} onPress={() => {
                    if (interstitialLoaded) {

                        interstitial.show();
                    } else { handleContinue }
                }} >
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>

            </ScrollView>
            <View style={styles.bannerContainer}>
                <GAMBannerAd
                    unitId={adUnitId1}
                    sizes={[BannerAdSize.LARGE_BANNER]}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //padding: 20,
        backgroundColor: '#f0f0f0',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    card: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        margin: 40,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    resultText: {
        fontSize: responsiveFontSize(3),
        fontWeight: '700',
        marginBottom: 20,
        color: '#3498db', // Unique color for the result text
    },
    resultItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        margin: 10
    },
    labelText: {
        color: '#F4BF96', // Unique color for label text
        fontSize: responsiveFontSize(2)
    },
    labelText1: {
        color: '#DA0C81', // Unique color for label text
        fontSize: responsiveFontSize(2)
    },
    labelText2: {
        // color: '#DA0C81', // Unique color for label text
        fontSize: responsiveFontSize(2),
        textAlign: 'center'
    },
    valueText: {
        color: '#34495e', // Unique color for value text
        fontSize: responsiveFontSize(2)
    },
    labelTextCorrect: {
        color: '#2ecc71', // Unique color for correct label text
        fontSize: responsiveFontSize(2)
    },
    valueTextCorrect: {
        color: '#2ecc71', // Unique color for correct value text
        fontSize: responsiveFontSize(2)
    },
    labelTextIncorrect: {
        color: '#e74c3c', // Unique color for incorrect label text
        fontSize: responsiveFontSize(2)
    },
    valueTextIncorrect: {
        color: '#e74c3c', // Unique color for incorrect value text
        fontSize: responsiveFontSize(2)
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 22,
        borderRadius: 8,
        marginTop: 20,
        width: "90%",
        margin: 10,
        padding: 15
    },
    buttonText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
        textAlign: 'center',
    },
    bannerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});

export default QuizResults;
