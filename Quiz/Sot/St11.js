import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst11 from '../QuizData/Sot/St11';

const St11 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst11} backRoute='Social tmq' />
);

export default St11;
