import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Sttspre = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/sscpreparation.json'
      resultIndex={0}
      resultPath='soctts'
      screenName='sttspre'
    />
  );
};

export default Sttspre;
