import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator, Dimensions, BackHandler } from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
const { width, height } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, addHours, differenceInMilliseconds } from 'date-fns';
const buttonWidth = (width * 0.3 - 10) / 3; // Calculate the width of each button based on the container width and desired margin
const Class7 = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const getQuiz = async () => {
        setIsLoading(true);
        const url1 = 'https://siddiq3.github.io/Api/Cardapi.json';

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
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack(); // Navigate back when back button is pressed
            return true; // Prevent default behavior
        });

        return () => backHandler.remove();
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
            await AsyncStorage.setItem("lastButtonClickTime7", currentTime.toString());
        } catch (error) {
            console.error("Error saving last button click time:", error);
        }
    };

    // Function to check the status of the button based on the last click time
    const checkButtonStatus = async () => {
        try {
            const lastButtonClickTime7 = await AsyncStorage.getItem("lastButtonClickTime7");
            if (lastButtonClickTime7) {
                const timeDifference = differenceInMilliseconds(new Date(), new Date(lastButtonClickTime7));
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
            navigation.navigate("Question7");

            saveLastButtonClickTime();
            setButtonDisabled(true);
            setRemainingTime(24 * 60 * 60 * 1000);
            checkButtonStatus();
        }
    };


    const renderButton = (label, onPress, dataKey) => (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText1}>{decodeURIComponent(questions[dataKey])}</Text>
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
            {/* Main container */}

            <View style={styles.innerContainer}>
                <Text style={styles.textAboveButtons}>AP 7thclass</Text>

                {/* Second row */}
                <View style={styles.buttonRow}>
                    {/* Add more buttons here */}
                    {renderButton('TB', () => navigation.navigate('7thclass tb'), 'tb7')}
                    {renderButton('Imp', () => navigation.navigate('7thclass imp'), 'imp7')}
                    {renderButton('FA1', () => navigation.navigate('7thclass fa1'), 'fa17')}
                </View>
                {/* Third row */}
                <View style={styles.buttonRow}>
                    {renderButton('FA2', () => navigation.navigate('7thclass fa2'), 'fa27')}
                    {renderButton('SA1', () => navigation.navigate('7thclass sa1'), 'sa17')}
                    {renderButton('FA3', () => navigation.navigate('7thclass fa3'), 'fa37')}
                </View>

                <View style={styles.buttonRow}>
                    {renderButton('FA4', () => navigation.navigate('7thclass fa4'), 'fa47')}
                    {renderButton('SA2', () => navigation.navigate('7thclass sa2'), 'sa27')}
                    {/* Add more buttons as needed */}
                </View>




            </View>
            <View>
                <Text style={styles.Text}>Today's Quiz  Questions</Text>
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
                        {isLoading ? (
                            <Text style={styles.buttonText}>Loading...</Text>
                        ) : (
                            <>
                                <Text style={styles.buttonText}>
                                    {decodeURIComponent(questions?.t7 || '')} Quiz
                                </Text>
                                <Text style={styles.subButtonText}>
                                    Q. {decodeURIComponent(questions?.q7 || '')}?
                                </Text>
                            </>
                        )}

                        <Text style={styles.subButtonText}>
                            Click here for the answer
                        </Text>
                    </>
                )}
            </TouchableOpacity>
        </View>


    );
};

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

export default Class7;

