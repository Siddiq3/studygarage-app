import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst17 from '../QuizData/Sot/St17';

const St17 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst17} backRoute='Social tmq' />
);

export default St17;
