import React from 'react';
import LegacyDailyQuizScreen from '../src/features/quiz/LegacyDailyQuizScreen';

const Quiz7 = (props) => (
  <LegacyDailyQuizScreen
    {...props}
    quizUrl="https://siddiq3.github.io/Api/Quizapi7.json"
    resultRoute="Result7"
    scorePerCorrect={10}
    showTimer={false}
    includeStatsInResult={false}
    includeTotalScoreInResult={false}
    updateGlobalScore={false}
    backBehavior="secondPage"
    screenTitle="7th Daily Quiz"
    screenSubtitle="Answer each question to check your score"
    showResultsButtonOnLast
  />
);

export default Quiz7;
