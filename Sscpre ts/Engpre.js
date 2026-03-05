import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Engtspre = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/sscpreparation.json'
      resultIndex={0}
      resultPath='englishts'
      screenName='engtspre'
    />
  );
};

export default Engtspre;
