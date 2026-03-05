import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Setspre = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/sscpreparation.json'
      resultIndex={0}
      resultPath='socets'
      screenName='setspre'
    />
  );
};

export default Setspre;
