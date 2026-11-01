import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dnt6 from '../QuizData/Nst/Nt6';

const Nt6 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dnt6} backRoute='Biology tmq' />
);

export default Nt6;
