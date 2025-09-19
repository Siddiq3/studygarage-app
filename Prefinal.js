import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { Card } from "react-native-shadow-cards";

const Prefinal = ({ navigation }) => {


  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ fontSize: 25, textAlign: 'center', color: '#D82148' }}>
          PREFINAL EXAM PAPERS
        </Text>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('telugu prefinal')}>
            <Text style={{ fontSize: 20 }}> TELUGU</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('hindi prefinal')}>
            <Text style={{ fontSize: 20 }}> HINDI</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('english prefinal')}>
            <Text style={{ fontSize: 20 }}> ENGLISH</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('maths em prefinal')}>
            <Text style={{ fontSize: 20 }}> MATHAMATICS-EM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('maths tm prefinal')}>
            <Text style={{ fontSize: 20 }}> MATHAMATICS-TM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('physics em prefinal')}>
            <Text style={{ fontSize: 20 }}> PS &NS-EM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('physics tm prefinal')}>
            <Text style={{ fontSize: 20 }}> PS &NS-TM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('social tm prefinal')}>
            <Text style={{ fontSize: 20 }}> SOCIAL-TM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('social em prefinal')}>
            <Text style={{ fontSize: 20 }}> SOCIAL-EM</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Prefinal;
