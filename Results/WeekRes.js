import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Title from '../Title';
import MrecAdComponent from "../MrecAdComponent";
import useInterstitialAd from "../InterstitialAdComponent";


const WeekResult = ({ navigation, route }) => {
    const [loaded, setLoaded] = useState(false);
    const {showAd}=useInterstitialAd();
    const handleNavigate = (screen) => {
    showAd(); // Show interstitial before navigation
    navigation.navigate(screen);
  };

    useEffect(() => {
        setLoaded(true);
    }, []);

    // Access score safely from route.params
    const { score } = route.params;

    // Choose banner based on score
    const resultBanner =
        score >= 60
            ? "https://cdni.iconscout.com/illustration/premium/thumb/men-celebrating-victory-4587301-3856211.png"
            : "https://cdni.iconscout.com/illustration/free/thumb/concept-about-business-failure-1862195-1580189.png";

    if (!loaded) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Title titleText="RESULTS" />
            <Text style={styles.scoreValue}>{score}</Text>

            <View style={styles.bannerContainer}>
                <Image
                    source={{ uri: resultBanner }}
                    style={styles.banner}
                    resizeMode="contain"
                />
            </View>

            <TouchableWithoutFeedback onPress={() => handleNavigate('10th class')}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>GO TO HOME</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => handleNavigate('Weekly Answer')}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Click Here for Answers</Text>
                </View>
            </TouchableWithoutFeedback>
            <MrecAdComponent/>
        </View>
    );
};

const styles = StyleSheet.create({
    banner: {
        height: 300,
        width: 300,
    },
    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%',
    },
    button: {
        width: '100%',
        backgroundColor: '#1A759F',
        padding: 20,
        borderRadius: 22,
        alignItems: 'center',
        marginBottom: 40,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ED4264',
        textAlign: 'center',
    },
    scoreValue: {
        fontSize: 24,
        fontWeight: '800',
        alignSelf: 'center',
    },
});

export default WeekResult;
