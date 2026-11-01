import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpe1 from '../QuizData/Phyeq/Pe1';

const Pe1 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpe1} backRoute='Physics emq' />
);

export default Pe1;
