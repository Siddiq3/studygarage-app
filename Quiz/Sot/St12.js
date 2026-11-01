import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst12 from '../QuizData/Sot/St12';

const St12 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst12} backRoute='Social tmq' />
);

export default St12;
