import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Card } from "react-native-shadow-cards";


const Appoly = ({ navigation }) => {
  const years = ['2022', '2021', '2020', '2019', '2018', '2017', '2016'];

  return (
    <View style={styles.container}>
      <ScrollView>
        {years.map((year) => (
          <Card key={year} style={styles.card}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(`poly${year}`)}
            >
              <Text style={styles.text}>{year} PAPERS</Text>
            </TouchableWithoutFeedback>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffafbd',
    paddingVertical: 20,
  },
  card: {
    padding: 30,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default Appoly;
