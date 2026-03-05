import React, { useEffect, useMemo, useState } from 'react';
import { BackHandler, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenLayoutContainer from './src/design-system/components/ScreenLayoutContainer';
import SGCard from './src/design-system/components/SGCard';
import AnimatedActionCard from './src/design-system/components/AnimatedActionCard';
import MrecAdComponent from './MrecAdComponent';

const decodeText = (value) => {
  try {
    return decodeURIComponent(value || '');
  } catch (_error) {
    return value || '';
  }
};

const Ssc = ({ navigation }) => {
  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getQuiz = async () => {
    try {
      setIsLoading(true);
      const url1 = 'https://siddiq3.github.io/Api/subject.json';
      const res = await fetch(url1);
      const data = await res.json();
      setQuestions(data?.results?.[0] || {});
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = useMemo(
    () => [
      { key: 'sub1', label: decodeText(questions?.sub1) || 'Telugu', screen: 'telugu ssc2023' },
      { key: 'sub2', label: decodeText(questions?.sub2) || 'Hindi', screen: 'hindi ssc2023' },
      { key: 'sub3', label: decodeText(questions?.sub3) || 'English', screen: 'english ssc2023' },
    ],
    [questions]
  );

  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4" scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <SGCard className="mb-4">
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">SSC 2023</Text>
          <Text className="mt-1 text-[28px] font-extrabold leading-[32px] text-sg-text dark:text-sgd-text">Subject Papers</Text>
          <Text className="mt-1 text-[13px] font-medium text-sg-muted dark:text-sgd-muted">
            Open subject-wise SSC paper sets
          </Text>

          <View className="mt-4">
            {items.map((item, index) => (
              <Animated.View key={item.key} entering={FadeInDown.delay(20 + index * 12).duration(170)} className="mb-3">
                <AnimatedActionCard onPress={() => navigation.navigate(item.screen)}>
                  <View className="rounded-[18px] border border-sg-border bg-sg-surface/88 px-4 py-4 dark:border-sgd-border dark:bg-sgd-surface/88">
                    <View className="flex-row items-center justify-between">
                      <Text className="flex-1 text-[16px] font-bold text-sg-text dark:text-sgd-text">
                        {isLoading ? 'Loading...' : item.label}
                      </Text>
                      <Text className="ml-3 text-[12px] font-semibold text-sg-muted dark:text-sgd-muted">Open</Text>
                    </View>
                  </View>
                </AnimatedActionCard>
              </Animated.View>
            ))}
          </View>
        </SGCard>
      </Animated.View>

      <View className="mb-4">
        <MrecAdComponent />
      </View>
    </ScreenLayoutContainer>
  );
};

export default Ssc;
