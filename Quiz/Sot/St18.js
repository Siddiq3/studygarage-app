import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst18 from '../QuizData/Sot/St18';

const St18 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst18} backRoute='Social tmq' />
);

export default St18;
