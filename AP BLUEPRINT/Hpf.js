import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Hapb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Hapb'
      screenName='hapb'
    />
  );
};

export default Hapb;
