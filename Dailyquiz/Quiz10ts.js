import { BackHandler, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useQuizContext } from '../QuizContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize } from 'react-native-responsive-dimensions'; // or your own function
import MrecAdComponent from "../MrecAdComponent";


const Quiz10ts = ({ navigation }) => {
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

  // Fetch quiz
  const getQuiz = async () => {
    setIsLoading(true);
    const url = 'https://siddiq3.github.io/Api/Quizapi10ts.json';
    try {
      const res = await fetch(url);
      const data = await res.json();
      setQuestions(data.results);
      setTotalQuestions(data.results.length);
      setOptions(shuffleOptions(data.results[0].incorrect_answers.concat(data.results[0].correct_answer)));
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  // Timer
  useEffect(() => {
    if (ques >= totalQuestions) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNextPress();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [ques, totalQuestions]);

  // Shuffle options for each question
  useEffect(() => {
    if (questions.length && ques < totalQuestions) {
      setOptions(shuffleOptions(questions[ques].incorrect_answers.concat(questions[ques].correct_answer)));
      setTimeLeft(15);
    }
  }, [ques, questions]);

  const shuffleOptions = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleNextPress = () => {
    if (ques < totalQuestions - 1) {
      setQues(prev => prev + 1);
    } else {
      handleShowResult();
    }
  };

  const handleSelectedOption = (selectedOption) => {
    if (selectedOption === questions[ques].correct_answer) {
      setScore(prev => prev + 1);
      setCorrectQuestions(prev => prev + 1);
    } else {
      setIncorrectQuestions(prev => prev + 1);
    }
    handleNextPress();
  };

  const handleShowResult = () => {
    updateTotalScore(score);
    navigation.navigate('Result10ts', {
      score,
      totalQuestions,
      correctQuestions,
      incorrectQuestions,
      totalScore,
    });
  };

  // BackHandler
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    Alert.alert('Exit', 'Are you sure you want to go back?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Back', onPress: handleContinue }
    ], { cancelable: false });
    return true;
  };

  const handleContinue = async () => {
    try {
      const storedUserName = await AsyncStorage.getItem('userName');
      const storedAvatar = await AsyncStorage.getItem('avatar');
      const storedStateBoard = await AsyncStorage.getItem('stateBoard');
      const storedClassValue = await AsyncStorage.getItem('classValue');

      if (storedUserName && storedAvatar && storedStateBoard && storedClassValue) {
        navigation.navigate('SecondPage', {
          userName: storedUserName,
          stateBoard: storedStateBoard,
          classValue: storedClassValue,
          avatar: storedAvatar,
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
      ) : questions.length > 0 ? (
        <View style={styles.parent}>
          <View style={styles.top}>
            <View style={styles.top1}>
              <Text style={styles.questionCount}>{ques + 1}/{totalQuestions}</Text>
              <View style={styles.top2}>
                <Icon name="clock-o" size={24} color={themeColor} style={styles.timerIcon} />
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
  container: { padding: 20, flex: 1, backgroundColor: '#f0f0f0' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { fontSize: responsiveFontSize(3), fontWeight: '700', color: themeColor },
  parent: { flex: 1 },
  top: { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15 },
  top1: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15, width: '100%' },
  top2: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 10, width: '100%' },
  questionCount: { fontSize: responsiveFontSize(2), fontWeight: '600', color: themeColor },
  timerIcon: { marginRight: 5 },
  timer: { fontSize: responsiveFontSize(2), fontWeight: '500', color: themeColor },
  question: { fontSize: responsiveFontSize(2), fontWeight: '700', marginTop: 10 },
  options: { flex: 1, padding: 10 },
  optionButton: { paddingVertical: 12, marginVertical: 8, backgroundColor: themeColor, borderRadius: 8, alignItems: 'center' },
  optionText: { color: 'white', fontSize: responsiveFontSize(2), fontWeight: '500' },
  bottom: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 'auto', padding: 10 },
  button: { backgroundColor: themeColor, paddingVertical: 14, paddingHorizontal: 22, borderRadius: 8 },
  buttonText: { color: 'white', fontSize: responsiveFontSize(2), fontWeight: '600' },
  noQuestionsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  noQuestionsText: { fontSize: responsiveFontSize(2), fontWeight: '600', color: themeColor },
});

export default Quiz10ts;
