import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst9 from '../QuizData/Sot/St9';

const St9 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst9} backRoute='Social tmq' />
);

export default St9;
