import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpt8 from '../QuizData/Phytq/Pt8';

const Pt8 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpt8} backRoute='Physics tmq' />
);

export default Pt8;
