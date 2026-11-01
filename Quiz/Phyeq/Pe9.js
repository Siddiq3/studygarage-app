import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpe9 from '../QuizData/Phyeq/Pe9';

const Pe9 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpe9} backRoute='Physics emq' />
);

export default Pe9;
