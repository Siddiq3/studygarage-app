import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Ttssm = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Ttssm'
      screenName='ttssm'
    />
  );
};

export default Ttssm;
