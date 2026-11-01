import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst2 from '../QuizData/Sot/St2';

const St2 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst2} backRoute='Social tmq' />
);

export default St2;
