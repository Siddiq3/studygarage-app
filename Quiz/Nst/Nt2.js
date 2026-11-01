import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dnt2 from '../QuizData/Nst/Nt2';

const Nt2 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dnt2} backRoute='Biology tmq' />
);

export default Nt2;
