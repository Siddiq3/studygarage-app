import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpt4 from '../QuizData/Phytq/Pt4';

const Pt4 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpt4} backRoute='Physics tmq' />
);

export default Pt4;
