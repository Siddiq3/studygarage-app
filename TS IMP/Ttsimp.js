import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Ttsimp = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Ttsimp'
      screenName='ttsimp'
    />
  );
};

export default Ttsimp;
