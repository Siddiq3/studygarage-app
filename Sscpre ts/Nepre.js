import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Netspre = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/sscpreparation.json'
      resultIndex={0}
      resultPath='nsets'
      screenName='netspre'
    />
  );
};

export default Netspre;
