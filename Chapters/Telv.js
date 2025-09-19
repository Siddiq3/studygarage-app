import React from "react";
import { View, ScrollView, Button, Linking, StyleSheet } from "react-native";
import { Card } from "react-native-shadow-cards";

const Telv = () => {
  return (
    <View style={styles.container}>
      <ScrollView>

        <Card style={styles.card}>
          <Button
            color='#5F939A'
            title='ప్రకృతి వికృతులు'
            onPress={() => Linking.openURL('https://youtu.be/0lQdldMIpjg')}
          />
        </Card>

        <Card style={styles.card}>
          <Button
            color='#5F939A'
            title='తెలుగు వ్యాకరణం | సంధులు'
            onPress={() => Linking.openURL('https://youtu.be/5a0W-tI7Ylg')}
          />
        </Card>

        <Card style={styles.card}>
          <Button
            color='#5F939A'
            title='grammar in Amaravathi lesson'
            onPress={() => Linking.openURL('https://youtu.be/_nocBp5Pykc')}
          />
        </Card>

        <Card style={styles.card}>
          <Button
            color='#5F939A'
            title='Nanarthalu'
            onPress={() => Linking.openURL('https://youtu.be/yuf5fLxtbzA')}
          />
        </Card>

        <Card style={styles.card}>
          <Button
            color='#5F939A'
            title='అలంకారములు'
            onPress={() => Linking.openURL('https://youtu.be/7EtMePPAp6o')}
          />
        </Card>

        <Card style={styles.card}>
          <Button
            color='#5F939A'
            title='సమాసాలు'
            onPress={() => Linking.openURL('https://youtu.be/CNbjMD4dtlk')}
          />
        </Card>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3E9',
  },
  card: {
    padding: 30,
    margin: 20,
  },
});

export default Telv;
