import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import Native from './Nativeads';


const Mcasem3Pdf = ({ route }) => {
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

            <Native />


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

export default Mcasem3Pdf;
