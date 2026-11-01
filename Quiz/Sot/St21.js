import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst21 from '../QuizData/Sot/St21';

const St21 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst21} backRoute='Social tmq' />
);

export default St21;
