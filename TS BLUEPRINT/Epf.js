import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Etsb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Etsb'
      screenName='etsb'
    />
  );
};

export default Etsb;
