import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpe4 from '../QuizData/Phyeq/Pe4';

const Pe4 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpe4} backRoute='Physics emq' />
);

export default Pe4;
