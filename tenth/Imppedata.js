import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Imppedata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thimppe.json'
      destinationRoute='ImppePage'
    />
  );
};

export default Imppedata;
