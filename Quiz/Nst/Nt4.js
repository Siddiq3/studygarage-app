import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dnt4 from '../QuizData/Nst/Nt4';

const Nt4 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dnt4} backRoute='Biology tmq' />
);

export default Nt4;
