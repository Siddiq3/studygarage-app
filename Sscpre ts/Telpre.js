import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Teltspre = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/sscpreparation.json'
      resultIndex={0}
      resultPath='teluguts'
      screenName='teltspre'
    />
  );
};

export default Teltspre;
