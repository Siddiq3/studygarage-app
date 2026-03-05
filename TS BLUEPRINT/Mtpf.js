import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mttsb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Mttsb'
      screenName='mttsb'
    />
  );
};

export default Mttsb;
