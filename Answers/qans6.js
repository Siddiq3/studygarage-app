import React from 'react';
import RemoteAnswerListScreen from '../src/features/answers/RemoteAnswerListScreen';

const Qans6 = (props) => (
  <RemoteAnswerListScreen
    {...props}
    fetchUrl="https://siddiq3.github.io/Api/Quizapi6.json"
    title="6th Class Answer Key"
    subtitle="Question-wise answers for 6th class daily quiz"
  />
);

export default Qans6;
