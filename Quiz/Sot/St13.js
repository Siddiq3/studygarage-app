import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dst13 from '../QuizData/Sot/St13';

const St13 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dst13} backRoute='Social tmq' />
);

export default St13;
