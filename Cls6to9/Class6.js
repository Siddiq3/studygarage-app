import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInMilliseconds } from 'date-fns';
import useInterstitialAd from '../InterstitialAdComponent';
import LegacyHubLayout from '../src/features/hubs/LegacyHubLayout';

const DAY_MS = 24 * 60 * 60 * 1000;

const decodeText = (value) => {
  try {
    return decodeURIComponent(value || '');
  } catch (_error) {
    return value || '';
  }
};

const Class6 = ({ navigation }) => {
  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const { showAd } = useInterstitialAd();
  const handleNavigate = (screen) => {
    showAd();
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
      await AsyncStorage.setItem('lastButtonClickTime6', currentTime.toString());
    } catch (error) {
      console.error('Error saving last button click time:', error);
    }
  };

  const checkButtonStatus = async () => {
    try {
      const lastButtonClickTime = await AsyncStorage.getItem('lastButtonClickTime6');
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
      handleNavigate('Question6');
      saveLastButtonClickTime();
      setButtonDisabled(true);
      setRemainingTime(DAY_MS);
      checkButtonStatus();
    }
  };

  const buttons = [
    { id: 'tb6', label: decodeText(questions?.tb6), onPress: () => handleNavigate('6thclass tb') },
    { id: 'imp6', label: decodeText(questions?.imp6), onPress: () => handleNavigate('6thclass imp') },
    { id: 'fa16', label: decodeText(questions?.fa16), onPress: () => handleNavigate('6thclass fa1') },
    { id: 'fa26', label: decodeText(questions?.fa26), onPress: () => handleNavigate('6thclass fa2') },
    { id: 'sa16', label: decodeText(questions?.sa16), onPress: () => handleNavigate('6thclass sa1') },
    { id: 'fa36', label: decodeText(questions?.fa36), onPress: () => handleNavigate('6thclass fa3') },
    { id: 'fa47', label: decodeText(questions?.fa47), onPress: () => handleNavigate('7thclass fa4') },
    { id: 'sa27', label: decodeText(questions?.sa27), onPress: () => handleNavigate('7thclass sa2') },
  ];

  const remainingLabel = 'Or Try After 24 hours Remaining Time:' + ' ' + formatRemainingTime(remainingTime);

  return (
    <LegacyHubLayout
      title='AP 6th Class'
      subtitle='Textbook, FA, SA and quick quiz'
      buttons={buttons}
      isLoading={isLoading}
      onQuizPress={setButton}
      quizDisabled={buttonDisabled}
      quizTitle={decodeText(questions?.t7)}
      quizQuestion={decodeText(questions?.q7)}
      lockedMessage={"Today's Quiz Completed! To Earn More, Click on the \"Earn With Quiz\" Button."}
      remainingTime={remainingLabel}
      showQuizLoader={isLoading}
    />
  );
};

export default Class6;
