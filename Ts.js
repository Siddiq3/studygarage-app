import { 
    ActivityIndicator, 
    BackHandler, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
    Dimensions, 
    Linking 
} from 'react-native';
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { differenceInMilliseconds } from 'date-fns';

const { width, height } = Dimensions.get("window");

const Sscka = ({ navigation }) => {
    const [questions, setQuestions] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    const getQuiz = async () => {
        setIsLoading(true);
        const url1 = 'https://siddiq3.github.io/Api/Tscard.json';

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
            navigation.goBack();
            return true;
        });

        return () => backHandler.remove();
    }, [navigation]);

    useEffect(() => {
        let intervalId;
        if (buttonDisabled) {
            intervalId = setInterval(updateRemainingTime, 1000);
        }
        return () => clearInterval(intervalId);
    }, [buttonDisabled]);

    const openURL = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };

    const saveLastButtonClickTime = async () => {
        try {
            const currentTime = new Date();
            await AsyncStorage.setItem("lastButtonClickTime10ts", currentTime.toString());
        } catch (error) {
            console.error("Error saving last button click time:", error);
        }
    };

    const checkButtonStatus = async () => {
        try {
            const lastClick = await AsyncStorage.getItem("lastButtonClickTime10ts");
            if (lastClick) {
                const timeDifference = differenceInMilliseconds(new Date(), new Date(lastClick));
                const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

                if (timeDifference < oneDayInMilliseconds) {
                    setButtonDisabled(true);
                    setRemainingTime(oneDayInMilliseconds - timeDifference);
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

    const formatRemainingTime = (milliseconds) => {
        const seconds = Math.ceil(milliseconds / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const setButton = () => {
        if (!buttonDisabled) {
            navigation.navigate("Question10ts");
            saveLastButtonClickTime();
            setButtonDisabled(true);
            setRemainingTime(24 * 60 * 60 * 1000);
        }
    };

    const renderButton = (dataKey, onPress) => (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText1}>{decodeURIComponent(questions[dataKey] || '')}</Text>
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
                <Text style={styles.textAboveButtons}>Telangana 10thclass</Text>

                <View style={styles.buttonRow}>
                    {renderButton('tsimp', () => navigation.navigate('tsimp'))}
                    {renderButton('tssm', () => navigation.navigate('tssm'))}
                    {renderButton('tsbp', () => navigation.navigate('tsbp'))}
                </View>

                <View style={styles.buttonRow}>
                    {renderButton('tsplan', () => navigation.navigate('tsplan'))}
                    {renderButton('tsMP', () => navigation.navigate('tstp'))}
                    {renderButton('tsprev', () => navigation.navigate('tsprev'))}
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
                        Today's Quiz Completed! Try again after 24 hours.
                        {"\n"}Remaining Time: {formatRemainingTime(remainingTime)}
                    </Text>
                ) : (
                    <>
                        <Text style={styles.buttonText}>
                            {decodeURIComponent(questions?.t10ts || "")} Quiz
                        </Text>
                        <Text style={styles.subButtonText}>
                            Q. {decodeURIComponent(questions?.t1ts || "")}?
                        </Text>
                        <Text style={styles.subButtonText}>Click here for the answer</Text>
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    innerContainer: {
        backgroundColor: '#ffffff',
        padding: 10,
        shadowColor: '#C7C8CC',
        shadowOffset: { width: 2, height: 2 },
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
        width: width * 0.25,
        height: height * 0.13,
        backgroundColor: '#C7C8CC',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 3,
        shadowColor: '#392467',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.50,
        shadowRadius: 3.84,
        elevation: 10,
    },
    buttonText1: {
        fontSize: 12,
        color: '#000000',
    },
    textAboveButtons: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
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
        marginTop: 10,
        textAlign: 'left',
    },
});

export default Sscka;
