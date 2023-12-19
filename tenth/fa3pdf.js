import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5720822270';
const Fa3pdf = ({ route }) => {
    const { url } = route.params;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    }, [url]);

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: `${url}` }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                renderLoading={renderLoadingIndicator}
                startInLoadingState={true}
                onLoad={() => setLoading(false)}
                onError={(syntheticEvent) => {
                    console.error('WebView error:', syntheticEvent.nativeEvent);
                    setLoading(false);
                }}
            />

            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.MEDIUM_RECTANGLE]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Fa3pdf;
