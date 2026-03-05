import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Netsimp = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Netsimp'
      screenName='netsimp'
    />
  );
};

export default Netsimp;
