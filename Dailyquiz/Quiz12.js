import React from 'react';
import LegacyDailyQuizScreen from '../src/features/quiz/LegacyDailyQuizScreen';

const Quiz12 = (props) => (
  <LegacyDailyQuizScreen
    {...props}
    quizUrl="https://siddiq3.github.io/Api/Quizapi12.json"
    resultRoute="Result12"
    scorePerCorrect={10}
    showTimer={false}
    includeStatsInResult={false}
    includeTotalScoreInResult={false}
    updateGlobalScore={false}
    backBehavior="confirmGoBack"
    screenTitle="12th Daily Quiz"
    screenSubtitle="Answer each question to check your score"
    showResultsButtonOnLast
  />
);

export default Quiz12;
