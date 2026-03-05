import React from 'react';
import LegacyDailyQuizScreen from '../src/features/quiz/LegacyDailyQuizScreen';

const Quiz10ts = (props) => (
  <LegacyDailyQuizScreen
    {...props}
    quizUrl="https://siddiq3.github.io/Api/Quizapi10ts.json"
    resultRoute="Result10ts"
    scorePerCorrect={1}
    showTimer
    timerSeconds={15}
    includeStatsInResult
    includeTotalScoreInResult
    updateGlobalScore
    backBehavior="confirmSecondPage"
    screenTitle="10th Telangana Daily Quiz"
    screenSubtitle="Beat the timer and keep your streak alive"
    showResultsButtonOnLast={false}
  />
);

export default Quiz10ts;
