import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst7 from '../QuizData/Sot/St7';

const St7 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst7} backRoute='Social tmq' />
);

export default St7;
