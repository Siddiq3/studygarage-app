import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dnt7 from '../QuizData/Nst/Nt7';

const Nt7 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dnt7} backRoute='Biology tmq' />
);

export default Nt7;
