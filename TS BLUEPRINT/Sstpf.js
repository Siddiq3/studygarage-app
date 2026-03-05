import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Sttsb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Sttsb'
      screenName='sttsb'
    />
  );
};

export default Sttsb;
