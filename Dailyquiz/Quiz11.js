import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize } from 'react-native-responsive-dimensions'; // or your own function4
import MrecAdComponent from "../MrecAdComponent";


const Quiz11 = ({ navigation }) => {
  const [loaded, setLoaded] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLoaded(true);
    fetchQuiz();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

  const fetchQuiz = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://siddiq3.github.io/Api/Quizapi11.json');
      const data = await res.json();
      setQuestions(data.results);
      setOptions(generateOptionsAndShuffle(data.results[0]));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const generateOptionsAndShuffle = (_question) => {
    const opts = [..._question.incorrect_answers, _question.correct_answer];
    return shuffleArray(opts);
  };

  const handleNextPress = () => {
    if (ques < questions.length - 1) {
      setQues(prev => prev + 1);
      setOptions(generateOptionsAndShuffle(questions[ques + 1]));
    } else {
      handleShowResult();
    }
  };

  const handleSelectedOption = (selectedOption) => {
    if (selectedOption === questions[ques].correct_answer) {
      setScore(prev => prev + 10);
    }
    handleNextPress();
  };

  const handleShowResult = () => {
    navigation.navigate('Result11', { score });
  };

  const handleBackPress = () => {
    Alert.alert('Exit', 'Are you sure you want to go back?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Back', onPress: handleContinue }
    ], { cancelable: false });
    return true;
  };

  const handleContinue = async () => {
    try {
      const userName = await AsyncStorage.getItem('userName');
      const avatar = await AsyncStorage.getItem('avatar');
      const stateBoard = await AsyncStorage.getItem('stateBoard');
      const classValue = await AsyncStorage.getItem('classValue');

      if (userName && avatar && stateBoard && classValue) {
        navigation.navigate('SecondPage', { userName, avatar, stateBoard, classValue });
      } else {
        Alert.alert('Data not found', 'Please fill in all required fields in the FirstPage.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading || !loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 32, fontWeight: '700' }}>LOADING...</Text>
      </View>
    );
  }

  if (!questions.length) return null;

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.question}>Q. {decodeURIComponent(questions[ques].question)}</Text>
      </View>

      <View style={styles.options}>
        {options.map((opt, index) => (
          <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleSelectedOption(opt)}>
            <Text style={styles.option}>{decodeURIComponent(opt)}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 20 },
  top: { marginVertical: 16 },
  options: { flex: 1, marginVertical: 16 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  button: { backgroundColor: '#1A759F', padding: 12, borderRadius: 16, alignItems: 'center' },
  buttonText: { fontSize: responsiveFontSize(2.2), fontWeight: 'bold', color: '#ED4264' },
  question: { fontSize: responsiveFontSize(2.2), marginBottom: 10 },
  option: { fontSize: responsiveFontSize(1.7), fontWeight: '500', color: 'white' },
  optionButton: { backgroundColor: '#34A0A4', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 12, marginVertical: 6 },
});

export default Quiz11;
