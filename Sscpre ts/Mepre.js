import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Metspre = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/sscpreparation.json'
      resultIndex={0}
      resultPath='mathsets'
      screenName='metspre'
    />
  );
};

export default Metspre;
