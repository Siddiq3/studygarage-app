import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpe6 from '../QuizData/Phyeq/Pe6';

const Pe6 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpe6} backRoute='Physics emq' />
);

export default Pe6;
