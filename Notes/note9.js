import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Note9e = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        const url1 = 'https://siddiq3.github.io/Api/notes9.json';
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
                {renderCard('n9e1', 'n9e1')}
                {renderCard('n9e2', 'n9e2')}
                {renderCard('n9e3', 'n9e3')}
                {renderCard('n9e4', 'n9e4')}
                {renderCard('n9e5', 'n9e5')}
                {renderCard('n9e6', 'n9e6')}
                {renderCard('n9e7', 'n9e7')}
                {renderCard('n9e8', 'n9e8')}
                {renderCard('n9e9', 'n9e9')}
                {renderCard('n9e10', 'n9e10')}
                {renderCard('n9e11', 'n9e11')}
                {renderCard('n9e12', 'n9e12')}
                {renderCard('n9e13', 'n9e13')}
                {renderCard('n9e14', 'n9e14')}
                {renderCard('n9e15', 'n9e15')}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Note9e;
