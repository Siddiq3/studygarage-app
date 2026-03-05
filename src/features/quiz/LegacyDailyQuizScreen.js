import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useQuizContext } from '../../../QuizContext';
import MrecAdComponent from '../../../MrecAdComponent';
import ScreenLayoutContainer from '../../design-system/components/ScreenLayoutContainer';
import SGCard from '../../design-system/components/SGCard';
import SGButton from '../../design-system/components/SGButton';
import AnimatedActionCard from '../../design-system/components/AnimatedActionCard';
import SparkleBurst from '../../components/animations/SparkleBurst';
import { toLocalDateKey } from '../../utils/dateKey';

const decodeText = (value) => {
  try {
    return decodeURIComponent(value || '');
  } catch (_error) {
    return value || '';
  }
};

const shuffleOptions = (values = []) => {
  const shuffled = [...values];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const hashString = (value = '') => {
  let hash = 0;
  const safe = String(value);
  for (let i = 0; i < safe.length; i += 1) {
    hash = (hash << 5) - hash + safe.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export default function LegacyDailyQuizScreen({
  navigation,
  quizUrl,
  resultRoute,
  scorePerCorrect = 1,
  showTimer = false,
  timerSeconds = 15,
  includeStatsInResult = false,
  includeTotalScoreInResult = false,
  updateGlobalScore = false,
  backBehavior = 'secondPage',
  screenTitle = 'Daily Quiz',
  screenSubtitle = 'Pick the best answer to continue your streak',
  showResultsButtonOnLast = !showTimer,
}) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [errorText, setErrorText] = useState('');
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [feedbackIndex, setFeedbackIndex] = useState(-1);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [selectionLocked, setSelectionLocked] = useState(false);

  const scoreRef = useRef(0);
  const correctRef = useRef(0);
  const incorrectRef = useRef(0);
  const finishedRef = useRef(false);
  const feedbackTimerRef = useRef(null);
  const scoreEventKeyRef = useRef(
    `quiz:legacy:${hashString(quizUrl || resultRoute || screenTitle)}:${toLocalDateKey()}`
  );

  const shakeX = useSharedValue(0);

  const { totalScore, updateTotalScore } = useQuizContext();

  const optionsShakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const navigateToSecondPage = useCallback(async () => {
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
  }, [navigation]);

  const handleBackPress = useCallback(() => {
    if (backBehavior === 'goBack') {
      navigation.goBack();
      return true;
    }

    if (backBehavior === 'confirmGoBack') {
      Alert.alert(
        'Exit',
        'Are you sure you want to go back?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Back', onPress: () => navigation.goBack() },
        ],
        { cancelable: false }
      );
      return true;
    }

    if (backBehavior === 'confirmSecondPage') {
      Alert.alert(
        'Exit',
        'Are you sure you want to go back?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Back', onPress: navigateToSecondPage },
        ],
        { cancelable: false }
      );
      return true;
    }

    navigateToSecondPage();
    return true;
  }, [backBehavior, navigateToSecondPage, navigation]);

  const handleShowResult = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const finalScore = scoreRef.current;

    if (updateGlobalScore) {
      updateTotalScore(finalScore, {
        eventId: scoreEventKeyRef.current,
        source: 'quiz_correct',
        meta: {
          quizUrl: quizUrl || '',
          resultRoute: resultRoute || '',
          screenTitle: screenTitle || '',
        },
      });
    }

    const resultParams = { score: finalScore };

    if (includeStatsInResult) {
      resultParams.totalQuestions = questions.length;
      resultParams.correctQuestions = correctRef.current;
      resultParams.incorrectQuestions = incorrectRef.current;
    }

    if (includeTotalScoreInResult) {
      resultParams.totalScore = totalScore;
    }

    navigation.navigate(resultRoute, resultParams);
  }, [
    includeStatsInResult,
    includeTotalScoreInResult,
    navigation,
    questions.length,
    resultRoute,
    totalScore,
    updateGlobalScore,
    updateTotalScore,
  ]);

  const handleNextPress = useCallback(() => {
    if (finishedRef.current || selectionLocked) return;

    setCurrentIndex((prev) => {
      if (prev < questions.length - 1) {
        return prev + 1;
      }

      handleShowResult();
      return prev;
    });
  }, [handleShowResult, questions.length, selectionLocked]);

  const handleSelectOption = useCallback(
    (selectedOption, optionIndex) => {
      if (finishedRef.current || !questions[currentIndex] || selectionLocked) return;

      const isCorrect = selectedOption === questions[currentIndex].correct_answer;
      setSelectionLocked(true);
      setFeedbackIndex(optionIndex);
      setFeedbackCorrect(isCorrect);

      if (isCorrect) {
        const nextScore = scoreRef.current + scorePerCorrect;
        const nextCorrect = correctRef.current + 1;
        scoreRef.current = nextScore;
        correctRef.current = nextCorrect;
        setScore(nextScore);
        setCorrectCount(nextCorrect);
      } else {
        const nextIncorrect = incorrectRef.current + 1;
        incorrectRef.current = nextIncorrect;
        setIncorrectCount(nextIncorrect);

        shakeX.value = withSequence(
          withTiming(-9, { duration: 40 }),
          withTiming(9, { duration: 55 }),
          withTiming(-7, { duration: 45 }),
          withTiming(6, { duration: 40 }),
          withTiming(0, { duration: 35 })
        );
      }

      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }

      feedbackTimerRef.current = setTimeout(() => {
        setFeedbackIndex(-1);
        setFeedbackCorrect(false);
        setSelectionLocked(false);

        setCurrentIndex((prev) => {
          if (prev < questions.length - 1) {
            return prev + 1;
          }
          handleShowResult();
          return prev;
        });
      }, 280);
    },
    [currentIndex, handleShowResult, questions, scorePerCorrect, selectionLocked, shakeX]
  );

  useEffect(() => {
    let mounted = true;

    const fetchQuiz = async () => {
      setIsLoading(true);
      setErrorText('');
      try {
        const res = await fetch(quizUrl);
        const data = await res.json();
        const items = Array.isArray(data?.results) ? data.results : [];

        if (!mounted) return;

        setQuestions(items);
        setCurrentIndex(0);
        if (items.length > 0) {
          setOptions(shuffleOptions([...(items[0].incorrect_answers || []), items[0].correct_answer]));
        } else {
          setOptions([]);
          setErrorText('No questions available.');
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
        if (mounted) {
          setQuestions([]);
          setOptions([]);
          setErrorText('Failed to load quiz.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchQuiz();

    return () => {
      mounted = false;
    };
  }, [quizUrl]);

  useEffect(() => {
    scoreRef.current = 0;
    correctRef.current = 0;
    incorrectRef.current = 0;
    finishedRef.current = false;
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setFeedbackIndex(-1);
    setFeedbackCorrect(false);
    setSelectionLocked(false);
  }, [quizUrl]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => subscription.remove();
  }, [handleBackPress]);

  useEffect(() => {
    if (!questions[currentIndex]) return;
    setOptions(shuffleOptions([...(questions[currentIndex].incorrect_answers || []), questions[currentIndex].correct_answer]));
    if (showTimer) {
      setTimeLeft(timerSeconds);
    }
    setFeedbackIndex(-1);
    setFeedbackCorrect(false);
  }, [currentIndex, questions, showTimer, timerSeconds]);

  useEffect(() => {
    if (!showTimer || isLoading || questions.length === 0 || finishedRef.current) {
      return undefined;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (!selectionLocked) {
            handleNextPress();
          }
          return timerSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, handleNextPress, isLoading, questions.length, selectionLocked, showTimer, timerSeconds]);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  const totalQuestions = questions.length;
  const progressLabel = totalQuestions > 0 ? `${Math.min(currentIndex + 1, totalQuestions)}/${totalQuestions}` : '0/0';
  const isLastQuestion = totalQuestions > 0 && currentIndex >= totalQuestions - 1;
  const showSkip = totalQuestions > 0 && (!isLastQuestion || !showResultsButtonOnLast);

  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4" scroll={false}>
      <Animated.View entering={FadeInUp.duration(240)}>
        <SGCard className="mb-3">
          <Text className="text-[11px] font-bold uppercase tracking-[1.2px] text-sg-muted">Daily Challenge</Text>
          <Text className="mt-1 text-[26px] font-black leading-[30px] tracking-tight text-sg-text">{screenTitle}</Text>
          <Text className="mt-1 text-[12px] font-semibold uppercase tracking-[0.8px] text-sg-muted">{screenSubtitle}</Text>

          <View className="mt-4 flex-row items-center justify-between">
            <View className="rounded-full border border-sg-border bg-sg-surface px-3 py-1.5">
              <Text className="text-[12px] font-black text-sg-text">{progressLabel}</Text>
            </View>

            {showTimer ? (
              <View className="flex-row items-center rounded-full border border-sg-border bg-sg-surface px-3 py-1.5">
                <Icon name="clock-o" size={13} color={timeLeft <= 5 ? '#FF3B30' : '#7B859D'} />
                <Text className={`ml-2 text-[12px] font-black ${timeLeft <= 5 ? 'text-[#FF3B30]' : 'text-sg-text'}`}>{timeLeft}s</Text>
              </View>
            ) : null}
          </View>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(70).duration(240)} className="flex-1">
        <SGCard className="mb-3 flex-1">
          {isLoading ? (
            <View className="flex-1 items-center justify-center py-10">
              <Text className="text-[16px] font-bold text-sg-muted">LOADING...</Text>
            </View>
          ) : null}

          {!isLoading && errorText ? (
            <View className="flex-1 items-center justify-center py-10">
              <Text className="text-center text-[15px] font-semibold text-sg-muted">{errorText}</Text>
            </View>
          ) : null}

          {!isLoading && !errorText && questions[currentIndex] ? (
            <View className="flex-1">
              <Text className="mb-4 text-[18px] font-black leading-[26px] tracking-tight text-sg-text">
                Q. {decodeText(questions[currentIndex].question)}
              </Text>

              <Animated.View style={optionsShakeStyle} className="flex-1">
                {options.map((option, index) => {
                  const isSelected = feedbackIndex === index;
                  const toneClass =
                    isSelected && feedbackCorrect
                      ? 'border-[#00FFA3]/85 bg-[#0F3329]/78'
                      : isSelected && !feedbackCorrect
                      ? 'border-[#FF3B30]/85 bg-[#3A1618]/78'
                      : 'border-sg-border bg-sg-surface/90';

                  return (
                    <AnimatedActionCard
                      key={`${option}-${index}`}
                      className="mb-3"
                      selected={isSelected && feedbackCorrect}
                      onPress={() => handleSelectOption(option, index)}
                      disabled={selectionLocked}
                    >
                      <View className={`overflow-hidden rounded-[18px] border px-4 py-4 ${toneClass}`}>
                        {isSelected && feedbackCorrect ? <SparkleBurst enabled count={10} /> : null}
                        <Text className="text-[15px] font-semibold leading-[21px] text-sg-text">{decodeText(option)}</Text>
                      </View>
                    </AnimatedActionCard>
                  );
                })}
              </Animated.View>
            </View>
          ) : null}
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(130).duration(240)}>
        <SGCard className="mb-3">
          <View className="flex-row items-center justify-between gap-3">
            <View className="flex-1 rounded-[14px] border border-sg-border bg-sg-surface px-3 py-2">
              <Text className="text-[12px] font-semibold text-sg-muted">
                Score: {score} | Correct: {correctCount} | Incorrect: {incorrectCount}
              </Text>
            </View>
            {showSkip ? <SGButton label="SKIP" variant="ghost" onPress={handleNextPress} className="min-w-[96px]" /> : null}
            {!showSkip && showResultsButtonOnLast ? (
              <SGButton label="SHOW RESULTS" onPress={handleShowResult} className="min-w-[146px]" />
            ) : null}
          </View>
        </SGCard>
      </Animated.View>

      <View className="mb-3">
        <MrecAdComponent />
      </View>
    </ScreenLayoutContainer>
  );
}
