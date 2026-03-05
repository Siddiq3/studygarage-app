import React from 'react';
import RemoteAnswerListScreen from '../src/features/answers/RemoteAnswerListScreen';

const Qans9 = (props) => (
  <RemoteAnswerListScreen
    {...props}
    fetchUrl="https://siddiq3.github.io/Api/Quizapi9.json"
    title="9th Class Answer Key"
    subtitle="Question-wise answers for 9th class daily quiz"
  />
);

export default Qans9;
