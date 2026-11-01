import React, { useEffect, useMemo, useState } from 'react';
import { BackHandler, View } from 'react-native';
import Animated from 'react-native-reanimated';
import ScreenLayoutContainer from './src/design-system/components/ScreenLayoutContainer';
import ScreenHeader from './src/design-system/components/ScreenHeader';
import ContentsList from './src/design-system/components/ContentsList';
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
      <ScreenHeader tone="berry" eyebrow="SSC 2023" title="Subject papers" subtitle="Open subject-wise SSC paper sets" />
      <Animated.View>
        <ContentsList
          items={items.map((item) => ({
            label: isLoading ? 'Loading' : item.label,
            id: item.key,
            onPress: () => navigation.navigate(item.screen),
          }))}
        />
      </Animated.View>

      <View className="mb-4">
        <MrecAdComponent />
      </View>
    </ScreenLayoutContainer>
  );
};

export default Ssc;
