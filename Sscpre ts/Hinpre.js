import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Hintspre = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/sscpreparation.json'
      resultIndex={0}
      resultPath='hindits'
      screenName='hintspre'
    />
  );
};

export default Hintspre;
