import React, { useEffect } from 'react';
import { Alert, BackHandler, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenLayoutContainer from './src/design-system/components/ScreenLayoutContainer';
import ScreenHeader from './src/design-system/components/ScreenHeader';
import SGButton from './src/design-system/components/SGButton';

const QuizResults = ({ route, navigation }) => {
  const { totalQuestions, correctQuestions, incorrectQuestions, score } = route.params;
  const percentageCorrect = (correctQuestions / totalQuestions) * 100;

  const awardCoins = () => {
    if (percentageCorrect >= 50) {
      console.log('Congratulations! You earned coins!');
      // TODO: Add coin API logic here
    }
  };

  useEffect(() => {
    awardCoins();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

  const handleRetry = async () => {
    try {
      const storedStateBoard = await AsyncStorage.getItem('stateBoard');
      const storedClassValue = await AsyncStorage.getItem('classValue');

      if (storedStateBoard && storedClassValue) {
        navigation.navigate('SubjectDataPage', {
          stateBoard: storedStateBoard,
          classValue: storedClassValue,
        });
      } else {
        Alert.alert('Data not found', 'Please fill in all required fields in the FirstPage.');
      }
    } catch (error) {
      console.error('Error checking stored data:', error);
    }
  };

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

  return (
    <ScreenLayoutContainer variant="board" contentClassName="px-5 pb-6" scroll>
      <ScreenHeader board onBack={handleBackPress} eyebrow="Quiz results" title={percentageCorrect >= 50 ? 'You crushed it.' : 'Run it back.'} subtitle="Score 50% or more to add coins." className="mb-4" />
      <View >
        <Text
          className="font-sg-display text-[#F2B632]"
          style={{ fontSize: 96, lineHeight: 104, letterSpacing: -3, fontVariant: ['tabular-nums'] }}
        >
          {Math.round(percentageCorrect)}%
        </Text>
        <View className="mb-6 mt-3 flex-row border-y border-[#F4EFE2]/16 py-4">
          <Stat value={correctQuestions} label="Correct" color="#8FD9B4" />
          <Stat value={incorrectQuestions} label="Incorrect" color="#F28B76" />
          <Stat value={score} label="Score" color="#F4EFE2" />
        </View>
        <SGButton label="Retry" variant="board" onPress={handleRetry} className="mb-2.5" />
        <SGButton label="Home" variant="boardGhost" onPress={handleContinue} />
      </View>
    </ScreenLayoutContainer>
  );
};

function Stat({ value, label, color }) {
  return (
    <View className="flex-1">
      <Text className="text-[26px] font-sg-display" style={{ color }}>{value}</Text>
      <Text className="text-[13px] font-sg-medium text-[#B5C6BB]">{label}</Text>
    </View>
  );
}

export default QuizResults;
