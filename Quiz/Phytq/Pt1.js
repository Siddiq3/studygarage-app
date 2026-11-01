import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpt1 from '../QuizData/Phytq/Pt1';

const Pt1 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpt1} backRoute='Physics tmq' />
);

export default Pt1;
