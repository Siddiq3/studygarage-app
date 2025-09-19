import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Card } from "react-native-shadow-cards";

const Mathste = ({ navigation }) => {
  const chapters = [
    { id: 1, title: 'వాస్తవ సంఖ్యలు', screen: 'chapter1' },
    { id: 2, title: 'సమితులు', screen: 'chapter2' },
    { id: 3, title: 'బహుపదులు', screen: 'chapter3' },
    { id: 4, title: 'రెండు చరరాశులలో రేఖీయ సమీకరణాల జత', screen: 'chapter4' },
    { id: 5, title: 'వర్గ సమీకరణాలు', screen: 'chapter5' },
    { id: 6, title: 'శ్రేఢులు', screen: 'chapter6' },
    { id: 7, title: 'నిరూపక రేఖాగణితం', screen: 'chapter7' },
    { id: 8, title: 'సరూప త్రిభుజాలు', screen: 'chapter8' },
    { id: 9, title: 'వృత్తాలకు స్పర్శరేఖలు మరియు ఛేదనరేఖలు', screen: 'chapter9' },
    { id: 10, title: 'క్షేత్రమితి', screen: 'chapter10' },
    { id: 11, title: 'త్రికోణమితి', screen: 'chapter11' },
    { id: 12, title: 'త్రికోణమితి అనువర్తనాలు', screen: 'chapter12' },
    { id: 13, title: 'సంభావ్యత', screen: 'chapter13' },
    { id: 14, title: 'సాంఖ్యకశాస్త్రం', screen: 'chapter14' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Chapter Wise Video Explanation</Text>
        {chapters.map((chapter) => (
          <Card key={chapter.id} style={styles.card}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate(chapter.screen)}>
              <Text style={styles.cardText}>{chapter.id} {chapter.title}</Text>
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

export default Mathste;
