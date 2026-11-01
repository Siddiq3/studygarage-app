import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst16 from '../QuizData/Sot/St16';

const St16 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst16} backRoute='Social tmq' />
);

export default St16;
