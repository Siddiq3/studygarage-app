import { BackHandler, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    responsiveFontSize
} from 'react-native-responsive-dimensions';

const QuizResults = ({ route, navigation }) => {
    const { totalQuestions, correctQuestions, incorrectQuestions, score } = route.params;

    // Calculate the percentage of correct answers
    const percentageCorrect = (correctQuestions / totalQuestions) * 100;

    // Define a function to award coins if the percentage is 50% or more
    const awardCoins = () => {
        if (percentageCorrect >= 50) {
            console.log('Congratulations! You earned coins!');
            // TODO: Add coin API logic here
        }
    };

    useEffect(() => {
        awardCoins();
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backHandler.remove();
    }, []);

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

    const handleContinue = async () => {
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

    const handleBackPress = () => {
        Alert.alert(
            'Exit',
            'Are you sure you want to go back?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Back', onPress: handleContinue }
            ],
            { cancelable: false }
        );
        return true;
    };

    return (
        <View style={styles.container}>
            <ScrollView>
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
                        <Text style={styles.labelText1}>Percentage Correct:</Text>
                        <Text style={styles.valueText}>{percentageCorrect.toFixed(2)}%</Text>
                    </View>
                </View>

                <Text style={styles.labelText2}>Need Minimum 50% Marks to Upload On Total Coins</Text>

                <TouchableOpacity style={styles.button} onPress={handleRetry}>
                    <Text style={styles.buttonText}>Retry</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
            </ScrollView>
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
    labelText: { color: '#F4BF96', fontSize: responsiveFontSize(2) },
    labelText1: { color: '#DA0C81', fontSize: responsiveFontSize(2) },
    labelText2: { fontSize: responsiveFontSize(2), textAlign: 'center' },
    valueText: { color: '#34495e', fontSize: responsiveFontSize(2) },
    labelTextCorrect: { color: '#2ecc71', fontSize: responsiveFontSize(2) },
    valueTextCorrect: { color: '#2ecc71', fontSize: responsiveFontSize(2) },
    labelTextIncorrect: { color: '#e74c3c', fontSize: responsiveFontSize(2) },
    valueTextIncorrect: { color: '#e74c3c', fontSize: responsiveFontSize(2) },
    button: {
        backgroundColor: '#3498db',
        borderRadius: 8,
        marginTop: 20,
        width: "90%",
        margin: 10,
        padding: 15
    },
    buttonText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default QuizResults;
