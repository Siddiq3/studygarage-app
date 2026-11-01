import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dnt3 from '../QuizData/Nst/Nt3';

const Nt3 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dnt3} backRoute='Biology tmq' />
);

export default Nt3;
