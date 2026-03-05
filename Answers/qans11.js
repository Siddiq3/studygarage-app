import React from 'react';
import RemoteAnswerListScreen from '../src/features/answers/RemoteAnswerListScreen';

const Qans11 = (props) => (
  <RemoteAnswerListScreen
    {...props}
    fetchUrl="https://siddiq3.github.io/Api/Quizapi11.json"
    title="11th Quiz Answer Key"
    subtitle="Review all answers from the 11th quiz"
  />
);

export default Qans11;
