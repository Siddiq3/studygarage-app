import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpt7 from '../QuizData/Phytq/Pt7';

const Pt7 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpt7} backRoute='Physics tmq' />
);

export default Pt7;
