


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useQuizContext } from './QuizContext';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/7472911313';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/3943023557';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true
});

const Quizques = ({ navigation, route }) => {
    const [nativeAd, setNativeAd] = useState(null);


    const [totalQuestions, setTotalQuestions] = useState();
    const [correctQuestions, setCorrectQuestions] = useState(0);
    const [incorrectQuestions, setIncorrectQuestions] = useState(0);
    const [questions, setQuestions] = useState();
    const [ques, setQues] = useState(0);
    const [score, setscore] = useState(0);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const { class1, subject, chapter } = route.params;
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
        const timerInterval = 40000; // 40 seconds

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
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };


    // Use another useEffect to observe changes in the questions state
    useEffect(() => {
        if (questions && questions.length > 0) {
            setOptions(generateOptionsAndShuffle(questions[0]));
        }
    }, [questions]);



    const handleNextPress = () => {
        if (ques < totalQuestions - 1) {
            setQues(ques + 1);
            setOptions(generateOptionsAndShuffle(questions[ques + 1]));
            setTimeLeft(20);

        }

        if (ques === totalQuestions - 1) {
            handleShowResult();
        }
    };

    const generateOptionsAndShuffle = (_question) => {
        const options = [..._question.incorrect_answers, _question.correct_answer];

        shuffleArray(options);

        const uniqueOptions = Array.from(new Set(options));

        return uniqueOptions;
    };

    const handlSelectedOption = (_option) => {
        if (_option === questions[ques].correct_answer) {
            setscore(score + 1);
            setCorrectQuestions(correctQuestions + 1);
        } else {
            setIncorrectQuestions(incorrectQuestions + 1);
        }

        if (ques < totalQuestions - 1) {
            setQues(ques + 1);
            setOptions(generateOptionsAndShuffle(questions[ques + 1]));
            setTimeLeft(20);
        }

        if (ques === totalQuestions - 1) {
            handleShowResult();
        }
        if (ques === totalQuestions - 1) {
            const percentageCorrect = (correctQuestions / totalQuestions) * 100;
            if (percentageCorrect >= 50) {
                console.log('score is', score)
                updateTotalScore(score);
            }
        }

    };

    const handleShowResult = () => {
        navigation.navigate('Quiz Results', {
            score,
            totalQuestions,
            correctQuestions,
            incorrectQuestions,
            totalScore

        });
    };

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

    const getQuiz = async () => {
        setIsLoading(true);
        const url = `https://api.way2employee.com/quiz/${class1}/${subject}/${chapter}`;
        const res = await fetch(url);
        const data = await res.json();

        setQuestions(data.results);
        setTotalQuestions(data.results.length);
        setOptions(generateOptionsAndShuffle(data.results[0]));
        setIsLoading(false);
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
                        <View style={styles.top} >
                            <View style={styles.top1}>
                                <Text style={styles.questionCount}>{ques + 1}/{totalQuestions}</Text>
                                <View style={styles.top2}>
                                    <Icon name="clock-o" size={24} color="#3498db" style={styles.timerIcon} />
                                    <Text style={styles.timer}>{timeLeft}s</Text>
                                </View>
                            </View>
                            <Text style={styles.question}>Q. {decodeURIComponent(questions[ques].question)}</Text>
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
                            {ques !== totalQuestions - 1 && <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                                <Text style={styles.buttonText}>SKIP</Text>
                            </TouchableOpacity>}

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

export default Quizques;