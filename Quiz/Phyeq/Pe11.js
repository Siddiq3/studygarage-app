import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpe11 from '../QuizData/Phyeq/Pe11';

const Pe11 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpe11} backRoute='Physics emq' />
);

export default Pe11;
