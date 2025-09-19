import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Nmmssoe = ({ navigation }) => {
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
                {renderCard('nmmssoe1', 'nmmssoe1')}
                {renderCard('nmmssoe2', 'nmmssoe2')}
                {renderCard('nmmssoe3', 'nmmssoe3')}
                {renderCard('nmmssoe4', 'nmmssoe4')}
                {renderCard('nmmssoe5', 'nmmssoe5')}
                {renderCard('nmmssoe6', 'nmmssoe6')}
                {renderCard('nmmssoe7', 'nmmssoe7')}
                {renderCard('nmmssoe8', 'nmmssoe8')}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Nmmssoe;
