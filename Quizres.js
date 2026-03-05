import React, { useEffect } from 'react';
import { Alert, BackHandler, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenLayoutContainer from './src/design-system/components/ScreenLayoutContainer';
import SGCard from './src/design-system/components/SGCard';
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
    <ScreenLayoutContainer variant="reward" contentClassName="px-4" scroll>
      <Animated.View entering={FadeInDown.duration(240)}>
        <SGCard className="mb-4">
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">Performance</Text>
          <Text className="mt-1 text-[30px] font-extrabold leading-[34px] text-sg-text dark:text-sgd-text">Quiz Results</Text>
          <Text className="mt-1 text-[14px] font-semibold text-sg-muted dark:text-sgd-muted">
            Need minimum 50% marks to add coins.
          </Text>

          <View className="mt-4 rounded-[20px] border border-white/10 bg-white/6 px-4 py-4">
            <Row label="Total Questions" value={totalQuestions} />
            <Row label="Correct" value={correctQuestions} tone="success" />
            <Row label="Incorrect" value={incorrectQuestions} tone="danger" />
            <Row label="Score" value={score} />
            <Row label="Percentage" value={`${percentageCorrect.toFixed(2)}%`} tone={percentageCorrect >= 50 ? 'success' : 'danger'} />
          </View>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(80).duration(240)}>
        <SGCard className="mb-4">
          <SGButton label="Retry" onPress={handleRetry} className="mb-3" />
          <SGButton label="Home" onPress={handleContinue} variant="ghost" />
        </SGCard>
      </Animated.View>
    </ScreenLayoutContainer>
  );
};

function Row({ label, value, tone = 'neutral' }) {
  const toneClass =
    tone === 'success'
      ? 'text-[#00FFA3]'
      : tone === 'danger'
      ? 'text-[#FF908B]'
      : 'text-sg-text dark:text-sgd-text';

  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-[14px] font-semibold text-sg-muted dark:text-sgd-muted">{label}</Text>
      <Text className={`text-[16px] font-extrabold ${toneClass}`}>{value}</Text>
    </View>
  );
}

export default QuizResults;
