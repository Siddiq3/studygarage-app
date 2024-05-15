import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Share, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MainPage = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        const url1 = 'https://siddiq3.github.io/Api/Cardapi.json';
        const res = await fetch(url1);
        const data = await res.json();

        setQuestions(data.results[0]);
        setIsLoading(false);
    };


    // Initial fetch and button status check
    useEffect(() => {
        getQuiz();

    }, []);

    const handleRateUs = () => {
        const storeUrl = Platform.select({

            android: 'https://play.google.com/store/apps/details?id=siddiqkolimidev.tenth_app',
        });

        Linking.openURL(storeUrl)
            .then(() => {
                console.log('Opened store page for rating.');
            })
            .catch((err) => {
                console.error('Error opening store page:', err);
            });
    };

    const handleShareApp = async () => {
        try {
            const result = await Share.share({
                message: 'Check out this amazing 👌 app usefull to all students : https://play.google.com/store/apps/details?id=siddiqkolimidev.tenth_app',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared via:', result.activityType);
                } else {
                    console.log('Shared');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share cancelled');
            }
        } catch (error) {
            console.error('Error sharing app:', error.message);
        }
    };


    const handleAboutUs = () => {
        Linking.openURL(`${questions.aboutus}`);
        console.log('About Us');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleRateUs}>
                <Icon name="star" size={20} color="black" />
                <Text style={styles.buttonText}>Rate Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleShareApp}>
                <Icon name="share" size={20} color="black" />
                <Text style={styles.buttonText}>Share App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleAboutUs}>
                <Icon name="info-circle" size={20} color="black" />
                <Text style={styles.buttonText}>About Us</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        width: '80%',
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MainPage;