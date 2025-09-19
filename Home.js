import { BackHandler, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import BannerAdComponent from "./BannerAd";
import MrecAdComponent from "./MrecAdComponent";
import useInterstitialAd from "./InterstitialAdComponent";

const Home = ({ navigation }) => {
  const { showAd } = useInterstitialAd();

  useEffect(() => {


        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack(); // Navigate back when back button is pressed
            return true; // Prevent default behavior
        });

    }, []);
  

  const handleNavigate = (screen) => {
    showAd(); // Show interstitial before navigation
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ fontSize: 25, textAlign: "center", color: "#D82148" }}>
          Previous Year Question Papers
        </Text>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate("telugu")}>
            <Text style={{ fontSize: 20 }}>TELUGU</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate("hindi")}>
            <Text style={{ fontSize: 20 }}>HINDI</Text>
          </TouchableOpacity>
        </Card>

        <BannerAdComponent />

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate("english")}>
            <Text style={{ fontSize: 20 }}>ENGLISH</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate("maths em")}>
            <Text style={{ fontSize: 20 }}>MATHEMATICS-EM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate("maths tm")}>
            <Text style={{ fontSize: 20 }}>MATHEMATICS-TM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate("biology em")}>
            <Text style={{ fontSize: 20 }}>BIOLOGY-EM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate("biology tm")}>
            <Text style={{ fontSize: 20 }}>BIOLOGY-TM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate("physics em")}>
            <Text style={{ fontSize: 20 }}>PHYSICAL SCIENCE-EM</Text>
          </TouchableOpacity>
        </Card>

        <BannerAdComponent />

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate("physics tm")}>
            <Text style={{ fontSize: 20 }}>PHYSICAL SCIENCE-TM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate("social tm")}>
            <Text style={{ fontSize: 20 }}>SOCIAL-TM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity activeOpacity={1} onPress={() => handleNavigate("social em")}>
            <Text style={{ fontSize: 20 }}>SOCIAL-EM</Text>
          </TouchableOpacity>
        </Card>

        <MrecAdComponent />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffafbd",
  },
});

export default Home;
