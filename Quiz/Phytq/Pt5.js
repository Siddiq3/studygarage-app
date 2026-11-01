import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpt5 from '../QuizData/Phytq/Pt5';

const Pt5 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpt5} backRoute='Physics tmq' />
);

export default Pt5;
