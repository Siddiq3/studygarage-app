import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Etsimp = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Etsimp'
      screenName='etsimp'
    />
  );
};

export default Etsimp;
