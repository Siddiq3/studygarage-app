import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Metsimp = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Metsimp'
      screenName='metsimp'
    />
  );
};

export default Metsimp;
