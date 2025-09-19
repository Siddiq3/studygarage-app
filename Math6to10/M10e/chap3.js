import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Chap3e10 = ({ navigation }) => {
    const [questions, setQuestions] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        try {
            const url = 'https://siddiq3.github.io/Api/notes10.json';
            const res = await fetch(url);
            const data = await res.json();
            setQuestions(data.results[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getQuiz();
    }, []);

    const handlePress = (url) => {
        if (url) {
            Linking.openURL(url);
        }
    };

    if (isLoading || !questions) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={{ fontSize: 16 }}>Loading...</Text>
            </View>
        );
    }

    const items = [
        { title: questions.chap3_1e10, url: questions.chap3_1e10u },
        { title: questions.chap3_2e10, url: questions.chap3_2e10u },
        { title: questions.chap3_3e10, url: questions.chap3_3e10u },
        { title: questions.chap3_4e10, url: questions.chap3_4e10u },
        { title: questions.chap3_5e10, url: questions.chap3_5e10u },
        { title: questions.chap3_ex1e10, url: questions.chap3_ex1e10u },
        { title: questions.chap3_ex2e10, url: questions.chap3_ex2e10u },
    ];

    return (
        <ScrollView style={styles.container}>
            {items.map((item, index) => (
                <Card key={index} style={styles.card}>
                    <TouchableOpacity
                        style={styles.touchable}
                        activeOpacity={0.7}
                        onPress={() => handlePress(item.url)}
                    >
                        <Text style={styles.text}>
                            {decodeURIComponent(item.title)}
                        </Text>
                    </TouchableOpacity>
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        marginVertical: 8,
        marginHorizontal: 10,
        padding: 10,
    },
    touchable: {
        padding: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
    },
});

export default Chap3e10;
