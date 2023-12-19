



import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuizContext } from './QuizContext';
import { format, addHours, differenceInMilliseconds } from 'date-fns';
import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, RewardedAd, RewardedAdEventType, } from 'react-native-google-mobile-ads';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/7472911313';


const adUnitId2 = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-2818388282601075/7024219131';

const rewarded = RewardedAd.createForAdRequest(adUnitId2, {
    requestNonPersonalizedAdsOnly: true,

});


const TotalScorePage = ({ navigation }) => {


    const [buttonDisabled, setButtonDisabled] = useState(false);
    const { totalScore, updateTotalScore } = useQuizContext();
    const [withdrawClicked, setWithdrawClicked] = useState(false);
    const [withdrawalHistory, setWithdrawalHistory] = useState([]);
    const [remainingTime, setRemainingTime] = useState(0);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        loadWithdrawalHistory();
        checkButtonStatus();
    }, []);
    useEffect(() => {
        if (buttonDisabled) {
            const intervalId = setInterval(() => {
                updateRemainingTime();
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [buttonDisabled]);

    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                // Update the total score by adding 5 coins
                updateTotalScore(+5);
                console.log('User earned reward of ', reward);
            },
        );

        // Start loading the rewarded ad straight away
        rewarded.load();

        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);



    const saveWithdrawalHistory = async (history) => {
        try {
            const jsonHistory = JSON.stringify(history);
            await AsyncStorage.setItem('withdrawalHistory', jsonHistory);
        } catch (error) {
            console.error('Error saving withdrawal history:', error);
        }
    };

    const loadWithdrawalHistory = async () => {
        try {
            const storedHistory = await AsyncStorage.getItem('withdrawalHistory');
            if (storedHistory) {
                setWithdrawalHistory(JSON.parse(storedHistory));
            }
        } catch (error) {
            console.error('Error loading withdrawal history:', error);
        }
    };

    const saveLastButtonClickTime = async () => {
        try {
            const currentTime = new Date();
            await AsyncStorage.setItem('lastButtonClickTime', currentTime.toString());
        } catch (error) {
            console.error('Error saving last button click time:', error);
        }
    };

    const checkButtonStatus = async () => {
        try {
            const lastButtonClickTime = await AsyncStorage.getItem('lastButtonClickTime');
            if (lastButtonClickTime) {
                const timeDifference = differenceInMilliseconds(new Date(), new Date(lastButtonClickTime));
                const fourHoursInMilliseconds = 4 * 60 * 60 * 1000;

                if (timeDifference < fourHoursInMilliseconds) {
                    setButtonDisabled(true);
                    setRemainingTime(fourHoursInMilliseconds - timeDifference);
                } else {
                    setButtonDisabled(false);
                }
            }
        } catch (error) {
            console.error('Error checking button status:', error);
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
        return `${Math.floor(seconds / 3600)}:${Math.floor((seconds % 3600) / 60)}:${seconds % 60}`;
    };



    const handleWithdraw = () => {
        if (totalScore >= 200) {
            updateTotalScore(-200);
            const newWithdrawal = { amount: 10, date: new Date() };
            setWithdrawalHistory([...withdrawalHistory, newWithdrawal]);
            saveWithdrawalHistory([...withdrawalHistory, newWithdrawal]);
            navigation.navigate('WithdrawalFormPage');
        } else {
            alert('Coins are low');
        }
    };

    const handleWithdrawHistory = () => {
        if (withdrawalHistory.length > 0) {
            navigation.navigate('WithdrawalHistoryPage', { withdrawalHistory });
        } else {
            Alert.alert('No Transactions', 'No transactions done yet.', [{ text: 'OK' }]);
        }
    };
    const handleWatchAd = () => {
        if (!buttonDisabled) {
            if (loaded) {
                saveLastButtonClickTime();
                setButtonDisabled(true);
                setRemainingTime(5 * 60 * 60 * 1000);
                rewarded.show();
            } else {
                Alert.alert('Ad Not Loaded', 'Please try again 5 hours later.', [{ text: 'OK' }]);
            }



        };

    }

    const renderWithdrawalItem = ({ item }) => (
        <View style={styles.withdrawalItem}>
            <View style={styles.withdrawalItemContent}>
                <Text style={[styles.withdrawalItemAmount, item.amount === 10 && { color: 'green' }]}>
                    {item.amount}rs/-
                </Text>
                <Text style={styles.withdrawalItemDate}>
                    {format(new Date(item.date), 'MM/dd/yyyy HH:mm:ss')}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.card}>
                    <Text style={styles.totalScoreText}>Total Coins</Text>
                    <Text style={styles.totalScoreText1}> {totalScore}</Text>
                    <Text></Text>
                    <Text style={styles.withdrawalNotes1}>Min Withdrawal :500Coins</Text>
                    <Text style={styles.withdrawalNotes}>500 coins = 10rs/-</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.withdrawButton}
                        onPress={() => {

                            handleWithdraw();
                        }
                        }
                    >
                        <Text style={styles.withdrawButtonText}>Request Withdrawal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.historyButton}
                        onPress={

                            handleWithdrawHistory
                        }

                    >
                        <Text style={styles.historyButtonText}>Withdrawal History</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.EarnButton, buttonDisabled && styles.disabledButton]}
                        onPress={handleWatchAd}
                        disabled={buttonDisabled}
                    >
                        <Text style={styles.remainingTimeText}>
                            {buttonDisabled ? `Remaining Time: ${formatRemainingTime(remainingTime)}` : 'Click To Earn Free Coins'}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.historyButtonText1}>
                        NOTE: After successful withdrawal, money will be credited on the next month's 5th
                    </Text>
                </View>

                {withdrawClicked && withdrawalHistory.length > 0 && (
                    <FlatList
                        data={withdrawalHistory}
                        renderItem={renderWithdrawalItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </ScrollView>
            <View style={styles.bannerContainer}>
                <GAMBannerAd
                    unitId={adUnitId1}
                    sizes={[BannerAdSize.LARGE_BANNER]}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    card: {
        backgroundColor: '#007BFF',
        padding: 20,
        margin: 70,
        borderRadius: 20,
        width: '90%',
        flexDirection: "column",
        //marginBottom: 40,
        marginHorizontal: 25
    },
    totalScoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        // margin: 1
    },
    totalScoreText1: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        // margin: 1
    },
    withdrawButton: {
        backgroundColor: '#C3ACD0',
        padding: 20,
        borderRadius: 10,
        marginTop: -10,
        width: "90%",
        margin: 20
    },
    EarnButton: {
        backgroundColor: '#C3ACD0',
        padding: 20,
        borderRadius: 10,
        marginTop: -5,
        width: "90%",
        margin: 20
    },
    withdrawButtonText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'

    },

    withdrawButtonText2: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'

    },

    historyButton: {
        backgroundColor: '#C3ACD0',
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
        width: "90%",
        margin: 20
    },
    historyButtonText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    historyButtonText1: {
        color: '#000',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    withdrawalItem: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    withdrawalItemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    withdrawalItemAmount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    withdrawalItemDate: {
        fontSize: 20,
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: "space-evenly",
        width: '100%',
    },
    withdrawalNotes: {
        color: '#fff',
        fontSize: 14,

        textAlign: 'left',
        //alignItems: 'flex-end',
        //justifyContent: 'flex-end',
        marginTop: 20,
        marginRight: -30,
        marginHorizontal: -6,
        // paddingBottom: -10
        padding: -10


    },
    withdrawalNotes1: {
        color: '#fff',
        fontSize: 14,

        textAlign: 'left',

        //marginTop: 30,

        // marginHorizontal: 4
        // paddingBottom: -10,
        //marginLeft: -25,
        // paddingTop: "1",
        // marginVertical: -10
        margin: -10,
        padding: -10

    },

    disabledButton: {
        backgroundColor: '#CCCCCC', // Change the color of the disabled button
    },
    remainingTimeText: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold'
    },
    bannerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});

export default TotalScorePage;

