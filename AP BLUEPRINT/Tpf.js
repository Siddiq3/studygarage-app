import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Tapb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Ttsb'
      screenName='tapb'
    />
  );
};

export default Tapb;
