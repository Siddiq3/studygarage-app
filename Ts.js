import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInMilliseconds } from 'date-fns';
import LegacyHubLayout from './src/features/hubs/LegacyHubLayout';

const DAY_MS = 24 * 60 * 60 * 1000;

const decodeText = (value) => {
  try {
    return decodeURIComponent(value || '');
  } catch (_error) {
    return value || '';
  }
};

const Ts = ({ navigation }) => {
  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  const getQuiz = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://siddiq3.github.io/Api/Tscard.json');
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

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    if (!buttonDisabled) return undefined;
    const intervalId = setInterval(() => {
      updateRemainingTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [buttonDisabled]);

  const saveLastButtonClickTime = async () => {
    try {
      const currentTime = new Date();
      await AsyncStorage.setItem('lastButtonClickTime10ts', currentTime.toString());
    } catch (error) {
      console.error('Error saving last button click time:', error);
    }
  };

  const checkButtonStatus = async () => {
    try {
      const lastButtonClickTime = await AsyncStorage.getItem('lastButtonClickTime10ts');
      if (lastButtonClickTime) {
        const timeDifference = differenceInMilliseconds(new Date(), new Date(lastButtonClickTime));
        if (timeDifference < DAY_MS) {
          setButtonDisabled(true);
          setRemainingTime(DAY_MS - timeDifference);
        } else {
          setButtonDisabled(false);
        }
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
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(remainingSeconds).padStart(2, '0');
  };

  const setButton = () => {
    if (!buttonDisabled) {
      handleNavigate('Question10ts');
      saveLastButtonClickTime();
      setButtonDisabled(true);
      setRemainingTime(DAY_MS);
    }
  };

  const buttons = [
    { id: 'tsimp', label: decodeText(questions?.tsimp), onPress: () => handleNavigate('tsimp') },
    { id: 'tssm', label: decodeText(questions?.tssm), onPress: () => handleNavigate('tssm') },
    { id: 'tsbp', label: decodeText(questions?.tsbp), onPress: () => handleNavigate('tsbp') },
    { id: 'tsplan', label: decodeText(questions?.tsplan), onPress: () => handleNavigate('tsplan') },
    { id: 'tsMP', label: decodeText(questions?.tsMP), onPress: () => handleNavigate('tstp') },
    { id: 'tsprev', label: decodeText(questions?.tsprev), onPress: () => handleNavigate('tsprev') },
  ];

  const remainingLabel = 'Remaining Time:' + ' ' + formatRemainingTime(remainingTime);

  return (
    <LegacyHubLayout
      title='Telangana 10th Class'
      subtitle='Blueprint, model and previous papers'
      buttons={buttons}
      isLoading={isLoading}
      onQuizPress={setButton}
      quizDisabled={buttonDisabled}
      quizTitle={decodeText(questions?.t10ts)}
      quizQuestion={decodeText(questions?.t1ts)}
      lockedMessage={"Today's Quiz Completed! Try again after 24 hours."}
      remainingTime={remainingLabel}
      showQuizLoader={isLoading}
    />
  );
};

export default Ts;
