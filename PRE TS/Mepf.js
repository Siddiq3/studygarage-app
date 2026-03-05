import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mepfts = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/prefinal.json'
      resultIndex={0}
      resultPath='Mepfts'
      screenName='mepfts'
    />
  );
};

export default Mepfts;
