import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpe7 from '../QuizData/Phyeq/Pe7';

const Pe7 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpe7} backRoute='Physics emq' />
);

export default Pe7;
