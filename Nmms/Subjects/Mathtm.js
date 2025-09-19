import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Nmmsmt = ({ navigation }) => {
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
                {renderCard('nmmsmt1', 'nmmsmt1')}
                {renderCard('nmmsmt2', 'nmmsmt2')}
                {renderCard('nmmsmt3', 'nmmsmt3')}
                {renderCard('nmmsmt4', 'nmmsmt4')}
                {renderCard('nmmsmt5', 'nmmsmt5')}
                {renderCard('nmmsmt6', 'nmmsmt6')}
                {renderCard('nmmsmt7', 'nmmsmt7')}
                {renderCard('nmmsmt8', 'nmmsmt8')}
                {renderCard('nmmsmt9', 'nmmsmt9')}
                {renderCard('nmmsmt10', 'nmmsmt10')}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Nmmsmt;
