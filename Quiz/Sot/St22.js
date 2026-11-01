import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst22 from '../QuizData/Sot/St22';

const St22 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst22} backRoute='Social tmq' />
);

export default St22;
