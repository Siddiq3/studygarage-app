import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Note7t = ({ navigation }) => {
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
                {renderCard('n7t1', 'n7t1')}
                {renderCard('n7t2', 'n7t2')}
                {renderCard('n7t3', 'n7t3')}
                {renderCard('n7t4', 'n7t4')}
                {renderCard('n7t5', 'n7t5')}
                {renderCard('n7t6', 'n7t6')}
                {renderCard('n7t7', 'n7t7')}
                {renderCard('n7t8', 'n7t8')}
                {renderCard('n7t9', 'n7t9')}
                {renderCard('n7t10', 'n7t10')}
                {renderCard('n7t11', 'n7t11')}
                {renderCard('n7t12', 'n7t12')}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Note7t;
