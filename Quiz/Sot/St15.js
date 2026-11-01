import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst15 from '../QuizData/Sot/St15';

const St15 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst15} backRoute='Social tmq' />
);

export default St15;
