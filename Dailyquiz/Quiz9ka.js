import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useQuizContext } from '../QuizContext';
import MrecAdComponent from "../MrecAdComponent";


const Quiz9ka = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { totalScore, updateTotalScore } = useQuizContext();

  useEffect(() => {
    getQuiz();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setOptions(shuffleOptions([
        ...questions[ques].incorrect_answers,
        questions[ques].correct_answer
      ]));
      setTimeLeft(15);
    }
  }, [ques, questions]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) handleNextPress();
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [ques, questions]);

  const shuffleOptions = (arr) => {
    let optionsArr = [...arr];
    for (let i = optionsArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsArr[i], optionsArr[j]] = [optionsArr[j], optionsArr[i]];
    }
    return optionsArr;
  };

  const getQuiz = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('https://siddiq3.github.io/Api/Quizapi9ka.json');
      const data = await res.json();
      setQuestions(data.results);
      setOptions(shuffleOptions([...data.results[0].incorrect_answers, data.results[0].correct_answer]));
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load quiz.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPress = () => {
    if (ques < questions.length - 1) {
      setQues(prev => prev + 1);
    } else {
      handleShowResult();
    }
  };

  const handleSelectedOption = (option) => {
    const correctAnswer = questions[ques].correct_answer;
    if (option === correctAnswer) {
      setScore(prev => prev + 1);
      setCorrectQuestions(prev => prev + 1);
    } else {
      setIncorrectQuestions(prev => prev + 1);
    }
    handleNextPress();
  };

  const handleShowResult = () => {
    updateTotalScore(score);
    navigation.navigate('Result9ka', {
      score,
      totalQuestions: questions.length,
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
      console.error(error);
    }
    return true;
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
            <View style={styles.top1}>
              <Text style={styles.questionCount}>{ques + 1}/{questions.length}</Text>
              <View style={styles.top2}>
                <Icon name="clock-o" size={24} color="#3498db" />
                <Text style={styles.timer}>{timeLeft}s</Text>
              </View>
            </View>
            <Text style={styles.question}>{decodeURIComponent(questions[ques].question)}</Text>
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
            {ques < questions.length - 1 && (
              <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                <Text style={styles.buttonText}>SKIP</Text>
              </TouchableOpacity>
            )}
          </View>
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
  top: { flexDirection: 'column', alignItems: 'center', marginTop: 15 },
  top1: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 },
  top2: { flexDirection: 'row', alignItems: 'center' },
  questionCount: { fontSize: responsiveFontSize(2), fontWeight: '600', color: themeColor },
  timer: { fontSize: responsiveFontSize(2), fontWeight: '500', color: themeColor, marginLeft: 5 },
  question: { fontSize: responsiveFontSize(2), fontWeight: '700', marginTop: 10 },
  options: { flex: 1, padding: 10 },
  optionButton: { paddingVertical: 12, marginVertical: 8, backgroundColor: themeColor, borderRadius: 8, alignItems: 'center' },
  optionText: { color: 'white', fontSize: responsiveFontSize(2), fontWeight: '500' },
  bottom: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 'auto', padding: 10 },
  button: { backgroundColor: themeColor, paddingVertical: 14, paddingHorizontal: 22, borderRadius: 8 },
  buttonText: { color: 'white', fontSize: responsiveFontSize(2), fontWeight: '600' },
});

export default Quiz9ka;
