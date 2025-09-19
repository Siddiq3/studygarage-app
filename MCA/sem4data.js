import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import useInterstitialAd from "../InterstitialAdComponent";


const Mcasem4data = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const { showAd } = useInterstitialAd();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://siddiq3.github.io/Api/mcasem4.json');
                const result = await response.json();
                setData(result.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleTitlePress = (url) => {
        showAd();
        navigation.navigate('Mcasem4dataPage', { url });
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => handleTitlePress(item.url)}
            style={styles.titleItem}
            key={`item-${index}`}
        >
            <Text style={styles.titleText}>{item.title}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3498db" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        marginTop: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleItem: {
        marginBottom: 12,
        padding: 12,
        backgroundColor: '#3498db',
        borderRadius: 8,
    },
    titleText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Mcasem4data;
