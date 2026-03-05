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

const Class7ka = ({ navigation }) => {
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
      const response = await fetch('https://siddiq3.github.io/Api/Cardapika.json');
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
      await AsyncStorage.setItem('lastButtonClickTime7ka', currentTime.toString());
    } catch (error) {
      console.error('Error saving last button click time:', error);
    }
  };

  const checkButtonStatus = async () => {
    try {
      const lastButtonClickTime = await AsyncStorage.getItem('lastButtonClickTime7ka');
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
      handleNavigate('Question7ka');
      saveLastButtonClickTime();
      setButtonDisabled(true);
      setRemainingTime(DAY_MS);
      checkButtonStatus();
    }
  };

  const buttons = [
    { id: 'tb7ka', label: decodeText(questions?.tb7ka), onPress: () => handleNavigate('7thclass tbka') },
    { id: 'imp7ka', label: decodeText(questions?.imp7ka), onPress: () => handleNavigate('7thclass impka') },
    { id: 'fa17ka', label: decodeText(questions?.fa17ka), onPress: () => handleNavigate('7thclass fa1ka') },
    { id: 'fa27ka', label: decodeText(questions?.fa27ka), onPress: () => handleNavigate('7thclass fa2ka') },
    { id: 'sa17ka', label: decodeText(questions?.sa17ka), onPress: () => handleNavigate('7thclass sa1ka') },
    { id: 'fa37ka', label: decodeText(questions?.fa37ka), onPress: () => handleNavigate('7thclass fa3ka') },
    { id: 'fa47ka', label: decodeText(questions?.fa47ka), onPress: () => handleNavigate('7thclass fa4ka') },
    { id: 'sa27ka', label: decodeText(questions?.sa27ka), onPress: () => handleNavigate('7thclass sa2ka') },
  ];

  const remainingLabel = 'Or Try After 24 hours Remaining Time:' + ' ' + formatRemainingTime(remainingTime);

  return (
    <LegacyHubLayout
      title='Karnataka 7th Class'
      subtitle='Textbook, FA, SA and quick quiz'
      buttons={buttons}
      isLoading={isLoading}
      onQuizPress={setButton}
      quizDisabled={buttonDisabled}
      quizTitle={decodeText(questions?.t7ka)}
      quizQuestion={decodeText(questions?.q7ka)}
      lockedMessage={"Today's Quiz Completed! To Earn More, Click on the \"Earn With Quiz\" Button."}
      remainingTime={remainingLabel}
      showQuizLoader={isLoading}
    />
  );
};

export default Class7ka;
