import React, { useEffect } from 'react';
import { BackHandler, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenLayoutContainer from '../src/design-system/components/ScreenLayoutContainer';
import SGCard from '../src/design-system/components/SGCard';
import SGButton from '../src/design-system/components/SGButton';

const Dtest = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4" scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <SGCard className="mb-4">
          <Text className="text-[30px] font-extrabold leading-[34px] text-sg-text dark:text-sgd-text">NMMS Daily Test</Text>
          <Text className="mt-3 text-[16px] font-medium leading-[24px] text-sg-muted dark:text-sgd-muted">
            Every day we upload 6 NMMS practice questions. Complete this set regularly for better final-exam confidence.
          </Text>

          <View className="mt-6">
            <SGButton label="Start" onPress={() => navigation.navigate('Question6')} />
          </View>
        </SGCard>
      </Animated.View>
    </ScreenLayoutContainer>
  );
};

export default Dtest;
