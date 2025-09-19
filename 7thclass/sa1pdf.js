import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";


const Sa17pdf = ({ route }) => {
    const { url } = route.params;
    const [loading, setLoading] = useState(true);

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: url }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                renderLoading={renderLoadingIndicator}
                startInLoadingState={true}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />
            <MrecAdComponent/>
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

export default Sa17pdf;
