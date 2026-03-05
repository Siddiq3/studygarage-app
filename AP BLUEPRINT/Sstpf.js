import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Stapb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Stapb'
      screenName='stapb'
    />
  );
};

export default Stapb;
