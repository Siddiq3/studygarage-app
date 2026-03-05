import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Textbookka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thtextbookska.json'
      destinationRoute='textbooksPageka'
    />
  );
};

export default Textbookka;
