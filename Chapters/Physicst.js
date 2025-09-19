import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-shadow-cards';

const Physicst = ({ navigation }) => {
  const chapters = [
    { id: 1, title: 'ఉష్ణం', screen: '1st' },
    { id: 2, title: 'ఆమ్లాలు-క్షారాలు-లవణాలు', screen: '2nd' },
    { id: 3, title: 'సమతల ఉపరితలాల వద్ద కాంతి వక్రీభవనం', screen: '3rd' },
    { id: 4, title: 'వక్రతలాల వద్ద కాంతి వక్రీభవనం', screen: '4th' },
    { id: 5, title: 'మానవుని కన్ను-రంగుల ప్రపంచం', screen: '5th' },
    { id: 6, title: 'పరమాణు నిర్మాణం', screen: '6th' },
    { id: 7, title: 'మూలకాల వర్గీకరణ – ఆవర్తన పట్టిక', screen: '7th' },
    { id: 8, title: 'రసాయన బంధం', screen: '8th' },
    { id: 9, title: 'విద్యుత్ ప్రవాహం', screen: '9th' },
    { id: 10, title: 'విద్యుదయస్కాంతత్వం', screen: '10th' },
    { id: 11, title: 'లోహ సంగ్రహణ శాస్త్రం', screen: '11th' },
    { id: 12, title: 'కార్బన్– దాని సమ్మేళనాలు', screen: '12th' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Chapter Wise Video Explanation</Text>
        {chapters.map((chapter) => (
          <Card key={chapter.id} style={styles.card}>
            <TouchableOpacity
              onPress={() => navigation.navigate(chapter.screen)}
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

export default Physicst;
