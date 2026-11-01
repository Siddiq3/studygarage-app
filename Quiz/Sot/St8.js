import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst8 from '../QuizData/Sot/St8';

const St8 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst8} backRoute='Social tmq' />
);

export default St8;
