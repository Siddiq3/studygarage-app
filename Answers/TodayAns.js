import React from 'react';
import RemoteAnswerListScreen from '../src/features/answers/RemoteAnswerListScreen';

const Todayans = (props) => (
  <RemoteAnswerListScreen
    {...props}
    fetchUrl="https://siddiq3.github.io/Api/Quizapi.json"
    title="Today Answer Key"
    subtitle="Review today's daily quiz answers"
  />
);

export default Todayans;
