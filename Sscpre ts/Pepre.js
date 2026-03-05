import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Petspre = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/sscpreparation.json'
      resultIndex={0}
      resultPath='phyets'
      screenName='petspre'
    />
  );
};

export default Petspre;
