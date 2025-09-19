import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Hintpts = ({ navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            return true;
        });

        return () => backHandler.remove();
    }, [navigation]);

    const testPapers = [
        { id: 1, screen: 'hindi ts tp1' },
        { id: 2, screen: 'hindi ts tp2' },
        { id: 3, screen: 'hindi ts tp3' },
        { id: 4, screen: 'hindi ts tp4' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                {testPapers.map((paper) => (
                    <Card key={paper.id} style={styles.card}>
                        <TouchableOpacity onPress={() => navigation.navigate(paper.screen)}>
                            <Text style={styles.cardText}>TestPaper-{paper.id}</Text>
                        </TouchableOpacity>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        padding: 20,
        margin: 20,
    },
    cardText: {
        fontSize: 20,
    },
});

export default Hintpts;
