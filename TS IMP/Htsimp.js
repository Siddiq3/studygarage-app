import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Htsimp = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Htsimp'
      screenName='htsimp'
    />
  );
};

export default Htsimp;
