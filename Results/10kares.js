import { Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import MrecAdComponent from "../MrecAdComponent";
import useInterstitialAd from "../InterstitialAdComponent";



const Qres10ka = ({ route, navigation }) => {
  const { totalQuestions, correctQuestions, incorrectQuestions, score, totalscore } = route.params;

  const [loaded, setLoaded] = useState(false);
  const { showAd } = useInterstitialAd();

  // Handle hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleBackPress();
      return true;
    });

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleBackPress = () => {
    Alert.alert(
      'Exit',
      'Are you sure you want to exit?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', onPress: handleHome },
      ],
      { cancelable: false }
    );
    return true;
  };

  const handleRetry = async () => {
    try {
      const storedStateBoard = await AsyncStorage.getItem('stateBoard');
      const storedClassValue = await AsyncStorage.getItem('classValue');

      if (storedStateBoard && storedClassValue) {
        navigation.navigate('SubjectDataPage', {
          stateBoard: storedStateBoard,
          classValue: storedClassValue,
        });
      } else {
        Alert.alert('Data not found', 'Please fill in all required fields in the FirstPage.');
      }
    } catch (error) {
      console.error('Error checking stored data:', error);
    }
  };

  const handleHome = async () => {
    try {
      const storedUserName = await AsyncStorage.getItem('userName');
      const storedAvatar = await AsyncStorage.getItem('avatar');
      const storedStateBoard = await AsyncStorage.getItem('stateBoard');
      const storedClassValue = await AsyncStorage.getItem('classValue');

      if (storedUserName && storedAvatar && storedStateBoard && storedClassValue) {
        navigation.navigate('SecondPage', {
          userName: storedUserName,
          stateBoard: storedStateBoard,
          classValue: storedClassValue,
          avatar: storedAvatar,
        });
      } else {
        Alert.alert('Data not found', 'Please fill in all required fields in the FirstPage.');
      }
    } catch (error) {
      console.error('Error checking stored data:', error);
    }
  };

  const handleScore = () => {
    showAd();
    navigation.navigate('TotalScorePage');
  };

  if (!loaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.resultText}>Quiz Results</Text>
        <View style={styles.resultItem}>
          <Text style={styles.labelText}>Total Questions:</Text>
          <Text style={styles.valueText}>{totalQuestions}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.labelTextCorrect}>Correct Questions:</Text>
          <Text style={styles.valueTextCorrect}>{correctQuestions}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.labelTextIncorrect}>Incorrect Questions:</Text>
          <Text style={styles.valueTextIncorrect}>{incorrectQuestions}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.labelTextIncorrect}>Score:</Text>
          <Text style={styles.valueTextIncorrect}>{score}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRetry}>
        <Text style={styles.buttonText}>Play More And Earn More</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleScore}>
        <Text style={styles.buttonText}>Score Board</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleHome}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <MrecAdComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    margin: 40,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultText: {
    fontSize: responsiveFontSize(3),
    fontWeight: '700',
    marginBottom: 20,
    color: '#3498db',
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    margin: 10,
  },
  labelText: {
    color: '#F4BF96',
    fontSize: responsiveFontSize(2),
  },
  valueText: {
    color: '#34495e',
    fontSize: responsiveFontSize(2),
  },
  labelTextCorrect: {
    color: '#2ecc71',
    fontSize: responsiveFontSize(2),
  },
  valueTextCorrect: {
    color: '#2ecc71',
    fontSize: responsiveFontSize(2),
  },
  labelTextIncorrect: {
    color: '#e74c3c',
    fontSize: responsiveFontSize(2),
  },
  valueTextIncorrect: {
    color: '#e74c3c',
    fontSize: responsiveFontSize(2),
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '90%',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    textAlign: 'center',
  },
  bannerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default Qres10ka;
