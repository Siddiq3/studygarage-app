import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const colors = {
    white: '#fff',
    textBlack: '#333',
    borderGray: '#ddd',
};

const SubjectData = ({ route }) => {
    const { stateBoard, classValue } = route.params;
    const [loading, setLoading] = useState(true);
    const [quizData, setQuizData] = useState([]);
    const navigation = useNavigation();

    const apiUrl = `https://api.way2employee.com/quizdata/${stateBoard}/${classValue}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                const data = response.data.results;
                setQuizData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [apiUrl]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (quizData.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.noDataText}>Quiz data is preparing. Please try again later.</Text>
            </View>
        );
    }

    const uniqueSubjects = Array.from(new Set(quizData.map(item => item.subject)));

    const handleSubjectPress = selectedSubject => {
        navigation.navigate('ChapterDetails', { stateBoard, classValue, subject: selectedSubject });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={uniqueSubjects}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.subjectContainer}
                        onPress={() => handleSubjectPress(item)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.itemContent}>
                            <Text style={styles.subjectText}>{item}</Text>
                            <Icon name="angle-right" size={20} color={colors.textBlack} />
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.white,
        marginTop: 25,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subjectContainer: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginTop: 20,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    subjectText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.textBlack,
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.textBlack,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default SubjectData;
