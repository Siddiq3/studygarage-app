import React from 'react';
import LegacyDailyQuizScreen from '../src/features/quiz/LegacyDailyQuizScreen';

const Quiz11 = (props) => (
  <LegacyDailyQuizScreen
    {...props}
    quizUrl="https://siddiq3.github.io/Api/Quizapi11.json"
    resultRoute="Result11"
    scorePerCorrect={10}
    showTimer={false}
    includeStatsInResult={false}
    includeTotalScoreInResult={false}
    updateGlobalScore={false}
    backBehavior="confirmSecondPage"
    screenTitle="11th Daily Quiz"
    screenSubtitle="Answer each question to check your score"
    showResultsButtonOnLast
  />
);

export default Quiz11;
