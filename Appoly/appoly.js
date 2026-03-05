import React from 'react';
import SimpleSubjectHub from '../src/features/hubs/SimpleSubjectHub';

const Appoly = ({ navigation }) => {
  const items = [
    { label: '2022 Papers', route: 'poly2022' },
    { label: '2021 Papers', route: 'poly2021' },
    { label: '2020 Papers', route: 'poly2020' },
    { label: '2019 Papers', route: 'poly2019' },
    { label: '2018 Papers', route: 'poly2018' },
    { label: '2017 Papers', route: 'poly2017' },
    { label: '2016 Papers', route: 'poly2016' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="AP Polycet"
      subtitle="Year-wise previous papers"
      items={items}
    />
  );
};

export default Appoly;
