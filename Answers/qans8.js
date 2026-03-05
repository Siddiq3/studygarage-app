import React from 'react';
import RemoteAnswerListScreen from '../src/features/answers/RemoteAnswerListScreen';

const Qans8 = (props) => (
  <RemoteAnswerListScreen
    {...props}
    fetchUrl="https://siddiq3.github.io/Api/Quizapi8.json"
    title="8th Class Answer Key"
    subtitle="Question-wise answers for 8th class daily quiz"
  />
);

export default Qans8;
