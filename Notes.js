import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Notes = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getQuiz = async () => {
    try {
      setIsLoading(true);
      const url1 = 'https://siddiq3.github.io/Api/notes.json';
      const res = await fetch(url1);
      const data = await res.json();
      setQuestions(data.results[0]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();
  
        return () => backHandler.remove();
    }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={{ padding: 10, margin: 15 }}>
          <TouchableOpacity
            style={{ padding: 10, margin: 15 }}
            activeOpacity={1}
            onPress={() => navigation.navigate('note10')}
          >
            {isLoading ? (
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
            ) : (
              questions && (
                <Text style={{ textAlign: 'center', fontSize: 20 }}>
                  {decodeURIComponent(questions.note10)}
                </Text>
              )
            )}
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 10, margin: 15 }}>
          <TouchableOpacity
            style={{ padding: 10, margin: 15 }}
            activeOpacity={1}
            onPress={() => navigation.navigate('note10t')}
          >
            {isLoading ? (
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
            ) : (
              questions && (
                <Text style={{ textAlign: 'center', fontSize: 20 }}>
                  {decodeURIComponent(questions.note10t)}
                </Text>
              )
            )}
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 10, margin: 15 }}>
          <TouchableOpacity
            style={{ padding: 10, margin: 15 }}
            activeOpacity={1}
            onPress={() => navigation.navigate('note9')}
          >
            {isLoading ? (
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
            ) : (
              questions && (
                <Text style={{ textAlign: 'center', fontSize: 20 }}>
                  {decodeURIComponent(questions.note9)}
                </Text>
              )
            )}
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 10, margin: 15 }}>
          <TouchableOpacity
            style={{ padding: 10, margin: 15 }}
            activeOpacity={1}
            onPress={() => navigation.navigate('note9t')}
          >
            {isLoading ? (
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
            ) : (
              questions && (
                <Text style={{ textAlign: 'center', fontSize: 20 }}>
                  {decodeURIComponent(questions.note9t)}
                </Text>
              )
            )}
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 10, margin: 15 }}>
          <TouchableOpacity
            style={{ padding: 10, margin: 15 }}
            activeOpacity={1}
            onPress={() => navigation.navigate('note8')}
          >
            {isLoading ? (
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
            ) : (
              questions && (
                <Text style={{ textAlign: 'center', fontSize: 20 }}>
                  {decodeURIComponent(questions.note8)}
                </Text>
              )
            )}
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 10, margin: 15 }}>
          <TouchableOpacity
            style={{ padding: 10, margin: 15 }}
            activeOpacity={1}
            onPress={() => navigation.navigate('note8t')}
          >
            {isLoading ? (
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
            ) : (
              questions && (
                <Text style={{ textAlign: 'center', fontSize: 20 }}>
                  {decodeURIComponent(questions.note8t)}
                </Text>
              )
            )}
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 10, margin: 15 }}>
          <TouchableOpacity
            style={{ padding: 10, margin: 15 }}
            activeOpacity={1}
            onPress={() => navigation.navigate('note7')}
          >
            {isLoading ? (
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
            ) : (
              questions && (
                <Text style={{ textAlign: 'center', fontSize: 20 }}>
                  {decodeURIComponent(questions.note7)}
                </Text>
              )
            )}
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 10, margin: 15 }}>
          <TouchableOpacity
            style={{ padding: 10, margin: 15 }}
            activeOpacity={1}
            onPress={() => navigation.navigate('note7t')}
          >
            {isLoading ? (
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
            ) : (
              questions && (
                <Text style={{ textAlign: 'center', fontSize: 20 }}>
                  {decodeURIComponent(questions.note7t)}
                </Text>
              )
            )}
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 10, margin: 15 }}>
          <TouchableOpacity
            style={{ padding: 10, margin: 15 }}
            activeOpacity={1}
            onPress={() => navigation.navigate('note6')}
          >
            {isLoading ? (
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
            ) : (
              questions && (
                <Text style={{ textAlign: 'center', fontSize: 20 }}>
                  {decodeURIComponent(questions.note6)}
                </Text>
              )
            )}
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 10, margin: 15 }}>
          <TouchableOpacity
            style={{ padding: 10, margin: 15 }}
            activeOpacity={1}
            onPress={() => navigation.navigate('note6t')}
          >
            {isLoading ? (
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
            ) : (
              questions && (
                <Text style={{ textAlign: 'center', fontSize: 20 }}>
                  {decodeURIComponent(questions.note6t)}
                </Text>
              )
            )}
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

export default Notes;
