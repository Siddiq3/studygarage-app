import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpe10 from '../QuizData/Phyeq/Pe10';

const Pe10 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpe10} backRoute='Physics emq' />
);

export default Pe10;
