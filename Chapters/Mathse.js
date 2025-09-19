import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Linking } from 'react-native';
import { Card } from "react-native-shadow-cards";

const Mathsee = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Chapter Wise Video Explanation</Text>

        <Card style={styles.card}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('real numbers')}>
            <Text style={styles.cardText}>1 Real Numbers</Text>
          </TouchableWithoutFeedback>
        </Card>

        <Card style={styles.card}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('sets')}>
            <Text style={styles.cardText}>2 Sets</Text>
          </TouchableWithoutFeedback>
        </Card>

        <Card style={styles.card}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('polynomials')}>
            <Text style={styles.cardText}>3 Polynomials</Text>
          </TouchableWithoutFeedback>
        </Card>

        <Card style={styles.card}>
          <TouchableWithoutFeedback onPress={() => Linking.openURL('https://youtu.be/NeMs_ydV4dY')}>
            <Text style={styles.cardText}>4 Pair of Linear Equations in Two Variables</Text>
          </TouchableWithoutFeedback>
        </Card>

        <Card style={styles.card}>
          <TouchableWithoutFeedback onPress={() => Linking.openURL('https://youtu.be/zp3NZ6Fr-sE')}>
            <Text style={styles.cardText}>5 Quadratic Equations</Text>
          </TouchableWithoutFeedback>
        </Card>

        <Card style={styles.card}>
          <TouchableWithoutFeedback onPress={() => Linking.openURL('https://youtu.be/gKJtrtTn49E')}>
            <Text style={styles.cardText}>6 Progressions</Text>
          </TouchableWithoutFeedback>
        </Card>

        <Card style={styles.card}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('coordinate')}>
            <Text style={styles.cardText}>7 Coordinate Geometry</Text>
          </TouchableWithoutFeedback>
        </Card>

        <Card style={styles.card}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('similar')}>
            <Text style={styles.cardText}>8 Similar Triangles</Text>
          </TouchableWithoutFeedback>
        </Card>

        <Card style={styles.card}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('tangents')}>
            <Text style={styles.cardText}>9 Tangents and Secants to a Circle</Text>
          </TouchableWithoutFeedback>
        </Card>

        <Card style={styles.card}>
          <TouchableWithoutFeedback onPress={() => Linking.openURL('https://youtu.be/AzV28RGJUlI')}>
            <Text style={styles.cardText}>10 Mensuration</Text>
          </TouchableWithoutFeedback>
        </Card>

        <Card style={styles.card}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('trigonometry')}>
            <Text style={styles.cardText}>11 Trigonometry</Text>
          </TouchableWithoutFeedback>
        </Card>

        <Card style={styles.card}>
          <TouchableWithoutFeedback onPress={() => Linking.openURL('https://youtu.be/92qg_Un-OVw')}>
            <Text style={styles.cardText}>12 Applications of Trigonometry</Text>
          </TouchableWithoutFeedback>
        </Card>

        <Card style={styles.card}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('probability')}>
            <Text style={styles.cardText}>13 Probability</Text>
          </TouchableWithoutFeedback>
        </Card>

        <Card style={styles.card}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('stats')}>
            <Text style={styles.cardText}>14 Statistics</Text>
          </TouchableWithoutFeedback>
        </Card>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3E9',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    padding: 30,
    margin: 20,
  },
  cardText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Mathsee;
