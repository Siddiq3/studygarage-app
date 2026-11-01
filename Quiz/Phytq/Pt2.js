import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpt2 from '../QuizData/Phytq/Pt2';

const Pt2 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpt2} backRoute='Physics tmq' />
);

export default Pt2;
