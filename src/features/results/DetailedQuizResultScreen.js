import React, { useCallback, useEffect } from 'react';
import { Alert, BackHandler, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';
import useInterstitialAd from '../../../InterstitialAdComponent';
import MrecAdComponent from '../../../MrecAdComponent';
import ScreenLayoutContainer from '../../design-system/components/ScreenLayoutContainer';
import ScreenHeader from '../../design-system/components/ScreenHeader';
import SGButton from '../../design-system/components/SGButton';

export default function DetailedQuizResultScreen({
  route,
  navigation,
  title = 'Quiz Results',
  retryTarget,
  retryLabel = 'Play more and earn more',
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

  const accuracy = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;

  return (
    <ScreenLayoutContainer variant="board" contentClassName="px-4 pb-6" scroll>
      <ScreenHeader board onBack={handleBackPress} eyebrow="Performance" title={title} className="mb-6" />

      <Animated.View className="mb-6">
        <Text className="text-[13px] font-sg-semibold text-[#B5C6BB]">Score</Text>
        <Text className="text-[72px] leading-[78px] font-sg-display tracking-[-2px] text-[#F2B632]" style={{ fontVariant: ['tabular-nums'] }}>
          {score}
        </Text>
        <Text className="text-[14px] font-sg-medium text-[#B5C6BB]">{accuracy}% accuracy over {totalQuestions} questions</Text>
      </Animated.View>

      <Animated.View className="mb-6 flex-row border-y border-[#F4EFE2]/16 py-4">
        <View className="flex-1">
          <Text className="text-[26px] font-sg-display text-[#8FD9B4]">{correctQuestions}</Text>
          <Text className="text-[13px] font-sg-medium text-[#B5C6BB]">Correct</Text>
        </View>
        <View className="flex-1">
          <Text className="text-[26px] font-sg-display text-[#F28B76]">{incorrectQuestions}</Text>
          <Text className="text-[13px] font-sg-medium text-[#B5C6BB]">Incorrect</Text>
        </View>
      </Animated.View>

      <Animated.View className="mb-5 gap-2.5">
        {showRetry && retryTarget ? <SGButton label={retryLabel} variant="board" onPress={handleRetry} /> : null}
        {showScoreButton ? <SGButton label="Score board" variant="boardGhost" onPress={handleScore} /> : null}
        <SGButton label="Home" variant="boardGhost" onPress={handleHome} />
      </Animated.View>

      <View className="mb-4">
        <MrecAdComponent />
      </View>
    </ScreenLayoutContainer>
  );
}
