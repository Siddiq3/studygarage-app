import React from 'react';
import LegacyDailyQuizScreen from '../src/features/quiz/LegacyDailyQuizScreen';

const Quiz6 = (props) => (
  <LegacyDailyQuizScreen
    {...props}
    quizUrl="https://siddiq3.github.io/Api/Quizapi6.json"
    resultRoute="Result6"
    scorePerCorrect={10}
    showTimer={false}
    includeStatsInResult={false}
    includeTotalScoreInResult={false}
    updateGlobalScore={false}
    backBehavior="goBack"
    screenTitle="6th Daily Quiz"
    screenSubtitle="Answer each question to check your score"
    showResultsButtonOnLast
  />
);

export default Quiz6;
