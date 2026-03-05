import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Pttsimp = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Pttsimp'
      screenName='pttsimp'
    />
  );
};

export default Pttsimp;
