import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Card } from 'react-native-shadow-cards';

const Physicse = ({ navigation }) => {
  const chapters = [
    { id: 1, title: 'Heat', screen: 'Heat' },
    { id: 2, title: 'Acids, Bases and Salts', url: 'https://youtu.be/-HdLhWJo90Y' },
    { id: 3, title: 'Refraction of Light at Plane Surfaces', screen: 'plane' },
    { id: 4, title: 'Refraction of Light at Curved Surfaces', screen: 'curved' },
    { id: 5, title: 'Human Eye and Colourful World', screen: 'eye' },
    { id: 6, title: 'Structure of Atom', screen: 'atom' },
    { id: 7, title: 'Classification of Elements - The Periodic Table', url: 'https://youtu.be/BgUgbdiNUUQ' },
    { id: 8, title: 'Chemical Bonding', screen: 'chemical' },
    { id: 9, title: 'Electric Current', screen: 'current' },
    { id: 10, title: 'Electromagnetism', screen: 'electro' },
    { id: 11, title: 'Principles of Metallurgy', url: 'https://youtu.be/R7xPGLV3FB0' },
    { id: 12, title: 'Carbon and its Compounds', url: 'https://youtu.be/1HaE_37dWU0' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Chapter Wise Video Explanation</Text>
        {chapters.map((chapter) => (
          <Card key={chapter.id} style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                chapter.url ? Linking.openURL(chapter.url) : navigation.navigate(chapter.screen)
              }
            >
              <Text style={styles.chapterText}>{chapter.id}. {chapter.title}</Text>
            </TouchableOpacity>
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
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  chapterText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Physicse;
