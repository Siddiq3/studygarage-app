import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dnt1 from '../QuizData/Nst/Nt1';

const Nt1 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dnt1} backRoute='Biology tmq' />
);

export default Nt1;
