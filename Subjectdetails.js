import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ScreenLayoutContainer from './src/design-system/components/ScreenLayoutContainer';
import SGCard from './src/design-system/components/SGCard';
import AnimatedActionCard from './src/design-system/components/AnimatedActionCard';
import QuizLoadingSkeleton from './src/components/quiz/QuizLoadingSkeleton';
import SGEmptyState from './src/design-system/components/SGEmptyState';
import { buildQuizSubjectsUrl } from './src/utils/quizDataUrl';

const SubjectData = ({ route }) => {
  const { stateBoard, classValue } = route.params;
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const navigation = useNavigation();

  const apiUrl = buildQuizSubjectsUrl({ stateBoard, classValue });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data.results;
        setQuizData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const uniqueSubjects = Array.from(new Set(quizData.map((item) => item.subject)));

  const handleSubjectPress = (selectedSubject) => {
    navigation.navigate('ChapterDetails', { stateBoard, classValue, subject: selectedSubject });
  };

  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4" scroll>
      <SGCard className="mb-4">
        <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">Subjects</Text>
        <Text className="mt-1 text-[28px] font-extrabold leading-[32px] text-sg-text dark:text-sgd-text">Choose Subject</Text>
        <Text className="mt-1 text-[14px] font-semibold text-sg-muted dark:text-sgd-muted">
          {stateBoard} • {classValue}
        </Text>

        <View className="mt-4">
          {loading ? (
            <QuizLoadingSkeleton />
          ) : uniqueSubjects.length === 0 ? (
            <SGEmptyState
              title="Quiz data is preparing"
              subtitle="Please try again later."
              badgeLabel="NO SUBJECTS"
            />
          ) : (
            uniqueSubjects.map((item, index) => (
              <AnimatedActionCard
                key={`${item}-${index}`}
                className="mb-3"
                onPress={() => handleSubjectPress(item)}
              >
                <TouchableOpacity activeOpacity={0.8} className="rounded-[18px] border border-white/10 bg-[#101521]/86 px-4 py-4">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-[16px] font-bold text-white">{item}</Text>
                    <Icon name="angle-right" size={20} color="#D4DAEA" />
                  </View>
                </TouchableOpacity>
              </AnimatedActionCard>
            ))
          )}
        </View>
      </SGCard>
    </ScreenLayoutContainer>
  );
};

export default SubjectData;
