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

const Sscka = ({ navigation }) => {
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
      await AsyncStorage.setItem('lastButtonClickTime10ka', currentTime.toString());
    } catch (error) {
      console.error('Error saving last button click time:', error);
    }
  };

  const checkButtonStatus = async () => {
    try {
      const lastButtonClickTime = await AsyncStorage.getItem('lastButtonClickTime10ka');
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
    return String(Math.floor(seconds / 3600)) + ':' + String(Math.floor((seconds % 3600) / 60)) + ':' + String(seconds % 60);
  };

  const setButton = () => {
    if (!buttonDisabled) {
      handleNavigate('Question10ka');
      saveLastButtonClickTime();
      setButtonDisabled(true);
      setRemainingTime(DAY_MS);
      checkButtonStatus();
    }
  };

  const buttons = [
    { id: 'impqka', label: decodeText(questions?.impqka), onPress: () => handleNavigate('Importentka') },
    { id: 'ssc2023paperska', label: decodeText(questions?.ssc2023paperska), onPress: () => handleNavigate('ssc2023ka') },
    { id: 'prevpaperska', label: decodeText(questions?.prevpaperska), onPress: () => handleNavigate('Prev Paperska') },
    { id: 'modelpaperska', label: decodeText(questions?.modelpaperska), onPress: () => handleNavigate('modelpaperska') },
    { id: 'solutionka', label: decodeText(questions?.solutionka), onPress: () => handleNavigate('solutionka') },
    { id: 'prefinalka', label: decodeText(questions?.prefinalka), onPress: () => handleNavigate('prefinalka') },
    { id: 'kablueka', label: decodeText(questions?.kablueka), onPress: () => handleNavigate('kablueprint1') },
    { id: 'fa1ka', label: decodeText(questions?.fa1ka), onPress: () => handleNavigate('FA1ka') },
    { id: 'fa2ka', label: decodeText(questions?.fa2ka), onPress: () => handleNavigate('FA2ka') },
    { id: 'sa1ka', label: decodeText(questions?.sa1ka), onPress: () => handleNavigate('SA1ka') },
    { id: 'fa3ka', label: decodeText(questions?.fa3ka), onPress: () => handleNavigate('FA3ka') },
    { id: 'fa4ka', label: decodeText(questions?.fa4ka), onPress: () => handleNavigate('FA4ka') },
    { id: 'textbookka', label: decodeText(questions?.textbookka), onPress: () => handleNavigate('textbookska') },
  ];

  const remainingLabel = 'Or Try After 24 hours Remaining Time:' + ' ' + formatRemainingTime(remainingTime);

  return (
    <LegacyHubLayout
      title='Karnataka 10th Class'
      subtitle='Papers, solutions and daily challenge'
      buttons={buttons}
      isLoading={isLoading}
      onQuizPress={setButton}
      quizDisabled={buttonDisabled}
      quizTitle={decodeText(questions?.t10ka)}
      quizQuestion={decodeText(questions?.t1oka)}
      lockedMessage={"Today's Quiz Completed! To Earn More, Click on the \"Earn With Quiz\" Button."}
      remainingTime={remainingLabel}
      showQuizLoader={isLoading}
    />
  );
};

export default Sscka;
