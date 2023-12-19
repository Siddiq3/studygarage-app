import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

//import NativeAdComponent from './'; // Import your native ad component
import { InterstitialAd, TestIds, AdEventType, } from 'react-native-google-mobile-ads';

import Native from './Nativeads';


const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/9410155118';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'education', 'games', 'finance'],
});


const Rv3data = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://siddiq3.github.io/Api/10thblue.json');
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


    const [interstitialLoaded, setInterstitialLoaded] = useState(false);


    const loadInterstitial = () => {
        const unsubscribeLoaded = interstitial.addAdEventListener(
            AdEventType.LOADED,
            () => {
                setInterstitialLoaded(true);
            }
        );

        const unsubscribeClosed = interstitial.addAdEventListener(
            AdEventType.CLOSED,
            () => {
                setInterstitialLoaded(false);
                interstitial.load();
            }
        );

        interstitial.load();

        return () => {
            unsubscribeClosed();
            unsubscribeLoaded();
        }
    }
    useEffect(() => {
        const unsubscribeInterstitialEvents = loadInterstitial();

        return () => {
            unsubscribeInterstitialEvents();

        };
    }, [])


    const handleTitlePress = (url) => {
        if (interstitialLoaded) {

            interstitial.show();
            // navigation.navigate('UrlPage', { url });
        }
        navigation.navigate('Rv3Page', { url });
    };

    const renderItem = ({ item, index }) => {
        if ((index + 1) % 4 === 0) {
            // Render Native Ad component here
            return <Native key={`native-${index}`} />;
        }

        return (
            <TouchableOpacity
                onPress={() => handleTitlePress(item.url)}
                style={styles.titleItem}
                key={`item-${index}`}
            >
                <Text style={styles.titleText}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

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
        marginTop: 40
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

export default Rv3data;
