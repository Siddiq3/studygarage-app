import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TestIds, AdEventType, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1798268375';
const Equiz = () => {
    const [loading, setLoading] = useState(true);
    const [classDetails, setClassDetails] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.way2employee.com/quiz');
                const quizData = response.data;

                const uniqueClassNames = Array.from(
                    new Set(quizData.results.map((result) => result.class1))
                );

                const extractedClassDetails = uniqueClassNames.map((className) => ({
                    class: className,
                    subject: 'Subject',
                    chapter: 'Chapter',
                }));

                setClassDetails(extractedClassDetails);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const handleClassPress = (selectedClass) => {
        navigation.navigate('ClassDetails', { class1: selectedClass });
    };

    const { width } = Dimensions.get('window');

    return (
        <View style={styles.container}>

            <FlatList

                data={classDetails}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleClassPress(item.class)}
                        style={[styles.itemContainer, { width: width - 32 }]} // Adjusted width for responsiveness
                    >
                        <View style={styles.itemContent}>
                            <Text style={styles.classText}>{item.class}</Text>
                            <Icon name="chevron-right" size={20} color="#333" />
                        </View>
                    </TouchableOpacity>
                )}
            />

            <View style={styles.bannerContainer}>
                <GAMBannerAd
                    unitId={adUnitId1}
                    sizes={[BannerAdSize.LARGE_BANNER]}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        marginTop: 40
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        marginTop: 20,
        //marginBottom: 15,
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    classText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dividerText: {
        fontSize: 14,
        color: '#666',
    },
    bannerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});

export default Equiz;
