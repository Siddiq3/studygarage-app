import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from "react";
import { Card } from "react-native-shadow-cards";

const Nste1 = ({ navigation }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true); // simulate loading

        // You can add BackHandler if needed here
        // const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        //     navigation.goBack();
        //     return true;
        // });

        // return () => backHandler.remove();
    }, []);

    if (!loaded) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const topics = [
        { id: 1, title: '1. పోషణ – ఆహార సరఫరా వ్యవస్థ', route: 'Nt1' },
        { id: 2, title: '2. శ్వాసక్రియ –శక్తి ఉత్పాదక వ్యవస్థ', route: 'Nt2' },
        { id: 3, title: '3. ప్రసరణ –పదార్థ రవాణా వ్యవస్థ', route: 'Nt3' },
        { id: 4, title: '4. విసర్జన –వ్యర్థాల తొలగింపు వ్యవస్థ', route: 'Nt4' },
        { id: 5, title: '5. నియంత్రణ –సమన్వయ వ్యవస్థ', route: 'Nt5' },
        { id: 6, title: '6. ప్రత్యుత్పత్తి –పునరుత్పాదక వ్యవస్థ', route: 'Nt6' },
        { id: 7, title: '7. జీవక్రియలలో సమన్వయం', route: 'Nt7' },
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

export default Nste1;
