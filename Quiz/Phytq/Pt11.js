import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpt11 from '../QuizData/Phytq/Pt11';

const Pt11 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpt11} backRoute='Physics tmq' />
);

export default Pt11;
