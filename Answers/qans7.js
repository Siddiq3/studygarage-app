import React from 'react';
import RemoteAnswerListScreen from '../src/features/answers/RemoteAnswerListScreen';

const Qans7 = (props) => (
  <RemoteAnswerListScreen
    {...props}
    fetchUrl="https://siddiq3.github.io/Api/Quizapi7.json"
    title="7th Class Answer Key"
    subtitle="Question-wise answers for 7th class daily quiz"
  />
);

export default Qans7;
