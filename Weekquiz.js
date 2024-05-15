import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import { useQuizContext } from "./QuizContext" // Import the context hook

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';


const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/2465924734';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true
});


const WeekQues = ({ navigation }) => {

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

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    //const { weeklyScore, updateWeeklyScore, totalScore, updateTotalScore } = useQuizContext();
    const [questions, setQuestions] = useState();
    const [ques, setQues] = useState(0);
    const [options, setOptions] = useState([])
    const [score, setScore] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const getQuiz = async () => {
        setIsLoading(true);

        const url = 'https://siddiq3.github.io/Api/WeekQuizapi.json';
        const res = await fetch(url);
        const data = await res.json();

        setQuestions(data.results);

        setOptions(generateOptionsAndShuffle(data.results[0]))
        setIsLoading(false)
    };

    useEffect(() => {
        getQuiz();
    }, []);

    const handleNextPress = () => {
        setQues(ques + 1)
        setOptions(generateOptionsAndShuffle(questions[ques + 1]))
    }

    const generateOptionsAndShuffle = (_question) => {
        const options = [..._question.incorrect_answers]
        options.push(_question.correct_answer)

        shuffleArray(options)

        return options
    }

    const handlSelectedOption = (_option) => {
        if (_option === questions[ques].correct_answer) {
            setScore(score + 10)
            //updateWeeklyScore(10)


        }
        if (ques !== 14) {
            setQues(ques + 1)
            setOptions(generateOptionsAndShuffle(questions[ques + 1]))
        }
        if (ques === 15) {
            handleShowResult()
        }
    }

    const handleShowResult = () => {


        // Navigate to 'Weekly Result'
        navigation.navigate('Weekly Result', {
            score: score


        });
    };


    return (

        <View style={styles.container}>


            {isLoading ? <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Text style={{ fontSize: 32, fontWeight: '700' }}>LOADING...</Text>
            </View> : questions && (
                <View style={styles.parent}>
                    <View style={styles.top}>
                        <Text style={styles.question}>Q. {decodeURIComponent(questions[ques].question)}</Text>
                    </View>

                    <View style={styles.options}>

                        <TouchableOpacity style={styles.optionButtom} onPress={() => handlSelectedOption(options[0])}>
                            <Text style={styles.option}>{decodeURIComponent(options[0])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButtom} onPress={() => handlSelectedOption(options[1])}>
                            <Text style={styles.option}>{decodeURIComponent(options[1])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButtom} onPress={() => handlSelectedOption(options[2])}>
                            <Text style={styles.option}>{decodeURIComponent(options[2])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButtom} onPress={() => handlSelectedOption(options[3])}>
                            <Text style={styles.option}>{decodeURIComponent(options[3])}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                        {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>PREV</Text>
            </TouchableOpacity> */}

                        {ques !== 14 && <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                            <Text style={styles.buttonText}>SKIP</Text>
                        </TouchableOpacity>}




                        {ques === 14 && <TouchableWithoutFeedback style={styles.button} onPress={handleShowResult}
                            onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                }
                                else { handleShowResult }

                            }}>
                            <Text style={styles.buttonText}>SHOW RESULTS</Text>
                        </TouchableWithoutFeedback>}



                    </View>
                </View>
            )}
        </View>

    )
}

export default WeekQues;
const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%',
    },
    top: {
        marginVertical: 16,
    },
    options: {
        marginVertical: 16,
        flex: 1,
    },
    bottom: {
        marginBottom: 12,
        paddingVertical: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#1A759F',
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ED4264',
    },
    question: {
        fontSize: 28,
    },
    option: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
    },
    optionButtom: {
        paddingVertical: 12,
        marginVertical: 6,
        backgroundColor: '#34A0A4',
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    parent: {
        height: '100%',
    },
});