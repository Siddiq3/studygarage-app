import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpe5 from '../QuizData/Phyeq/Pe5';

const Pe5 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpe5} backRoute='Physics emq' />
);

export default Pe5;
