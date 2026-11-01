import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst20 from '../QuizData/Sot/St20';

const St20 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst20} backRoute='Social tmq' />
);

export default St20;
