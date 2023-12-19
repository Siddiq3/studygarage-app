import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Linking,
    Image,
    FlatList
} from "react-native";
import { Card } from "react-native-shadow-cards";
import Icon from 'react-native-vector-icons/FontAwesome'; // WhatsApp and FontAwesome icons
import Icon5 from 'react-native-vector-icons/FontAwesome5'; // FontAwesome5 icons
import { useQuizContext } from "./QuizContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import CoinIcon from "./assets/coin.png";
import Typewriter from "react-native-typewriter";
// Define the functional component ApTs
const ApTs = ({ navigation }) => {
    // Hook for accessing totalScore from QuizContext
    const { totalScore } = useQuizContext();

    // States for quiz data, loading status, button disabled status, and remaining time
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    // Function to fetch quiz data
    const getQuiz = async () => {
        setIsLoading(true);
        const url1 = "https://siddiq3.github.io/Api/Cardapi.json";
        const res = await fetch(url1);
        const data = await res.json();

        setQuestions(data.results[0]);
        setIsLoading(false);
    };

    // Initial fetch and button status check
    useEffect(() => {
        getQuiz();
        checkButtonStatus();
    }, []);

    // Effect for updating remaining time and clearing interval
    useEffect(() => {
        if (buttonDisabled) {
            const intervalId = setInterval(() => {
                updateRemainingTime();
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [buttonDisabled]);
    const openURL = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };
    // Function to save the last button click time
    const saveLastButtonClickTime = async () => {
        try {
            const currentTime = new Date();
            await AsyncStorage.setItem("lastButtonClickTime1", currentTime.toString());
        } catch (error) {
            console.error("Error saving last button click time:", error);
        }
    };

    // Function to check the status of the button based on the last click time
    const checkButtonStatus = async () => {
        try {
            const lastButtonClickTime1 = await AsyncStorage.getItem("lastButtonClickTime1");
            if (lastButtonClickTime1) {
                const timeDifference = differenceInMilliseconds(new Date(), new Date(lastButtonClickTime1));
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



    // Function to update remaining time
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

    // Function to format remaining time in HH:MM:SS format
    const formatRemainingTime = (milliseconds) => {
        const seconds = Math.ceil(milliseconds / 1000);
        return `${Math.floor(seconds / 3600)}:${Math.floor((seconds % 3600) / 60)}:${seconds % 60}`;
    };

    // Function to handle button click
    const setButton = () => {
        if (!buttonDisabled) {
            navigation.navigate("Question");
            saveLastButtonClickTime();
            setButtonDisabled(true);
            setRemainingTime(24 * 60 * 60 * 1000);
            checkButtonStatus();
        }
    };

    const [animatedText, setAnimatedText] = useState("");
    const studyGarageText = "Study Garage";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setAnimatedText((prevText) => prevText + studyGarageText[index]);
            index++;

            if (index === studyGarageText.length) {
                clearInterval(interval);

                // After "Study Garage" is displayed, update the text to "Earn With Learn"
                setTimeout(() => {
                    setAnimatedText("");
                    const earnWithLearnText = "Earn With Learn";
                    let earnWithLearnIndex = 0;
                    const earnWithLearnInterval = setInterval(() => {
                        setAnimatedText((prevText) => prevText + earnWithLearnText[earnWithLearnIndex]);
                        earnWithLearnIndex++;

                        if (earnWithLearnIndex === earnWithLearnText.length) {
                            clearInterval(earnWithLearnInterval);
                        }
                    }, 100);
                }, 1000); // Adjust the delay as needed
            }
        }, 100); // Adjust the interval as needed
    }, []);
    // Return the JSX structure
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerText}>{animatedText}</Text>
                        <View style={styles.coinContainer}>

                            <Text style={styles.coinText}>
                                <Image source={CoinIcon} style={styles.coinIcon} /> {totalScore}

                            </Text>

                        </View>
                    </View>

                </View>


                {/* Quiz Section */}
                <ScrollView horizontal={true} style={styles.quizContainer}>
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
                                {isLoading ? (
                                    <Text style={styles.buttonText}>Loading...</Text>
                                ) : (
                                    <>
                                        <Text style={styles.buttonText}>
                                            {decodeURIComponent(questions?.t10 || "")} Quiz
                                        </Text>
                                        <Text style={styles.subButtonText}>
                                            Q. {decodeURIComponent(questions?.t1 || "")}?
                                        </Text>
                                    </>
                                )}

                                <Text style={styles.subButtonText}>
                                    Click here for the answer
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity
                    style={{
                        borderRadius: 30,
                        margin: 10,
                        padding: 20,
                        backgroundColor: '#3498db',
                    }}
                    onPress={() => {
                        // Navigate to the new page here
                        navigation.navigate('equiz');
                    }}
                >
                    <Text
                        style={{
                            fontSize: responsiveFontSize(3),
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: '#ffffff', // Set the text color as needed
                        }}
                    >
                        💸 Earn With Quiz
                    </Text>
                </TouchableOpacity>
                {/* Newly added View components */}
                <View>
                    <ScrollView horizontal={true}>
                        {/* Code for the first row of images */}
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate("apssc")}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/ap.png")}
                            />
                        </TouchableOpacity>
                        {/* Add similar TouchableOpacity components for other images */}
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate("tsssc")}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/ts.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate("polycet1")}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/poly.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate("Class9")}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/9th.png")}
                            />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View>
                    <ScrollView horizontal={true}>
                        {/* Code for the second row of images */}
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate("Class8")}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/8th.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate("Class7")}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/7th.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate("Class6")}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/6th.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate("nmms")}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/nmms.png")}
                            />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View>
                    <ScrollView horizontal={true}>
                        {/* Code for the third row of images */}
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate("interimp1")}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/1st iq.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                                marginTop: 5,
                            }}
                            onPress={() => navigation.navigate("interprev1")}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/1st pp.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate("emcet11")}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/1stem.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => Linking.openURL(`https://www.youtube.com/@StudyGarage03`)}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/youtube.png")}
                            />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View>
                    <ScrollView horizontal={true}>
                        {/* Code for the fourth row of images */}
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate("interimp2")}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/2nd iq.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate("interprev2")}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/2nd pp.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate("emcet12")}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/2ndem.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: responsiveWidth(20),
                                height: responsiveWidth(20),
                                backgroundColor: "#e5e5e5",
                                marginTop: 5,
                                borderRadius: responsiveWidth(10),
                                margin: 10,
                            }}
                            onPress={() => Linking.openURL(`${questions.telegram}`)}
                        >
                            <Image
                                style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5 }}
                                source={require("./assets/telegram.png")}
                            />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

            </ScrollView>
            <View style={styles.container1}>
                <Text style={styles.followUsText}>FOLLOW US ON</Text>

                <View style={styles.iconRow}>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => openURL('https://api.whatsapp.com/send?phone=123456789')}
                    >
                        <Icon name="whatsapp" size={30} color="#25D366" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => openURL('https://www.instagram.com/your-instagram-account')}
                    >
                        <Icon name="instagram" size={30} color="#E4405F" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => openURL('https://www.linkedin.com/in/your-linkedin-profile')}
                    >
                        <Icon name="linkedin" size={30} color="#0077B5" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => openURL('https://www.youtube.com/channel/your-channel')}
                    >
                        <Icon name="youtube" size={30} color="#FF0000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => openURL('https://t.me/your-telegram-channel')}
                    >
                        <Icon5 name="telegram" size={30} color="#0088cc" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
};

// Styles for the components
const styles = StyleSheet.create({
    container: {
        flex: 1

    },



    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 25,
        backgroundColor: "#3b5998",
        alignItems: "center",
        borderRadius: 15,
        marginTop: 1
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Adjusted to evenly space the two child views
        flex: 1, // Takes up all available horizontal space

    },
    headerText: {
        fontSize: responsiveFontSize(3),
        fontWeight: "bold",
        marginRight: 10,
        color: "white",
        alignSelf: "flex-start", // Align the text to the start (flex-start)
    },
    coinContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end", // Align the container to the end (flex-end)

    },
    coinText: {
        textAlign: "center",
        fontSize: responsiveFontSize(3),
        fontWeight: "bold",
        color: "#ffffff",
    },
    coinIcon: {
        width: responsiveFontSize(4.5),
        height: responsiveFontSize(4.5),
        marginEnd: 5,
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
        marginTop: 5,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
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
    // Add styles for other sections and buttons
    container1: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80, // Adjust the height as needed
        backgroundColor: '#fff', // Set background color as needed
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    followUsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333', // Set the color as needed
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Distribute icons evenly
        alignItems: 'center',
        marginTop: 10, // Adjust the margin as needed

    },
    iconContainer: {
        alignItems: 'center',
        marginHorizontal: 20, // Adjust the space between icons as needed
        justifyContent: 'space-around'
    },
});

// Export the component as the default export
export default ApTs;