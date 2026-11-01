import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst10 from '../QuizData/Sot/St10';

const St10 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst10} backRoute='Social tmq' />
);

export default St10;
