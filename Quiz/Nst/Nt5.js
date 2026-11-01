import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dnt5 from '../QuizData/Nst/Nt5';

const Nt5 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dnt5} backRoute='Biology tmq' />
);

export default Nt5;
