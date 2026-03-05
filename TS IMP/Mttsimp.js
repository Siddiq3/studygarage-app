import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mttsimp = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Mttsimp'
      screenName='mttsimp'
    />
  );
};

export default Mttsimp;
