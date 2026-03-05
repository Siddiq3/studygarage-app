import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Setsimp = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Setsimp'
      screenName='setsimp'
    />
  );
};

export default Setsimp;
