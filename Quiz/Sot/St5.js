import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst5 from '../QuizData/Sot/St5';

const St5 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst5} backRoute='Social tmq' />
);

export default St5;
