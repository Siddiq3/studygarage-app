import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Nttspre = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/sscpreparation.json'
      resultIndex={0}
      resultPath='nstts'
      screenName='nttspre'
    />
  );
};

export default Nttspre;
