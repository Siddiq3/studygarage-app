import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from "react";
import { Card } from "react-native-shadow-cards";

const Phyequiz = ({ navigation }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true); // simulate loading
    }, []);

    if (!loaded) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const topics = [
        { id: 1, title: '1. Heat', route: 'Pe1' },
        { id: 2, title: 'Acids, Bases and Salts', route: 'Pe2' },
        { id: 3, title: 'Refraction of Light at Plane Surfaces', route: 'Pe3' },
        { id: 4, title: 'Refraction of Light at Curved Surfaces', route: 'Pe4' },
        { id: 5, title: 'Human Eye and Colourful World', route: 'Pe5' },
        { id: 6, title: 'Structure of Atom', route: 'Pe6' },
        { id: 7, title: 'Classification of Elements- The Periodic Table', route: 'Pe7' },
        { id: 8, title: 'Chemical Bonding', route: 'Pe8' },
        { id: 9, title: 'Electric Current', route: 'Pe9' },
        { id: 10, title: 'Electromagnetism', route: 'Pe10' },
        { id: 11, title: 'Principles of Metallurgy', route: 'Pe11' },
        { id: 12, title: 'Carbon and its Compounds', route: 'Pe12' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                {topics.map(topic => (
                    <Card key={topic.id} style={styles.card}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate(topic.route)}>
                            <Text style={styles.text}>{topic.title}</Text>
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
        backgroundColor: '#F7F3E9',
    },
    card: {
        padding: 30,
        margin: 20,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
});

export default Phyequiz;
