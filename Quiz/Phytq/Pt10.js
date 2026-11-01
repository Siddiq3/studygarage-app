import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpt10 from '../QuizData/Phytq/Pt10';

const Pt10 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpt10} backRoute='Physics tmq' />
);

export default Pt10;
