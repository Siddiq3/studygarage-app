import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Alert, 
    BackHandler 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import MrecAdComponent from "../MrecAdComponent";


const Quiz7 = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [ques, setQues] = useState(0);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getQuiz();

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                handleBackPress();
                return true;
            }
        );
        return () => backHandler.remove();
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const generateOptionsAndShuffle = (_question) => {
        const opts = [..._question.incorrect_answers];
        opts.push(_question.correct_answer);
        shuffleArray(opts);
        return opts;
    };

    const getQuiz = async () => {
        try {
            const res = await fetch('https://siddiq3.github.io/Api/Quizapi7.json');
            const data = await res.json();
            setQuestions(data.results);
            setOptions(generateOptionsAndShuffle(data.results[0]));
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to load quiz.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNextPress = () => {
        if (ques < questions.length - 1) {
            const nextQues = ques + 1;
            setQues(nextQues);
            setOptions(generateOptionsAndShuffle(questions[nextQues]));
        } else {
            handleShowResult();
        }
    };

    const handleSelectedOption = (option) => {
        if (option === questions[ques].correct_answer) {
            setScore(prev => prev + 10);
        }
        handleNextPress();
    };

    const handleShowResult = () => {
        navigation.navigate('Result7', { score });
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
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>LOADING...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {questions.length > 0 && (
                <View style={styles.parent}>
                    <View style={styles.top}>
                        <Text style={styles.question}>Q. {decodeURIComponent(questions[ques].question)}</Text>
                    </View>
                    <View style={styles.options}>
                        {options.map((option, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={styles.optionButton}
                                onPress={() => handleSelectedOption(option)}
                            >
                                <Text style={styles.optionText}>{decodeURIComponent(option)}</Text>
                            </TouchableOpacity>
                        ))}
                        <MrecAdComponent/>
                    </View>
                    <View style={styles.bottom}>
                        {ques < questions.length - 1 ? (
                            <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                                <Text style={styles.buttonText}>SKIP</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.button} onPress={handleShowResult}>
                                <Text style={styles.buttonText}>SHOW RESULTS</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 40, paddingHorizontal: 20 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { fontSize: 32, fontWeight: '700' },
    parent: { flex: 1 },
    top: { marginVertical: 16 },
    options: { flex: 1, marginVertical: 16 },
    optionButton: { padding: 12, marginVertical: 6, backgroundColor: '#34A0A4', borderRadius: 12 },
    optionText: { color: 'white', fontSize: responsiveFontSize(1.7), fontWeight: '500' },
    bottom: { flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 16 },
    button: { backgroundColor: '#1A759F', padding: 12, paddingHorizontal: 16, borderRadius: 16 },
    buttonText: { fontSize: 28, fontWeight: 'bold', color: '#ED4264' },
    question: { fontSize: responsiveFontSize(2.1) },
});

export default Quiz7;
