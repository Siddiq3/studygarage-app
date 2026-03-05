import React from 'react';
import LegacyDailyQuizScreen from '../src/features/quiz/LegacyDailyQuizScreen';

const Quiz8ka = (props) => (
  <LegacyDailyQuizScreen
    {...props}
    quizUrl="https://siddiq3.github.io/Api/Quizapi8ka.json"
    resultRoute="Result8ka"
    scorePerCorrect={1}
    showTimer
    timerSeconds={15}
    includeStatsInResult
    includeTotalScoreInResult
    updateGlobalScore
    backBehavior="secondPage"
    screenTitle="8th Kannada Daily Quiz"
    screenSubtitle="Beat the timer and keep your streak alive"
    showResultsButtonOnLast={false}
  />
);

export default Quiz8ka;
