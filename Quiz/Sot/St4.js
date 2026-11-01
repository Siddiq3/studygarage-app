import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst4 from '../QuizData/Sot/St4';

const St4 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst4} backRoute='Social tmq' />
);

export default St4;
