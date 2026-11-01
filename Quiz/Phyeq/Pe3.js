import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpe3 from '../QuizData/Phyeq/Pe3';

const Pe3 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpe3} backRoute='Physics emq' />
);

export default Pe3;
