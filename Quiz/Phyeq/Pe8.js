import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpe8 from '../QuizData/Phyeq/Pe8';

const Pe8 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpe8} backRoute='Physics emq' />
);

export default Pe8;
