import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const Mocktest = ({ navigation }) => {

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const [questions, setQuestions] = useState(null);
    const [ques, setQues] = useState(0);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        const url = 'https://siddiq3.github.io/Api/mocktest.json';
        const res = await fetch(url);
        const data = await res.json();

        setQuestions(data.results);
        setOptions(generateOptionsAndShuffle(data.results[0]));
        setIsLoading(false);
    };

    useEffect(() => {
        getQuiz();
        }, []);

    const handleNextPress = () => {
        if (ques < questions.length - 1) {
            setQues(ques + 1);
            setOptions(generateOptionsAndShuffle(questions[ques + 1]));
        } else {
            handleShowResult();
        }
    };

    const generateOptionsAndShuffle = (_question) => {
        const options = [..._question.incorrect_answers];
        options.push(_question.correct_answer);
        shuffleArray(options);
        return options;
    };

    const handlSelectedOption = (_option) => {
        if (_option === questions[ques].correct_answer) {
            setScore(score + 1);
        }
        if (ques < questions.length - 1) {
            setQues(ques + 1);
            setOptions(generateOptionsAndShuffle(questions[ques + 1]));
        } else {
            handleShowResult();
        }
    };

    const handleShowResult = () => {
        navigation.navigate('mocktest Result', {
            score: score
        })
    }

    return (

        <View style={styles.container}>
            {isLoading ? (
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Text style={{ fontSize: 32, fontWeight: '700' }}>LOADING...</Text>
                </View>
            ) : questions && (
                <View style={styles.parent}>
                    <View style={styles.top}>
                        <Text style={styles.question}>Q. {decodeURIComponent(questions[ques].question)}</Text>
                    </View>

                    <View style={styles.options}>
                        {options.map((opt, index) => (
                            <TouchableOpacity key={index} style={styles.optionButtom} onPress={() => handlSelectedOption(opt)}>
                                <Text style={styles.option}>{decodeURIComponent(opt)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.bottom}>
                        {ques < questions.length - 1 ? (
                            <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                                <Text style={styles.buttonText}>SKIP</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableWithoutFeedback onPress={handleShowResult}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>SHOW RESULTS</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
};



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

export default Mocktest;
