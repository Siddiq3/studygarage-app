import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ScreenLayoutContainer from './src/design-system/components/ScreenLayoutContainer';
import ScreenHeader from './src/design-system/components/ScreenHeader';
import ContentsList from './src/design-system/components/ContentsList';
import ShimmerSkeleton from './src/components/ui/ShimmerSkeleton';
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
      <ScreenHeader tone="board" eyebrow="Subjects" title="Choose a subject" subtitle={`${stateBoard} · ${classValue}`} />
      {loading ? (
        <View className="gap-2.5">
          {[0, 1, 2, 3].map((idx) => (
            <ShimmerSkeleton key={`subject-loader-${idx}`} height={64} borderRadius={16} />
          ))}
        </View>
      ) : uniqueSubjects.length === 0 ? (
        <SGEmptyState title="No subjects yet" subtitle="Please try again later." />
      ) : (
        <ContentsList
          getKey={(item, index) => `${item.label}-${index}`}
          items={uniqueSubjects.map((item) => ({ label: item, onPress: () => handleSubjectPress(item) }))}
        />
      )}
    </ScreenLayoutContainer>
  );
};

export default SubjectData;
