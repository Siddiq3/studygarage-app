import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Note8e = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        const url1 = 'https://siddiq3.github.io/Api/notes8.json';
        const res = await fetch(url1);
        const data = await res.json();
        setQuestions(data.results[0]);
        setIsLoading(false);
    };

    useEffect(() => {
        getQuiz();
    }, []);

    const renderCard = (key, nav) => (
        <Card style={{ padding: 10, margin: 15 }} key={key}>
            <TouchableOpacity
                style={{ padding: 10, margin: 15 }}
                activeOpacity={1}
                onPress={() => navigation.navigate(nav)}
            >
                {isLoading ? (
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
                ) : (
                    questions && (
                        <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>
                            {decodeURIComponent(questions[key])}
                        </Text>
                    )
                )}
            </TouchableOpacity>
        </Card>
    );

    return (
        <View style={styles.container}>
            <ScrollView horizontal={false}>
                {renderCard('n8e1', 'n8e1')}
                {renderCard('n8e2', 'n8e2')}
                {renderCard('n8e3', 'n8e3')}
                {renderCard('n8e4', 'n8e4')}
                {renderCard('n8e5', 'n8e5')}
                {renderCard('n8e6', 'n8e6')}
                {renderCard('n8e7', 'n8e7')}
                {renderCard('n8e8', 'n8e8')}
                {renderCard('n8e9', 'n8e9')}
                {renderCard('n8e10', 'n8e10')}
                {renderCard('n8e11', 'n8e11')}
                {renderCard('n8e12', 'n8e12')}
                {renderCard('n8e13', 'n8e13')}
                {renderCard('n8e14', 'n8e14')}
                {renderCard('n8e15', 'n8e15')}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Note8e;
