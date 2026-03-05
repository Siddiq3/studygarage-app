import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mtpfts = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/prefinal.json'
      resultIndex={0}
      resultPath='Mtpfts'
      screenName='mtpfts'
    />
  );
};

export default Mtpfts;
