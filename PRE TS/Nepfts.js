import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Nepfts = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/prefinal.json'
      resultIndex={0}
      resultPath='Nepfts'
      screenName='nepfts'
    />
  );
};

export default Nepfts;
