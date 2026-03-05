import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Pttssm = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Pttssm'
      screenName='pttssm'
    />
  );
};

export default Pttssm;
