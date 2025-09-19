import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Alert, StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions'; // or your own function
import MrecAdComponent from "../MrecAdComponent";


const Quiz12 = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuiz();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert('Exit', 'Are you sure you want to go back?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Back', onPress: () => navigation.goBack() }
      ]);
      return true;
    });

    return () => backHandler.remove();
  }, []);

  const fetchQuiz = async () => {
    try {
      const res = await fetch('https://siddiq3.github.io/Api/Quizapi12.json');
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
    return shuffleArray([..._question.incorrect_answers, _question.correct_answer]);
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
    navigation.navigate('Result12', { score });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 32, fontWeight: '700' }}>LOADING...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.question}>Q. {decodeURIComponent(questions[ques].question)}</Text>
      </View>

      <View style={styles.options}>
        {options.map((opt, index) => (
          <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleSelectedOption(opt)}>
            <Text style={styles.option}>{decodeURIComponent(opt)}</Text>
            <MrecAdComponent/>
          </TouchableOpacity>
        ))}
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
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  top: { marginVertical: 16 },
  options: { flex: 1, marginVertical: 16 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  button: { backgroundColor: '#1A759F', padding: 12, borderRadius: 16, alignItems: 'center' },
  buttonText: { fontSize: responsiveFontSize(2.2), fontWeight: 'bold', color: '#ED4264' },
  question: { fontSize: responsiveFontSize(2.2), marginBottom: 10 },
  option: { fontSize: responsiveFontSize(1.7), fontWeight: '500', color: 'white' },
  optionButton: { backgroundColor: '#34A0A4', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 12, marginVertical: 6 },
});

export default Quiz12;
