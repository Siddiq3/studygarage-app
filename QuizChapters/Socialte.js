import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from "react";
import { Card } from "react-native-shadow-cards";

const Socialte1 = ({ navigation }) => {
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
        { id: 1, title: '1. భారతదేశం: భౌగోళిక స్వరూపాలు', route: 'St1' },
        { id: 2, title: '2. అభివృద్ధి భావనలు', route: 'St2' },
        { id: 3, title: '3. ఉత్పత్తి, ఉపాధి', route: 'St3' },
        { id: 4, title: '4. భారతదేశ శీతోష్ణస్థితి', route: 'St4' },
        { id: 5, title: '5. భారతదేశ నదులు, నీటి వనరులు', route: 'St5' },
        { id: 6, title: '6. ప్రజలు', route: 'St6' },
        { id: 7, title: '7. ప్రజలు – నివాస ప్రాంతాలు', route: 'St7' },
        { id: 8, title: '8. ప్రజలు – వలసలు', route: 'St8' },
        { id: 9, title: '9. రాంపురం : గ్రామ ఆర్థిక వ్యవస్థ', route: 'St9' },
        { id: 10, title: '10. ప్రపంచీకరణ', route: 'St10' },
        { id: 11, title: '11. ఆహార భద్రత', route: 'St11' },
        { id: 12, title: '12. సమానత – సుస్థిర అభివృద్ధి', route: 'St12' },
        { id: 13, title: '13. ప్రపంచ యుద్ధాల మధ్య ప్రపంచం 1900-1950 : భాగం-I, II', route: 'St13' },
        { id: 14, title: '14. భారతదేశం: భౌగోళిక స్వరూపాలు', route: 'St14' },
        { id: 15, title: '15. వలస పాలిత ప్రాంతాలలో జాతి విముక్తి ఉద్యమాలు', route: 'St15' },
        { id: 16, title: '16. భారతదేశ జాతీయోద్యమం-దేశ విభజన, స్వాతంత్య్రం: 1939-1947', route: 'St16' },
        { id: 17, title: '17. స్వతంత్ర భారత రాజ్యాంగ నిర్మాణం', route: 'St17' },
        { id: 18, title: '18. స్వతంత్ర భారతదేశం (1947-1977)', route: 'St18' },
        { id: 19, title: '19. రాజకీయ ధోరణుల ఆవిర్భావం : 1977-2000', route: 'St19' },
        { id: 20, title: '20. ప్రపంచ యుద్దాల తరువాత ప్రపంచం, భారతదేశం', route: 'St20' },
        { id: 21, title: '21. సమకాలీన సామాజిక ఉద్యమాలు', route: 'St21' },
        { id: 22, title: '22. పౌరులు, ప్రభుత్వాలు', route: 'St22' },
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

export default Socialte1;
