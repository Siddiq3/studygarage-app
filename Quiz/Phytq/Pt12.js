import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpt12 from '../QuizData/Phytq/Pt12';

const Pt12 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpt12} backRoute='Physics tmq' />
);

export default Pt12;
