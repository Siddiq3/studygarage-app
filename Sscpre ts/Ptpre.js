import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Pttspre = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/sscpreparation.json'
      resultIndex={0}
      resultPath='phytts'
      screenName='pttspre'
    />
  );
};

export default Pttspre;
