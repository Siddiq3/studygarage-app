import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Linking } from 'react-native';
import { Card } from 'react-native-shadow-cards';

const Nste = ({ navigation }) => {
  const chapters = [
    { id: 1, title: 'పోషణ – ఆహార సరఫరా వ్యవస్థ', url: 'https://youtu.be/EahhWsJU7uI' },
    { id: 2, title: 'శ్వాసక్రియ –శక్తి ఉత్పాదక వ్యవస్థ', url: 'https://youtu.be/WNq8teiva98' },
    { id: 3, title: 'ప్రసరణ –పదార్థ రవాణా వ్యవస్థ', url: 'https://youtu.be/L9RcaInYJxQ' },
    { id: 4, title: 'విసర్జన –వ్యర్థాల తొలగింపు వ్యవస్థ', screen: 'Chapter4' },
    { id: 5, title: 'నియంత్రణ –సమన్వయ వ్యవస్థ', screen: 'Chapter5' },
    { id: 6, title: 'ప్రత్యుత్పత్తి –పునరుత్పాదక వ్యవస్థ', url: 'https://youtu.be/Arrg1wvXWgI' },
    { id: 7, title: 'జీవక్రియలలో సమన్వయం', screen: 'Chapter7' },
    { id: 8, title: 'అనువంశికత –తరతరాలలో వైవిధ్యాలు', screen: 'Chapter8' },
    { id: 9, title: 'మన పర్యావరణం –మన బాధ్యత', screen: 'Chapter9' },
    { id: 10, title: 'సహజ వనరులు', screen: 'Chapter10' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Chapter Wise Video Explanation</Text>
        {chapters.map((chapter) => (
          <Card key={chapter.id} style={styles.card}>
            <Button
              color="#5F939A"
              title={`${chapter.id}. ${chapter.title}`}
              onPress={() =>
                chapter.url ? Linking.openURL(chapter.url) : navigation.navigate(chapter.screen)
              }
            />
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

export default Nste;
