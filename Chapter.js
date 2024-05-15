
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, Dimensions, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ChapterDetails = ({ route }) => {
    const { stateBoard, classValue, subject } = route.params;
    const [chapterDetails, setChapterDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    console.log('Received params:', stateBoard, classValue, subject);
    // Modify the URL to include the subject parameter
    const apiUrl = `https://api.way2employee.com/quizdata/${stateBoard}/${classValue}/${subject}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                const data = response.data.results;
                setChapterDetails(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [apiUrl]);
    useEffect(() => {

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack(); // Navigate back when back button is pressed
            return true; // Prevent default behavior
        });

        return () => backHandler.remove();

    }, []);
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const uniqueChapters = Array.from(new Set(chapterDetails.map(item => item.chapter)));

    const handleChapterPress = (selectedChapter) => {
        navigation.navigate('Quiz', { stateBoard, classValue, subject, chapter: selectedChapter });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleChapterPress(item)}>
            <View style={styles.chapterItem}>
                <Text style={styles.chapterText}>{item}</Text>
                <Icon name="chevron-right" size={20} color="#333" />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={uniqueChapters}
                renderItem={renderItem}
                keyExtractor={(item) => item}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chapterItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        // borderBottomWidth: 1,
        //borderBottomColor: '#ccc',

        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    chapterText: {
        fontSize: Dimensions.get('window').width > 360 ? 16 : 14,
    },
});

export default ChapterDetails;

