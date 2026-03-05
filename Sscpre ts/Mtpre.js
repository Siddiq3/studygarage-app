import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mttspre = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/sscpreparation.json'
      resultIndex={0}
      resultPath='mathstts'
      screenName='mttspre'
    />
  );
};

export default Mttspre;
