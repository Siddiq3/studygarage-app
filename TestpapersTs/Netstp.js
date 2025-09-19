import { BackHandler, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Netpts = ({ navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            return true;
        });

        return () => backHandler.remove(); // cleanup
    }, [navigation]);

    const testPapers = [
        { id: 1, name: 'TestPaper-1', route: 'nsem ts tp1' },
        { id: 2, name: 'TestPaper-2', route: 'nsem ts tp2' },
        { id: 3, name: 'TestPaper-3', route: 'nsem ts tp3' },
        { id: 4, name: 'TestPaper-4', route: 'nsem ts tp4' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                {testPapers.map((paper) => (
                    <Card key={paper.id} style={styles.card}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate(paper.route)}>
                            <Text style={styles.text}>{paper.name}</Text>
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
        padding: 10,
        margin: 15,
    },
    text: {
        fontSize: 20,
    },
});

export default Netpts;
