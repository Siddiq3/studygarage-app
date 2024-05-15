


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useQuizContext } from '../QuizContext'

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/6792182552';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true
});


const Quiz8 = ({ navigation, route }) => {
    const [totalQuestions, setTotalQuestions] = useState();
    const [questions, setQuestions] = useState();
    const [ques, setQues] = useState(0);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [correctQuestions, setCorrectQuestions] = useState(0);
    const [incorrectQuestions, setIncorrectQuestions] = useState(0);
    const [score, setscore] = useState(0);
    const { totalScore, updateTotalScore } = useQuizContext();

    const [interstitialLoaded, setInterstitialLoaded] = useState(false);
    const [interstitialTimer, setInterstitialTimer] = useState(0);

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
        const timerInterval = 25000; // 20 seconds

        const timer = setInterval(() => {
            setInterstitialTimer((prevTimer) => prevTimer + 1000);

            // Show interstitial ad every 40 seconds
            if (interstitialTimer >= timerInterval) {
                setInterstitialTimer(0);
                showInterstitialAd();
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [interstitialTimer]);

    // Function to load and show interstitial ad
    const showInterstitialAd = async () => {
        try {
            if (interstitialLoaded) {
                await interstitial.show();
                interstitial.load();
            } else {
                // If the interstitial ad is not loaded, try loading it
                interstitial.load();
            }
        } catch (e) {
            console.error('Failed to show interstitial ad:', e);
        }
    };



    useEffect(() => {
        const unsubscribeInterstitialEvents = loadInterstitial();

        // Load the interstitial ad when the component mounts
        interstitial.load();

        return () => {
            unsubscribeInterstitialEvents();
        };
    }, []);


    useEffect(() => {
        getQuiz();
    }, []);


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));

            if (timeLeft === 0) {
                handleNextPress();
            }

            if (ques === totalQuestions - 1 && timeLeft === 1) {
                handleShowResult();
                clearInterval(timer);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [ques, totalQuestions, timeLeft]);

    useEffect(() => {
        if (ques < totalQuestions) {
            setOptions((prevOptions) =>
                generateOptionsAndShuffle(
                    questions[ques].incorrect_answers.concat(questions[ques].correct_answer)
                )
            );
            setTimeLeft(20);
        }
    }, [ques, totalQuestions]);
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const generateOptionsAndShuffle = (_question) => {
        const options = [..._question];
        shuffleArray(options);
        return options;
    };

    const handleNextPress = () => {
        if (ques < totalQuestions - 1) {
            setQues((prevQues) => prevQues + 1);
            setOptions((prevOptions) =>
                generateOptionsAndShuffle(
                    questions[ques + 1].incorrect_answers.concat(questions[ques + 1].correct_answer)
                )
            );
            setTimeLeft(20);
        }

        if (ques === totalQuestions - 1) {
            handleShowResult();
        }
    };

    const handlSelectedOption = (_option) => {
        const optionsToShuffle = _option === questions[ques].correct_answer
            ? questions[ques].incorrect_answers.concat(questions[ques].correct_answer)
            : questions[ques].incorrect_answers;

        if (_option === questions[ques].correct_answer) {
            setscore((prevScore) => prevScore + 1);
            setCorrectQuestions((prevCorrect) => prevCorrect + 1);
        } else {
            setIncorrectQuestions((prevIncorrect) => prevIncorrect + 1);
        }

        if (ques < totalQuestions - 1) {
            setQues((prevQues) => prevQues + 1);
            setOptions((prevOptions) => generateOptionsAndShuffle(optionsToShuffle));
            setTimeLeft(15);
        }

        if (ques === totalQuestions - 1) {
            handleShowResult();


            updateTotalScore(score);

        }
    };
    const handleShowResult = () => {
        navigation.navigate('Result8', {
            score,
            totalQuestions,
            correctQuestions,
            incorrectQuestions,
            totalScore
        });
    };


    const getQuiz = async () => {
        setIsLoading(true);
        const url = 'https://siddiq3.github.io/Api/Quizapi8.json';

        try {
            const res = await fetch(url);
            const data = await res.json();

            setQuestions(data.results);
            setTotalQuestions(data.results.length);
            setOptions(generateOptionsAndShuffle(data.results[0].incorrect_answers.concat(data.results[0].correct_answer)));
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching quiz:', error);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            backHandler.remove();
        };
    }, []);

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
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>LOADING...</Text>
                </View>
            ) : (
                questions && questions.length > 0 && ques < totalQuestions ? (
                    <View style={styles.parent}>
                        <View style={styles.top}>
                            <View style={styles.top1}>
                                <Text style={styles.questionCount}>{ques + 1}/{totalQuestions}</Text>
                                <View style={styles.top2}>
                                    <Icon name="clock-o" size={24} color="#3498db" style={styles.timerIcon} />
                                    <Text style={styles.timer}>{timeLeft}s</Text>
                                </View>
                            </View>
                            <Text style={styles.question}>{decodeURIComponent(questions[ques].question)}</Text>
                        </View>

                        <View style={styles.options}>
                            {options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.optionButton}
                                    onPress={() => handlSelectedOption(option)}
                                >
                                    <Text style={styles.optionText}>{decodeURIComponent(option)}</Text>
                                </TouchableOpacity>
                            ))}
                            <GAMBannerAd
                                unitId={adUnitId1}
                                sizes={[BannerAdSize.LARGE_BANNER]}
                                requestOptions={{
                                    requestNonPersonalizedAdsOnly: true,
                                }}
                            />
                        </View>

                        <View style={styles.bottom}>
                            {ques !== totalQuestions - 1 && (
                                <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                                    <Text style={styles.buttonText}>SKIP</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                ) : (
                    <View style={styles.noQuestionsContainer}>
                        <Text style={styles.noQuestionsText}>No questions available.</Text>
                    </View>
                )
            )}
        </View>
    );
};

export default Quiz8;
const themeColor = '#3498db';
const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        fontSize: responsiveFontSize(3),
        fontWeight: '700',
        color: themeColor,
    },
    parent: {
        flex: 1,
    },
    top: {
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: '#f0f0f0',
    },
    top1: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: 10,

        width: '100%'
    },
    top2: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center',

        paddingHorizontal: 30,
        marginRight: 10,


        width: '100%'
    },
    questionCount: {
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
        color: themeColor,

    },
    timerIcon: {
        marginRight: 5,

    },
    timer: {
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        color: themeColor,
    },

    question: {
        fontSize: responsiveFontSize(2),
        fontWeight: '700',
        marginTop: 10,


    },
    options: {
        flex: 1,
        padding: 10,

    },
    optionButton: {
        paddingVertical: 12,
        marginVertical: 8,
        backgroundColor: themeColor,
        borderRadius: 8,
        alignItems: 'center',
    },
    optionText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 'auto',
        padding: 10,
    },
    button: {
        backgroundColor: themeColor,
        paddingVertical: 14,
        paddingHorizontal: 22,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
    },
    noQuestionsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noQuestionsText: {
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
        color: themeColor,
    },
});