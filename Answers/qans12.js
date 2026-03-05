import React from 'react';
import RemoteAnswerListScreen from '../src/features/answers/RemoteAnswerListScreen';

const Qans12 = (props) => (
  <RemoteAnswerListScreen
    {...props}
    fetchUrl="https://siddiq3.github.io/Api/Quizapi12.json"
    title="12th Quiz Answer Key"
    subtitle="Review all answers from the 12th quiz"
  />
);

export default Qans12;
