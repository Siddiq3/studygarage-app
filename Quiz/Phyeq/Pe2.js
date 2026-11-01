import React from 'react';
import ChapterQuizScreen from '../ChapterQuizScreen';
import Dpe2 from '../QuizData/Phyeq/Pe2';

const Pe2 = ({ navigation }) => (
  <ChapterQuizScreen navigation={navigation} questions={Dpe2} backRoute='Physics emq' />
);

export default Pe2;
