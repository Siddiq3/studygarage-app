import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpt3 from '../QuizData/Phytq/Pt3';

const Pt3 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpt3} backRoute='Physics tmq' />
);

export default Pt3;
