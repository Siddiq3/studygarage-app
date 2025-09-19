import React, { useState, useEffect } from 'react';
import { 
    BackHandler, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuizContext } from '../QuizContext';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import MrecAdComponent from "../MrecAdComponent";


const Quiz6ka = ({ navigation }) => {
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [ques, setQues] = useState(0);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [correctQuestions, setCorrectQuestions] = useState(0);
    const [incorrectQuestions, setIncorrectQuestions] = useState(0);
    const [score, setScore] = useState(0);
    const { totalScore, updateTotalScore } = useQuizContext();

    useEffect(() => {
        getQuiz();
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            handleBackPress();
            return true;
        });
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime > 0) return prevTime - 1;
                handleNextPress();
                return 0;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [ques, totalQuestions]);

    useEffect(() => {
        if (questions.length > 0 && ques < totalQuestions) {
            setOptions(generateOptionsAndShuffle(
                questions[ques].incorrect_answers.concat(questions[ques].correct_answer)
            ));
            setTimeLeft(15);
        }
    }, [ques, questions]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const generateOptionsAndShuffle = (arr) => {
        const options = [...arr];
        shuffleArray(options);
        return options;
    };

    const getQuiz = async () => {
        setIsLoading(true);
        try {
            const url = 'https://siddiq3.github.io/Api/Quizapi6ka.json';
            const res = await fetch(url);
            const data = await res.json();
            setQuestions(data.results);
            setTotalQuestions(data.results.length);
            setOptions(generateOptionsAndShuffle(data.results[0].incorrect_answers.concat(data.results[0].correct_answer)));
        } catch (e) {
            console.error('Error fetching quiz:', e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNextPress = () => {
        if (ques < totalQuestions - 1) {
            setQues(prev => prev + 1);
        } else {
            handleShowResult();
        }
    };

    const handleSelectedOption = (option) => {
        if (option === questions[ques].correct_answer) {
            setScore(prev => prev + 1);
            setCorrectQuestions(prev => prev + 1);
        } else {
            setIncorrectQuestions(prev => prev + 1);
        }
        handleNextPress();
    };

    const handleShowResult = () => {
        updateTotalScore(score);
        navigation.navigate('Result6ka', {
            score,
            totalQuestions,
            correctQuestions,
            incorrectQuestions,
            totalScore
        });
    };

    const handleBackPress = async () => {
        try {
            const storedUserName = await AsyncStorage.getItem('userName');
            const storedAvatar = await AsyncStorage.getItem('avatar');
            const storedStateBoard = await AsyncStorage.getItem('stateBoard');
            const storedClassValue = await AsyncStorage.getItem('classValue');

            if (storedUserName && storedAvatar && storedStateBoard && storedClassValue) {
                navigation.navigate('SecondPage', {
                    userName: storedUserName,
                    avatar: storedAvatar,
                    stateBoard: storedStateBoard,
                    classValue: storedClassValue
                });
            } else {
                Alert.alert('Data not found', 'Please fill in all required fields in the FirstPage.');
            }
        } catch (error) {
            console.error('Error checking stored data:', error);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>LOADING...</Text>
                </View>
            ) : questions.length > 0 && ques < totalQuestions ? (
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
                                onPress={() => handleSelectedOption(option)}
                            >
                                <Text style={styles.optionText}>{decodeURIComponent(option)}</Text>
                            </TouchableOpacity>
                        ))}
                        <MrecAdComponent/>
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
            )}
        </View>
    );
};

const themeColor = '#3498db';
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { fontSize: responsiveFontSize(3), fontWeight: '700', color: themeColor },
    parent: { flex: 1 },
    top: { marginTop: 15, alignItems: 'center' },
    top1: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10, marginBottom: 10 },
    top2: { flexDirection: 'row', alignItems: 'center' },
    questionCount: { fontSize: responsiveFontSize(2), fontWeight: '600', color: themeColor },
    timerIcon: { marginRight: 5 },
    timer: { fontSize: responsiveFontSize(2), fontWeight: '500', color: themeColor },
    question: { fontSize: responsiveFontSize(2), fontWeight: '700', marginVertical: 10 },
    options: { flex: 1, width: '100%' },
    optionButton: { padding: 12, marginVertical: 8, backgroundColor: themeColor, borderRadius: 8, alignItems: 'center' },
    optionText: { color: 'white', fontSize: responsiveFontSize(2), fontWeight: '500' },
    bottom: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
    button: { backgroundColor: themeColor, paddingVertical: 14, paddingHorizontal: 22, borderRadius: 8 },
    buttonText: { color: 'white', fontSize: responsiveFontSize(2), fontWeight: '600' },
    noQuestionsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    noQuestionsText: { fontSize: responsiveFontSize(2), fontWeight: '600', color: themeColor },
});

export default Quiz6ka;
