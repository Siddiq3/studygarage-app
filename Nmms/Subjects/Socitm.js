import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Nmmssot = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        try {
            const url1 = 'https://siddiq3.github.io/Api/nmms.json';
            const res = await fetch(url1);
            const data = await res.json();
            setQuestions(data.results[0]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getQuiz();
    }, []);

    const renderCard = (questionKey, screen) => (
        <Card style={{ padding: 10, margin: 15 }}>
            <TouchableOpacity
                style={{ padding: 10, margin: 15 }}
                activeOpacity={1}
                onPress={() => navigation.navigate(screen)}
            >
                {isLoading ? (
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
                ) : (
                    questions && (
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>
                            {decodeURIComponent(questions[questionKey])}
                        </Text>
                    )
                )}
            </TouchableOpacity>
        </Card>
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                {renderCard('nmmssot1', 'nmmssot1')}
                {renderCard('nmmssot2', 'nmmssot2')}
                {renderCard('nmmssot3', 'nmmssot3')}
                {renderCard('nmmssot4', 'nmmssot4')}
                {renderCard('nmmssot5', 'nmmssot5')}
                {renderCard('nmmssot6', 'nmmssot6')}
                {renderCard('nmmssot7', 'nmmssot7')}
                {renderCard('nmmssot8', 'nmmssot8')}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Nmmssot;
