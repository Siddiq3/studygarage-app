import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Petsimp = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Petsimp'
      screenName='petsimp'
    />
  );
};

export default Petsimp;
