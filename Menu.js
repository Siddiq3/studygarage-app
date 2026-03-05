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

const Menu = ({ navigation }) => {
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
      await AsyncStorage.setItem('lastButtonClickTime1', currentTime.toString());
    } catch (error) {
      console.error('Error saving last button click time:', error);
    }
  };

  const checkButtonStatus = async () => {
    try {
      const lastButtonClickTime = await AsyncStorage.getItem('lastButtonClickTime1');
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
      handleNavigate('Question');
      saveLastButtonClickTime();
      setButtonDisabled(true);
      setRemainingTime(DAY_MS);
      checkButtonStatus();
    }
  };

  const buttons = [
    { id: 'impq', label: decodeText(questions?.impq), onPress: () => handleNavigate('Importent') },
    { id: 'ssc2023papers', label: decodeText(questions?.ssc2023papers), onPress: () => handleNavigate('ssc2023') },
    { id: 'prevpapers', label: decodeText(questions?.prevpapers), onPress: () => handleNavigate('Prev Papers') },
    { id: 'modelpapers', label: decodeText(questions?.modelpapers), onPress: () => handleNavigate('modelpapers') },
    { id: 'ssc', label: decodeText(questions?.ssc), onPress: () => handleNavigate('map') },
    { id: 'apblue', label: decodeText(questions?.apblue), onPress: () => handleNavigate('apblueprint1') },
    { id: 'dailytest', label: decodeText(questions?.dailytest), onPress: () => handleNavigate('dailytest') },
    { id: 'weeklytest', label: decodeText(questions?.weeklytest), onPress: () => handleNavigate('weeklytest1') },
    { id: 'grandtest', label: decodeText(questions?.grandtest), onPress: () => handleNavigate('grandtest') },
    { id: 'mini', label: decodeText(questions?.mini), onPress: () => handleNavigate('mini1') },
    { id: 'fa1', label: decodeText(questions?.fa1), onPress: () => handleNavigate('FA11') },
    { id: 'fa2', label: decodeText(questions?.fa2), onPress: () => handleNavigate('FA21') },
    { id: 'sa1', label: decodeText(questions?.sa1), onPress: () => handleNavigate('SA11') },
    { id: 'fa3', label: decodeText(questions?.fa3), onPress: () => handleNavigate('FA31') },
    { id: 'fa4', label: decodeText(questions?.fa4), onPress: () => handleNavigate('FA41') },
    { id: 'revision', label: decodeText(questions?.revision), onPress: () => handleNavigate('rivision') },
    { id: 'prefinal', label: decodeText(questions?.prefinal), onPress: () => handleNavigate('prefinal1') },
    { id: 'textbook', label: decodeText(questions?.textbook), onPress: () => handleNavigate('Textbook') },
    { id: 'quiztest', label: decodeText(questions?.quiztest), onPress: () => handleNavigate('polypre') },
    { id: 'videos10th', label: decodeText(questions?.videos10th), onPress: () => handleNavigate('Videos') },
    { id: 'polycet', label: decodeText(questions?.polycet), onPress: () => handleNavigate('polycet1') },
  ];

  const remainingLabel = 'Or Try After 24 hours Remaining Time:' + ' ' + formatRemainingTime(remainingTime);

  return (
    <LegacyHubLayout
      title='AP 10th Class'
      subtitle='Practice by module with daily challenge'
      buttons={buttons}
      isLoading={isLoading}
      onQuizPress={setButton}
      quizDisabled={buttonDisabled}
      quizTitle={decodeText(questions?.t10)}
      quizQuestion={decodeText(questions?.t1)}
      lockedMessage={"Today's Quiz Completed! To Earn More, Click on the \"Earn With Quiz\" Button."}
      remainingTime={remainingLabel}
      showQuizLoader={isLoading}
    />
  );
};

export default Menu;
