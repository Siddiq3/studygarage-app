import React from "react";
import { View, Text, Button, ScrollView, Linking, StyleSheet } from "react-native";
import { Card } from "react-native-shadow-cards";

const Socialte = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Chapter Wise Video Explanation</Text>

        <Card style={styles.card}>
          <Button
            color='#5F939A'
            title='1 భారతదేశం: భౌగోళిక స్వరూపాలు'
            onPress={() => Linking.openURL('https://youtu.be/XQ6wjGneIwo')}
          />
        </Card>

        <Card style={styles.card}>
          <Button
            color='#5F939A'
            title='2 అభివృద్ధి భావనలు'
            onPress={() => Linking.openURL('https://youtu.be/voI6qAvIjKY')}
          />
        </Card>

        <Card style={styles.card}>
          <Button
            color='#5F939A'
            title='3 ఉత్పత్తి, ఉపాధి'
            onPress={() => Linking.openURL('https://youtu.be/3IM1p513zT4')}
          />
        </Card>

        {/* Add the rest of your chapters similarly */}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3E9',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    padding: 30,
    margin: 20,
  },
});

export default Socialte;
