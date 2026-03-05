import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mtapb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Mtapb'
      screenName='mtapb'
    />
  );
};

export default Mtapb;
