import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Dimensions,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TestIds, AdEventType, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/7472911313';
const colors = {
    white: '#fff',
    textBlack: '#333',
    borderGray: '#ddd',
};

const { width } = Dimensions.get('window');

const Subjectq = ({ route }) => {
    const { class1 } = route.params;
    const [subjectDetails, setSubjectDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const apiUrl = `https://api.way2employee.com/quiz/${class1}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                const data = response.data.results;
                setSubjectDetails(data);
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

    const uniqueSubjects = Array.from(new Set(subjectDetails.map((item) => item.subject)));

    const handleSubjectPress = (selectedSubject) => {
        navigation.navigate('ChapterDetails', { class1, subject: selectedSubject });
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
                            <Text style={styles.subjectText} numberOfLines={1} ellipsizeMode="tail">
                                {item}
                            </Text>

                            <Icon name="chevron-right" size={20} color={colors.textBlack} />
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
        backgroundColor: colors.white,
        marginTop: 25
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
    bannerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});

export default Subjectq;
