import { BackHandler, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Teltpts = ({ navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            return true;
        });

        return () => backHandler.remove();
    }, [navigation]);

    const testPapers = [
        { id: 1, title: 'TestPaper-1', route: 'telugu ts tp1' },
        { id: 2, title: 'TestPaper-2', route: 'telugu ts tp2' },
        { id: 3, title: 'TestPaper-3', route: 'telugu ts tp3' },
        { id: 4, title: 'TestPaper-4', route: 'telugu ts tp4' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                {testPapers.map(tp => (
                    <Card key={tp.id} style={styles.card}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate(tp.route)}>
                            <Text style={styles.text}>{tp.title}</Text>
                        </TouchableWithoutFeedback>
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
    card: {
        padding: 25,
        margin: 15,
    },
    text: {
        fontSize: 20,
    },
});

export default Teltpts;
