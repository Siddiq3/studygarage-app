import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst1 from '../QuizData/Sot/St1';

const St1 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst1} backRoute='Social tmq' />
);

export default St1;
