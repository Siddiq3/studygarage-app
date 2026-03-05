import React, { useEffect, useState } from 'react';
import { differenceInMilliseconds } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LegacyHubLayout from './src/features/hubs/LegacyHubLayout';

const DAY_MS = 24 * 60 * 60 * 1000;

const decodeText = (value) => {
  try {
    return decodeURIComponent(value || '');
  } catch (_error) {
    return value || '';
  }
};

const Apinter = ({ navigation }) => {
  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const getQuiz = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://siddiq3.github.io/Api/Cardapi.json');
      const payload = await response.json();
      setQuestions(payload?.results?.[0] || {});
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();
    checkButtonStatus();
  }, []);

  useEffect(() => {
    if (!buttonDisabled) return undefined;

    const intervalId = setInterval(() => {
      updateRemainingTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [buttonDisabled]);

  const saveLastButtonClickTime = async () => {
    try {
      await AsyncStorage.setItem('lastButtonClickTime1', new Date().toString());
    } catch (error) {
      console.error('Error saving last button click time:', error);
    }
  };

  const checkButtonStatus = async () => {
    try {
      const lastButtonClickTime = await AsyncStorage.getItem('lastButtonClickTime1');
      if (!lastButtonClickTime) return;

      const elapsed = differenceInMilliseconds(new Date(), new Date(lastButtonClickTime));
      if (elapsed < DAY_MS) {
        setButtonDisabled(true);
        setRemainingTime(DAY_MS - elapsed);
      } else {
        setButtonDisabled(false);
      }
    } catch (error) {
      console.error('Error checking button status:', error);
    }
  };

  const updateRemainingTime = () => {
    setRemainingTime((prevTime) => {
      if (prevTime > 1000) {
        return prevTime - 1000;
      }
      setButtonDisabled(false);
      return 0;
    });
  };

  const formatRemainingTime = (milliseconds) => {
    const seconds = Math.ceil(milliseconds / 1000);
    return `${Math.floor(seconds / 3600)}:${Math.floor((seconds % 3600) / 60)}:${seconds % 60}`;
  };

  const setButton = () => {
    if (!buttonDisabled) {
      navigation.navigate('Question');
      saveLastButtonClickTime();
      setButtonDisabled(true);
      setRemainingTime(DAY_MS);
      checkButtonStatus();
    }
  };

  const buttons = [
    { id: 'interimp1', label: decodeText(questions?.interimp1), onPress: () => navigation.navigate('interimp1') },
    { id: 'interprev1', label: decodeText(questions?.interprev1), onPress: () => navigation.navigate('interprev1') },
    { id: 'year1m', label: decodeText(questions?.year1m), onPress: () => navigation.navigate('year1m') },
    { id: 'interimp2', label: decodeText(questions?.interimp2), onPress: () => navigation.navigate('interimp2') },
    { id: 'interprev2', label: decodeText(questions?.interprev2), onPress: () => navigation.navigate('interprev2') },
    { id: 'year2m', label: decodeText(questions?.year2m), onPress: () => navigation.navigate('year2m') },
  ];

  const remainingLabel = 'Or Try After 24 hours Remaining Time:' + ' ' + formatRemainingTime(remainingTime);

  return (
    <LegacyHubLayout
      title="AP Inter"
      subtitle="Select year-wise resources and practice daily quiz"
      buttons={buttons}
      isLoading={isLoading}
      onQuizPress={setButton}
      quizDisabled={buttonDisabled}
      quizTitle={decodeText(questions?.t11)}
      quizQuestion={decodeText(questions?.q11)}
      lockedMessage={'Today\'s Quiz Completed! To Earn More, Click on the "Earn With Quiz" Button.'}
      remainingTime={remainingLabel}
      showQuizLoader={isLoading}
    />
  );
};

export default Apinter;
