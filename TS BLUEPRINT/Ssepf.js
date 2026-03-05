import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Setsb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Setsb'
      screenName='setsb'
    />
  );
};

export default Setsb;
