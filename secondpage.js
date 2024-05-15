


import React, { useState, useRef, useEffect, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, DrawerLayoutAndroid, Linking, FlatList, ActivityIndicator, BackHandler } from 'react-native';
import Menu from './Menu';



import { ScrollView } from 'react-native-gesture-handler';

import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon from react-native-vector-icons
import { useQuizContext } from "./QuizContext";
import CoinIcon from "./assets/coin.png";
import {

    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";

import Ts from './Ts';
import Sscka from './10thka';

import Apinter from './apinter';
import Class6 from './Cls6to9/Class6';
import Class7 from './Cls6to9/Class7';
import Class8 from './Cls6to9/Class8';
import Class9 from './Cls6to9/Class9';
import Class9ka from './KA CLASS 6TO9/Class9';
import Class8ka from './KA CLASS 6TO9/Class8';
import Class7ka from './KA CLASS 6TO9/Class7';
import MainPage from './sidemenu';
import Class6ka from './KA CLASS 6TO9/Class6';





const SecondPage = ({ route, navigation }) => {

    const { totalScore } = useQuizContext();
    const { userName, stateBoard, classValue, avatar } = route.params;
    const drawerRef = useRef(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [quizData, setQuizData] = useState([]);
    const [expandedCard, setExpandedCard] = useState(false);
    const [renderedComponent, setRenderedComponent] = useState(null);

    // Define a lookup table to map conditions to components
    const componentLookup = {
        'Andhra Pradesh-10thClass': <Menu navigation={navigation} />,
        'Andhra Pradesh-6thClass': <Class6 navigation={navigation} />,
        'Andhra Pradesh-7thClass': <Class7 navigation={navigation} />,
        'Andhra Pradesh-8thClass': <Class8 navigation={navigation} />,
        'Andhra Pradesh-9thClass': <Class9 navigation={navigation} />,
        'Andhra Pradesh-Inter': <Apinter navigation={navigation} />,

        'Telangana-10thClass': <Ts navigation={navigation} />,
        'Karnataka-10thClass': <Sscka navigation={navigation} />,
        'Karnataka-9thClass': <Class9ka navigation={navigation} />,
        'Karnataka-8thClass': <Class8ka navigation={navigation} />,
        'Karnataka-7thClass': <Class7ka navigation={navigation} />,
        'Karnataka-6thClass': <Class6ka navigation={navigation} />

        // Add more conditions as needed
    };

    // Generate a key for the lookup table based on stateBoard and classValue
    const lookupKey = `${stateBoard}-${classValue}`;
    const ComponentToRender = componentLookup[lookupKey];
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.way2employee.com/quizdata/${stateBoard}/${classValue}`);

            // Extract the unique names from the response
            const uniqueNames = new Set();
            const uniqueData = response.data.results.filter(item => {
                if (!uniqueNames.has(item.name)) {
                    uniqueNames.add(item.name);
                    return true;
                }
                return false;
            });

            setQuizData(uniqueData);
            setLoading(false);
            setRenderedComponent(renderComponent());
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
            // Handle the error here
        }
    };
    const [isSecondPage, setIsSecondPage] = useState(true);

    useEffect(() => {
        const backAction = () => {
            // Check if the user is on the second page or quiz data page
            if (isSecondPage) {
                BackHandler.exitApp(); // Close the app only when on the second page
                return true;
            } else if (navigation.canGoBack()) {
                // Check if there's a previous screen to navigate back to
                navigation.goBack(); // Navigate back to the previous screen
                return true;
            } else {
                return false; // Allow default behavior if no previous screen to navigate back to
            }
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [isSecondPage, navigation]);

    // Function to open URLs
    const openWhatsApp = () => {
        Linking.openURL('https://whatsapp.com/channel/0029VaAYOji89inaJs4Jhq3U');
    };

    const openInstagram = () => {
        Linking.openURL('https://www.instagram.com/siddiqkolimi');
    };

    const openYouTube = () => {
        Linking.openURL('https://www.youtube.com/@StudyGarage03');
    };

    const openLinkedIn = () => {
        Linking.openURL('https://www.linkedin.com/in/siddiq-kolimi-a371a9192/');
    };
    const toggleExpandCard = () => {
        setExpandedCard(!expandedCard);
    };
    const openTelegram = () => {
        Linking.openURL('https://t.me/studygarageapp');
    };

    const renderQuizItem = ({ item, index }) => {
        if (!expandedCard && index > 0) {
            return null; // Only render the first item when the card is not expanded
        }
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ChapterDetails', { stateBoard, classValue, subject: item.subject })}>
                <View style={styles.quizItem}>
                    <Text style={styles.quizText}>{item.subject}</Text>
                </View>
            </TouchableOpacity>
        );
    };



    const renderComponent = () => {
        const componentLookup = {
            'Andhra Pradesh-10': <Menu />,
            'Andhra Pradesh-6thClass': <Class6 navigation={navigation} />,
            'Andhra Pradesh-7thClass': <Class7 navigation={navigation} />,
            'Andhra Pradesh-8thClass': <Class8 navigation={navigation} />,
            'Andhra Pradesh-9thClass': <Class9 navigation={navigation} />,
            'Andhra Pradesh-Inter': <Apinter navigation={navigation} />,

            'Telangana-10thClass': <Ts navigation={navigation} />,
            'Karnataka-10thClass': <Sscka navigation={navigation} />,
            'Karnataka-9thClass': <Class9ka navigation={navigation} />,
            'Karnataka-8thClass': <Class8ka navigation={navigation} />,
            'Karnataka-7thClass': <Class7ka navigation={navigation} />,
            'Karnataka-6thClass': <Class6ka navigation={navigation} />
        };

        const lookupKey = `${stateBoard}-${classValue}`;
        return componentLookup[lookupKey];
    };

    return (
        <DrawerLayoutAndroid
            ref={drawerRef}
            drawerWidth={250}
            drawerPosition="left"
            drawerLockMode={drawerOpen ? 'unlocked' : 'locked-closed'}
            renderNavigationView={() => (
                <View>
                    <MainPage
                        closeDrawer={() => {
                            drawerRef.current.closeDrawer();
                            setDrawerOpen(false);
                        }}
                    />
                </View>
            )}
        >
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.header} />

                    <View style={styles.pageComponentContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                drawerRef.current.openDrawer();
                                setDrawerOpen(true);
                            }}
                        >
                            <View style={styles.header1}>
                                <Image source={avatar === 'girl' ? require('./assets/girl.png') : require('./assets/boy.png')} style={styles.avatarImage} />
                                <Text style={styles.welcomeText}>Hello</Text>
                                <Text style={[styles.userName, { color: 'black' }]}>{userName}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("TotalScorePage")} style={styles.scoreContainer}>
                            <Text style={styles.coinText}>
                                <Image source={CoinIcon} style={styles.coinIcon} /> {totalScore}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.buttonText}>{stateBoard} | {classValue}</Text>
                        </TouchableOpacity>


                        <Text style={styles.aboveCardText}> QUIZ ZONE</Text>
                        <View style={styles.cardContainer}>
                            {loading ? (
                                <ActivityIndicator size="large" color="#0000ff" />
                            ) : quizData.length === 0 ? (
                                <View style={styles.noDataContainer}>
                                    <Text style={styles.noDataText}>Quiz not found :(</Text>
                                </View>
                            ) : (
                                <>
                                    <FlatList
                                        data={quizData}
                                        renderItem={renderQuizItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        extraData={expandedCard}
                                    />
                                    {quizData.length > 1 && (
                                        <TouchableOpacity onPress={toggleExpandCard}>
                                            <Icon name={expandedCard ? 'chevron-up' : 'chevron-down'} size={30} color="black" style={styles.expandIcon} />
                                        </TouchableOpacity>
                                    )}
                                </>
                            )}
                        </View>




                        <View style={styles.centeredContent}>
                            {ComponentToRender || <Text style={styles.noDataText}>data not found :(</Text>}
                        </View>

                        {/* Social media icons */}
                        <View>
                            <Text style={styles.followUsText}>Follow Us</Text>
                        </View>
                        <View style={styles.footerContainer}>

                            <TouchableOpacity onPress={openWhatsApp}>
                                <Icon name="whatsapp" size={30} color="#25D366" style={styles.socialMediaIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openInstagram}>
                                <Icon name="instagram" size={30} color="#E4405F" style={styles.socialMediaIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openYouTube}>
                                <Icon name="youtube" size={30} color="#FF0000" style={styles.socialMediaIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openLinkedIn}>
                                <Icon name="linkedin" size={30} color="#0077B5" style={styles.socialMediaIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openTelegram}>
                                <Icon name="telegram" size={30} color="#0088cc" style={styles.socialMediaIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        alignItems: 'center', // Align button in the center
        paddingTop: 20,
    },
    button: {
        backgroundColor: '#40679E',
        paddingVertical: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#fff', // White color for button text
        fontSize: 20,
        fontWeight: 'bold',
    },

    header1: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 1, // Display children side by side
    },
    welcomeText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: 'red',
        marginRight: 5, // Add a small margin between the avatar and "Hello"
    },
    userName: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        // marginLeft: 5,
    },
    learnEarnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 30,
        marginLeft: 25,
        marginTop: 5, // Adjust the marginTop to reduce space between header and learnEarnContainer
    },
    learnText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: 'blue',
        paddingHorizontal: 30,
        marginLeft: 25,

    },

    quizText: {
        fontSize: responsiveFontSize(2.5),
    },
    earnButton: {
        borderRadius: 10,
        marginVertical: 10,
        padding: 20,
        backgroundColor: '#40679E',
        alignItems: 'center',
    },
    earnButtonText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: '#ffffff',
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: 50,
        height: 50,
        borderRadius: 10, // Adjust the border radius to make it square
        marginRight: 10,
        borderWidth: 2, // Add border width
        borderColor: '#000', // Add border color
        backgroundColor: '#ccc', // Add background color

    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        //alignItems: 'center',
        // backgroundColor: '#FFF', // Set background color for the footer
        paddingVertical: 10,
        // borderTopWidth: 1,
        // borderTopColor: '#ccc',
    },

    socialMediaIcon: {
        marginHorizontal: 10,
    },
    followUsText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },

    noDataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    noDataText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    cardContainer: {
        backgroundColor: '#fff', // Change background color to white
        borderRadius: 20,
        elevation: 3,
        shadowColor: '#FF3EA5',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        //marginHorizontal: 20,
        marginVertical: 25,
        padding: 10,
        //marginLeft: 50, // Adjust the margin to cut some part of the card on the arrow button side
    },


    pageComponentContainer: {
        flex: 1,
        backgroundColor: '#FFF7F1',
        padding: 20,
    },
    quizItem: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#FF3EA5',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 5,
        //justifyContent: 'center', // Align content vertically in the center
        alignItems: 'center', // Align content horizontally in the center
    },
    quizText: {
        fontSize: 18,
    },
    expandIconContainer: {
        flex: 1,
        alignItems: 'center',
    },
    expandIcon: {
        alignSelf: 'center',
    },
    aboveCardText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        // textAlign: 'center',
        marginBottom: -15, // Adjust as needed

    },
    followUsText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        //textAlign: 'center',
        marginTop: 4,
    },
    noDataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDataText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff', // Background color for the "Quiz not found" text
    },


    scoreContainer: {
        position: 'absolute',
        top: 20,
        right: 0,
        alignItems: 'center',
        flexDirection: 'row',
        // Adjust paddingRight to create space between username and coin image
        paddingRight: responsiveWidth(5), // Adjust as needed
    },
    coinText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 'bold',
        color: '#000000',
    },
    coinIcon: {
        width: responsiveFontSize(4.5),
        height: responsiveFontSize(4.5),
        marginRight: 5,
    },

});

export default SecondPage;
