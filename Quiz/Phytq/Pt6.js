import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpt6 from '../QuizData/Phytq/Pt6';

const Pt6 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpt6} backRoute='Physics tmq' />
);

export default Pt6;
