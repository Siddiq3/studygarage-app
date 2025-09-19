import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Chap1e10 = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        const url1 = 'https://siddiq3.github.io/Api/notes10.json';
        const res = await fetch(url1);
        const data = await res.json();
        setQuestions(data.results[0]);
        setIsLoading(false);
    };

    useEffect(() => {
        getQuiz();
    }, []);

    const cards = [
        { key: '1', text: questions?.chap1_1e10, url: questions?.chap1_1e10u },
        { key: '2', text: questions?.chap1_2e10, url: questions?.chap1_2e10u },
        { key: '3', text: questions?.chap1_3e10, url: questions?.chap1_3e10u },
        { key: '4', text: questions?.chap1_4e10, url: questions?.chap1_4e10u },
        { key: '5', text: questions?.chap1_5e10, url: questions?.chap1_5e10u },
        { key: 'ex1', text: questions?.chap1_ex1e10, url: questions?.chap1_ex1e10u },
        { key: 'ex2', text: questions?.chap1_ex2e10, url: questions?.chap1_ex2e10u },
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                {cards.map(item => (
                    <Card key={item.key} style={{ padding: 10, margin: 15 }}>
                        <TouchableOpacity
                            style={{ padding: 10, margin: 15 }}
                            activeOpacity={1}
                            onPress={() => item.url && Linking.openURL(item.url)}
                        >
                            {isLoading ? (
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
                            ) : (
                                <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>
                                    {item.text && decodeURIComponent(item.text)}
                                </Text>
                            )}
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
    },
});

export default Chap1e10;
