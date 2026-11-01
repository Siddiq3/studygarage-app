import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst3 from '../QuizData/Sot/St3';

const St3 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst3} backRoute='Social tmq' />
);

export default St3;
