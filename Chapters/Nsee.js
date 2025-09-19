import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Linking } from 'react-native';
import { Card } from 'react-native-shadow-cards';

const Nsee = ({ navigation }) => {
  const chapters = [
    { id: 1, title: 'Nutrition', url: 'https://youtu.be/EjuRUvDDa0U' },
    { id: 2, title: 'Respiration', url: 'https://youtu.be/wizRGgIVdi4' },
    { id: 3, title: 'Transportation', url: 'https://youtu.be/APAIKgRSDho' },
    { id: 4, title: 'Excretion', url: 'https://youtu.be/fd-Vgc73VRQ' },
    { id: 5, title: 'Coordination', url: 'https://youtu.be/mdFM5zFCyeY' },
    { id: 6, title: 'Reproduction', url: 'https://youtu.be/Arrg1wvXWgI' },
    { id: 7, title: 'Coordination in Life Processes', screen: 'coordinations' },
    { id: 8, title: 'Heredity', url: 'https://youtu.be/CsKDXDYYwTI' },
    { id: 9, title: 'Our Environment', screen: 'environment' },
    { id: 10, title: 'Natural Resources', screen: 'natural' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Chapter Wise Video Explanation</Text>
        {chapters.map((chapter) => (
          <Card key={chapter.id} style={styles.card}>
            {chapter.url ? (
              <Button
                color="#5F939A"
                title={`${chapter.id} ${chapter.title}`}
                onPress={() => Linking.openURL(chapter.url)}
              />
            ) : (
              <Button
                color="#5F939A"
                title={`${chapter.id} ${chapter.title}`}
                onPress={() => navigation.navigate(chapter.screen)}
              />
            )}
          </Card>
        ))}
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
});

export default Nsee;
