import React from 'react';
import LegacyDailyQuizScreen from '../src/features/quiz/LegacyDailyQuizScreen';

const Quiz9 = (props) => (
  <LegacyDailyQuizScreen
    {...props}
    quizUrl="https://siddiq3.github.io/Api/Quizapi9.json"
    resultRoute="Result9"
    scorePerCorrect={1}
    showTimer
    timerSeconds={15}
    includeStatsInResult
    includeTotalScoreInResult
    updateGlobalScore
    backBehavior="secondPage"
    screenTitle="9th Daily Quiz"
    screenSubtitle="Beat the timer and keep your streak alive"
    showResultsButtonOnLast={false}
  />
);

export default Quiz9;
