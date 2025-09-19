import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  BackHandler,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import MrecAdComponent from "../MrecAdComponent";


const Quiz6 = ({ navigation }) => {
  const [loaded, setLoaded] = useState(false);
  const [questions, setQuestions] = useState();
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    getQuiz();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
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

  const getQuiz = async () => {
    setIsLoading(true);
    try {
      const url = 'https://siddiq3.github.io/Api/Quizapi6.json';
      const res = await fetch(url);
      const data = await res.json();
      setQuestions(data.results);
      setOptions(generateOptionsAndShuffle(data.results[0]));
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateOptionsAndShuffle = (_question) => {
    const opts = [..._question.incorrect_answers];
    opts.push(_question.correct_answer);
    shuffleArray(opts);
    return opts;
  };

  const handleNextPress = () => {
    setQues(ques + 1);
    setOptions(generateOptionsAndShuffle(questions[ques + 1]));
  };

  const handlSelectedOption = (_option) => {
    if (_option === questions[ques].correct_answer) {
      setScore(score + 10);
    }
    if (ques < 5) {
      setQues(ques + 1);
      setOptions(generateOptionsAndShuffle(questions[ques + 1]));
    } else if (ques === 5) {
      handleShowResult();
    }
  };

  const handleShowResult = () => {
    navigation.navigate('Result6', { score });
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
          avatar: storedAvatar,
          stateBoard: storedStateBoard,
          classValue: storedClassValue,
        });
      } else {
        Alert.alert('Data not found', 'Please fill in all required fields in the FirstPage.');
      }
    } catch (error) {
      console.error('Error checking stored data:', error);
    }
  };

  const handleBackPress = () => {
    Alert.alert(
      'Exit',
      'Are you sure you want to go back?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Back', onPress: handleContinue },
      ],
      { cancelable: false }
    );
    return true;
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 32, fontWeight: '700' }}>LOADING...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {questions && (
        <View style={styles.parent}>
          <View style={styles.top}>
            <Text style={styles.question}>
              Q. {decodeURIComponent(questions[ques].question)}
            </Text>
          </View>

          <View style={styles.options}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButtom}
                onPress={() => handlSelectedOption(option)}
              >
                <Text style={styles.option}>{decodeURIComponent(option)}</Text>
              </TouchableOpacity>
            ))}
            <MrecAdComponent/>

          </View>
          <View style={styles.bottom}>
            {ques < 5 && (
              <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                <Text style={styles.buttonText}>SKIP</Text>
              </TouchableOpacity>
            )}

            {ques === 5 && (
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
    fontSize: responsiveFontSize(2.1),
  },
  option: {
    fontSize: responsiveFontSize(1.7),
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

export default Quiz6;
