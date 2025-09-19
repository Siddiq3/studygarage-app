import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, addHours, differenceInMilliseconds } from "date-fns";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import useInterstitialAd from "../InterstitialAdComponent";


const { width, height } = Dimensions.get("window");
const buttonWidth = (width * 0.3 - 10) / 3; // Calculate the width of each button based on the container width and desired margin

const Class6 = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const { showAd } = useInterstitialAd();

  const getQuiz = async () => {
    setIsLoading(true);
    const url1 = "https://siddiq3.github.io/Api/Cardapi.json";

    try {
      const res = await fetch(url1);
      const data = await res.json();
      setQuestions(data.results[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();
    checkButtonStatus();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    if (buttonDisabled) {
      const intervalId = setInterval(updateRemainingTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [buttonDisabled]);

  const openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error("An error occurred", err));
  };

  const saveLastButtonClickTime = async () => {
    try {
      const currentTime = new Date();
      await AsyncStorage.setItem("lastButtonClickTime6", currentTime.toString());
    } catch (error) {
      console.error("Error saving last button click time:", error);
    }
  };

  const checkButtonStatus = async () => {
    try {
      const lastButtonClickTime6 = await AsyncStorage.getItem("lastButtonClickTime6");
      if (lastButtonClickTime6) {
        const timeDifference = differenceInMilliseconds(new Date(), new Date(lastButtonClickTime6));
        const fourHoursInMilliseconds = 24 * 60 * 60 * 1000;

        if (timeDifference < fourHoursInMilliseconds) {
          setButtonDisabled(true);
          setRemainingTime(fourHoursInMilliseconds - timeDifference);
        } else {
          setButtonDisabled(false);
        }
      }
    } catch (error) {
      console.error("Error checking button status:", error);
    }
  };

  const updateRemainingTime = () => {
    setRemainingTime((prevTime) => {
      if (prevTime > 1000) {
        return prevTime - 1000;
      } else {
        setButtonDisabled(false);
        return 0;
      }
    });
  };
    const handleNavigate = (screen) => {
      showAd(); // Show interstitial before navigation
      navigation.navigate(screen);
    };

  const formatRemainingTime = (milliseconds) => {
    const seconds = Math.ceil(milliseconds / 1000);
    return `${Math.floor(seconds / 3600)}:${Math.floor((seconds % 3600) / 60)}:${seconds % 60}`;
  };

  const setButton = () => {
    if (!buttonDisabled) {
      handleNavigate("Question6");
      saveLastButtonClickTime();
      setButtonDisabled(true);
      setRemainingTime(24 * 60 * 60 * 1000);
      checkButtonStatus();
    }
  };

  const renderButton = (label, onPress, dataKey) => (
    <TouchableOpacity style={styles.button} onPress={onPress} key={dataKey}>
      <Text style={styles.buttonText1}>{decodeURIComponent(questions[dataKey] || "")}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.textAboveButtons}>AP 6thclass</Text>

        <View style={styles.buttonRow}>
          {renderButton("TB", () => handleNavigate("6thclass tb"), "tb6")}
          {renderButton("Imp", () => handleNavigate("6thclass imp"), "imp6")}
          {renderButton("FA1", () => handleNavigate("6thclass fa1"), "fa16")}
        </View>

        <View style={styles.buttonRow}>
          {renderButton("FA2", () => handleNavigate("6thclass fa2"), "fa26")}
          {renderButton("SA1", () => handleNavigate("6thclass sa1"), "sa16")}
          {renderButton("FA3", () => handleNavigate("6thclass fa3"), "fa36")}
        </View>

        <View style={styles.buttonRow}>
          {renderButton("FA4", () => handleNavigate("7thclass fa4"), "fa47")}
          {renderButton("SA2", () => handleNavigate("7thclass sa2"), "sa27")}
        </View>
      </View>

      <View>
        <Text style={styles.Text}>Today's Quiz Questions</Text>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.quizButton,
          {
            opacity: buttonDisabled ? 0.5 : 1,
            backgroundColor: buttonDisabled ? "#999999" : "#0C2A53",
          },
        ]}
        onPress={setButton}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? (
          <Text style={styles.disabledButtonText}>
            Today's Quiz Completed! To Earn More, Click on the "Earn With Quiz" Button.
            {"\n"}
            Or Try After 24 hours Remaining Time: {formatRemainingTime(remainingTime)}
          </Text>
        ) : (
          <>
            <Text style={styles.buttonText}>{decodeURIComponent(questions?.t7 || "")} Quiz</Text>
            <Text style={styles.subButtonText}>Q. {decodeURIComponent(questions?.q7 || "")}?</Text>
            <Text style={styles.subButtonText}>Click here for the answer</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

// Styles remain the same (no change needed)


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    innerContainer: {
        backgroundColor: '#ffffff', // Example background color
        padding: 10, // Example padding
        shadowColor: '#C7C8CC',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.50,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 20
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        width: width * 0.25, // Adjust button width as needed
        height: height * 0.13,
        backgroundColor: '#C7C8CC',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 3,// Add margin between buttons
        shadowColor: '#392467',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.84,
        elevation: 10,
    },
    buttonText1: {
        fontSize: 12,
        color: '#000000',
    },
    textAboveButtons: {
        marginBottom: 10, // Add spacing between the text and the buttons
        fontSize: 16, // Example font size
        fontWeight: 'bold', // Example font weight
    },
    quizContainer: {
        marginTop: 10,
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    quizButton: {
        marginLeft: 20,
        borderRadius: 20,
        height: responsiveHeight(21.5),
        width: responsiveWidth(90),
        marginTop: 10,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    },
    buttonText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: "bold",
        color: "#ffffff",
    },
    subButtonText: {
        fontSize: responsiveFontSize(2),
        color: "#ffffff",
    },
    disabledButtonText: {
        fontSize: responsiveFontSize(2),
        fontWeight: "400",
        color: "#ffffff",
        textAlign: "center",
        padding: 10,
        backgroundColor: "#0C2A53",
        borderRadius: 10,
        marginTop: 10,
    },
    Text: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        //textAlign: 'center',
        marginTop: 10,
        textAlign: 'left',
        // marginHorizontal: -10

    },

});


export default Class6;
