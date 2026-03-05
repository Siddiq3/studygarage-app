import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Pttsb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Pttsb'
      screenName='pttsb'
    />
  );
};

export default Pttsb;
