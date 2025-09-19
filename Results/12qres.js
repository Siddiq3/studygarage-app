import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Title from '../Title';
import MrecAdComponent from "../MrecAdComponent";
import useInterstitialAd from "../InterstitialAdComponent";



const Qres12 = ({ navigation, route }) => {
  const [loaded, setLoaded] = useState(false);
  const { score } = route.params;
  const{showAd} =useInterstitialAd();
  const handleNavigate = (screen) => {
    showAd(); // Show interstitial before navigation
    navigation.navigate(screen);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return null; // or a loader if you want
  }

  const resultBanner =
    score >= 30
      ? "https://cdni.iconscout.com/illustration/premium/thumb/men-celebrating-victory-4587301-3856211.png"
      : "https://cdni.iconscout.com/illustration/free/thumb/concept-about-business-failure-1862195-1580189.png";

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

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate('10th class')}
      >
        <Text style={styles.buttonText}>GO TO HOME</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate('11thToday Answer')}
      >
        <Text style={styles.buttonText}>Click Here for Answers</Text>
      </TouchableOpacity>
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
    paddingTop: 35,
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

export default Qres12;
