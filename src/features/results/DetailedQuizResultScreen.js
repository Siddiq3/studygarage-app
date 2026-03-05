import React, { useCallback, useEffect } from 'react';
import { Alert, BackHandler, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInDown } from 'react-native-reanimated';
import useInterstitialAd from '../../../InterstitialAdComponent';
import MrecAdComponent from '../../../MrecAdComponent';
import ScreenLayoutContainer from '../../design-system/components/ScreenLayoutContainer';
import SGCard from '../../design-system/components/SGCard';
import SGButton from '../../design-system/components/SGButton';

export default function DetailedQuizResultScreen({
  route,
  navigation,
  title = 'Quiz Results',
  retryTarget,
  retryLabel = 'Play More And Earn More',
  showRetry = true,
  showScoreButton = true,
  scoreBoardRoute = 'TotalScorePage',
  backBehavior = 'goBack',
  adOnScore = true,
}) {
  const params = route?.params || {};
  const totalQuestions = Number(params.totalQuestions || 0);
  const correctQuestions = Number(params.correctQuestions || 0);
  const incorrectQuestions = Number(params.incorrectQuestions || 0);
  const score = Number(params.score || 0);
  const { showAd } = useInterstitialAd();

  const handleHome = useCallback(async () => {
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

  const handleRetry = useCallback(async () => {
    if (!retryTarget) return;

    try {
      const storedStateBoard = await AsyncStorage.getItem('stateBoard');
      const storedClassValue = await AsyncStorage.getItem('classValue');

      if (storedStateBoard && storedClassValue) {
        navigation.navigate(retryTarget, {
          stateBoard: storedStateBoard,
          classValue: storedClassValue,
        });
      } else {
        Alert.alert('Data not found', 'Please fill in all required fields in the FirstPage.');
      }
    } catch (error) {
      console.error('Error checking stored data:', error);
    }
  }, [navigation, retryTarget]);

  const handleScore = useCallback(() => {
    if (adOnScore) {
      showAd();
    }
    navigation.navigate(scoreBoardRoute);
  }, [adOnScore, navigation, scoreBoardRoute, showAd]);

  const handleBackPress = useCallback(() => {
    if (backBehavior === 'confirmHome') {
      Alert.alert(
        'Exit',
        'Are you sure you want to exit?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Exit', onPress: handleHome },
        ],
        { cancelable: false }
      );
      return true;
    }

    navigation.goBack();
    return true;
  }, [backBehavior, handleHome, navigation]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => subscription.remove();
  }, [handleBackPress]);

  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4 pb-6" scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <SGCard className="mb-4">
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">Performance</Text>
          <Text className="mt-1 text-[28px] font-extrabold leading-[32px] text-sg-text dark:text-sgd-text">{title}</Text>

          <View className="mt-4 rounded-[18px] border border-sg-border bg-sg-surface/88 p-4 dark:border-sgd-border dark:bg-sgd-surface/88">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-[14px] font-semibold text-sg-muted dark:text-sgd-muted">Total Questions</Text>
              <Text className="text-[15px] font-extrabold text-sg-text dark:text-sgd-text">{totalQuestions}</Text>
            </View>
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-[14px] font-semibold text-[#00D48A]">Correct Questions</Text>
              <Text className="text-[15px] font-extrabold text-[#00D48A]">{correctQuestions}</Text>
            </View>
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-[14px] font-semibold text-[#FF654F]">Incorrect Questions</Text>
              <Text className="text-[15px] font-extrabold text-[#FF654F]">{incorrectQuestions}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-[14px] font-semibold text-sg-text dark:text-sgd-text">Score</Text>
              <Text className="text-[18px] font-black text-sg-text dark:text-sgd-text">{score}</Text>
            </View>
          </View>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(70).duration(220)}>
        <SGCard className="mb-4 gap-3">
          {showRetry && retryTarget ? <SGButton label={retryLabel} onPress={handleRetry} /> : null}
          {showScoreButton ? <SGButton label="Score Board" variant="ghost" onPress={handleScore} /> : null}
          <SGButton label="Home" variant="ghost" onPress={handleHome} />
        </SGCard>
      </Animated.View>

      <View className="mb-4">
        <MrecAdComponent />
      </View>
    </ScreenLayoutContainer>
  );
}
