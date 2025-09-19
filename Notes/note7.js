import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Note7e = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        const url1 = 'https://siddiq3.github.io/Api/notes7.json';
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
                {renderCard('n7e1', 'n7e1')}
                {renderCard('n7e2', 'n7e2')}
                {renderCard('n7e3', 'n7e3')}
                {renderCard('n7e4', 'n7e4')}
                {renderCard('n7e5', 'n7e5')}
                {renderCard('n7e6', 'n7e6')}
                {renderCard('n7e7', 'n7e7')}
                {renderCard('n7e8', 'n7e8')}
                {renderCard('n7e9', 'n7e9')}
                {renderCard('n7e10', 'n7e10')}
                {renderCard('n7e11', 'n7e11')}
                {renderCard('n7e12', 'n7e12')}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Note7e;
