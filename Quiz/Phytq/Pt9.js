import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpt9 from '../QuizData/Phytq/Pt9';

const Pt9 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpt9} backRoute='Physics tmq' />
);

export default Pt9;
