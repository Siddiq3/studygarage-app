import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst19 from '../QuizData/Sot/St19';

const St19 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst19} backRoute='Social tmq' />
);

export default St19;
