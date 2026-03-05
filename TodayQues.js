import React, { useState, useEffect } from 'react';
import { Alert, BackHandler, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useQuizContext } from './QuizContext';
import PremiumQuizTopBar from './src/components/quiz/PremiumQuizTopBar';
import PremiumAnswerCard from './src/components/quiz/PremiumAnswerCard';
import QuizLoadingSkeleton from './src/components/quiz/QuizLoadingSkeleton';
import SGEmptyState from './src/design-system/components/SGEmptyState';
import { toLocalDateKey } from './src/utils/dateKey';

const TodayQues = ({ navigation }) => {
  const [totalQuestions, setTotalQuestions] = useState();
  const [questions, setQuestions] = useState();
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState(0);
  const [score, setscore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const { totalScore, updateTotalScore } = useQuizContext();

  useEffect(() => {
    getQuiz();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));

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

  useEffect(() => {
    if (ques < totalQuestions) {
      setOptions(
        generateOptionsAndShuffle(
          questions[ques].incorrect_answers.concat(questions[ques].correct_answer)
        )
      );
      setTimeLeft(20);
    }
  }, [ques, totalQuestions]);

  useEffect(() => {
    setSelectedOption(null);
  }, [ques]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const generateOptionsAndShuffle = (_question) => {
    const nextOptions = [..._question];
    shuffleArray(nextOptions);
    return nextOptions;
  };

  const handleNextPress = () => {
    if (ques < totalQuestions - 1) {
      setQues((prevQues) => prevQues + 1);
      setOptions(
        generateOptionsAndShuffle(
          questions[ques + 1].incorrect_answers.concat(questions[ques + 1].correct_answer)
        )
      );
      setTimeLeft(20);
    }

    if (ques === totalQuestions - 1) {
      handleShowResult();
    }
  };

  const handlSelectedOption = (_option) => {
    if (selectedOption) return;
    setSelectedOption(_option);
    const isCorrectAnswer = _option === questions[ques].correct_answer;
    const nextScore = isCorrectAnswer ? score + 1 : score;

    const optionsToShuffle = isCorrectAnswer
      ? questions[ques].incorrect_answers.concat(questions[ques].correct_answer)
      : questions[ques].incorrect_answers;

    if (isCorrectAnswer) {
      setscore((prevScore) => prevScore + 1);
      setCorrectQuestions((prevCorrect) => prevCorrect + 1);
    } else {
      setIncorrectQuestions((prevIncorrect) => prevIncorrect + 1);
    }

    setTimeout(() => {
      if (ques < totalQuestions - 1) {
        setQues((prevQues) => prevQues + 1);
        setOptions(generateOptionsAndShuffle(optionsToShuffle));
        setTimeLeft(15);
      }

      if (ques === totalQuestions - 1) {
        handleShowResult(nextScore);
        updateTotalScore(nextScore, {
          eventId: `quiz:daily:${toLocalDateKey()}`,
          source: 'quiz_correct',
          meta: { quiz: 'TodayQues' },
        });
      }
    }, 170);
  };

  const handleShowResult = (finalScore = score) => {
    navigation.navigate('Daily Result', {
      score: finalScore,
      totalQuestions,
      correctQuestions,
      incorrectQuestions,
      totalScore,
    });
  };

  const getQuiz = async () => {
    setIsLoading(true);
    const url = 'https://siddiq3.github.io/Api/Quizapi.json';

    try {
      const res = await fetch(url);
      const data = await res.json();

      setQuestions(data.results);
      setTotalQuestions(data.results.length);
      setOptions(generateOptionsAndShuffle(data.results[0].incorrect_answers.concat(data.results[0].correct_answer)));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

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

  const resolveOptionState = (option) => {
    if (!selectedOption || !questions?.[ques]) return 'default';
    const correctAnswer = questions[ques].correct_answer;
    if (option === selectedOption) {
      return option === correctAnswer ? 'correct' : 'incorrect';
    }
    if (selectedOption !== correctAnswer && option === correctAnswer) {
      return 'correct';
    }
    return 'disabled';
  };

  const decodedQuestion = questions?.[ques]?.question ? decodeURIComponent(questions[ques].question) : '';

  return (
    <View className="flex-1 bg-[#0B0C10] px-4 pb-5 pt-4">
      <PremiumQuizTopBar
        currentIndex={ques + 1}
        totalQuestions={totalQuestions || 1}
        timeLeft={timeLeft}
        onBackPress={handleBackPress}
      />

      {isLoading ? (
        <QuizLoadingSkeleton />
      ) : (
        questions && questions.length > 0 && ques < totalQuestions ? (
          <Animated.View entering={FadeInDown.duration(220)} className="flex-1">
            <View className="mb-4 rounded-[22px] border border-white/10 bg-white/6 px-4 py-4">
              <Text className="text-center text-[12px] font-bold uppercase tracking-[1.1px] text-white/65">Daily Question</Text>
              <Text className="mt-2 text-center text-[22px] font-black leading-[30px] text-white">{decodedQuestion}</Text>
            </View>

            <View className="flex-1">
              {options.map((option, index) => (
                <PremiumAnswerCard
                  key={`${option}-${index}`}
                  label={decodeURIComponent(option)}
                  onPress={() => handlSelectedOption(option)}
                  disabled={Boolean(selectedOption)}
                  state={resolveOptionState(option)}
                />
              ))}
            </View>

            {ques !== totalQuestions - 1 ? (
              <TouchableOpacity
                onPress={handleNextPress}
                className="mt-1 self-end rounded-full border border-white/15 bg-white/7 px-4 py-2"
              >
                <Text className="text-[12px] font-bold uppercase tracking-[0.9px] text-white/90">Skip</Text>
              </TouchableOpacity>
            ) : null}
          </Animated.View>
        ) : (
          <View className="flex-1 justify-center">
            <SGEmptyState
              title="Daily quiz is not available"
              subtitle="Come back in a while, we refresh daily questions regularly."
              actionLabel="Go Home"
              onActionPress={handleContinue}
              badgeLabel="DAILY QUIZ"
            />
          </View>
        )
      )}
    </View>
  );
};

export default TodayQues;
