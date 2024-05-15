import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuizContext } from './QuizContext';
//import { format, differenceInMilliseconds } from 'date-fns';
import { InterstitialAd, TestIds, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7830179472';

const TotalScorePage = ({ navigation }) => {
    //const [buttonDisabled, setButtonDisabled] = useState(false);
    const { totalScore, updateTotalScore } = useQuizContext();
    const [withdrawalHistory, setWithdrawalHistory] = useState([]);


    useEffect(() => {
        loadWithdrawalHistory();
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack(); // Navigate back when back button is pressed
            return true; // Prevent default behavior
        });

        return () => backHandler.remove();
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



    const handleContinue = async () => {
        try {
            const storedUserName = await AsyncStorage.getItem('userName');
            const storedAvatar = await AsyncStorage.getItem('avatar');
            const storedStateBoard = await AsyncStorage.getItem('stateBoard');
            const storedClassValue = await AsyncStorage.getItem('classValue');

            if (storedUserName && storedAvatar && storedStateBoard && storedClassValue) {
                // Data found, navigate to SecondPage with stored data
                navigation.navigate('SecondPage', {
                    userName: storedUserName,
                    stateBoard: storedStateBoard,
                    classValue: storedClassValue,
                    avatar: storedAvatar,
                });
            } else {
                // Data not found, show an alert
                Alert.alert('Data not found', 'Please fill in all required fields in the FirstPage.');
            }
        } catch (error) {
            console.error('Error checking stored data:', error);
        }
    };





    const handleWithdraw = () => {
        if (totalScore >= 250) {
            updateTotalScore(-250);
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

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.card}>
                    <Text style={styles.totalScoreText}>Total Coins</Text>
                    <Text style={styles.totalScoreText1}> {totalScore}</Text>
                    <Text></Text>
                    <Text style={styles.withdrawalNotes1}>Min Withdrawal :250Coins</Text>
                    <Text style={styles.withdrawalNotes}>250 coins = 10rs/-</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.withdrawButton}
                        onPress={handleWithdraw}
                    >
                        <Text style={styles.withdrawButtonText}>Request Withdrawal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.historyButton}
                        onPress={handleWithdrawHistory}
                    >
                        <Text style={styles.historyButtonText}>Withdrawal History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.historyButton}
                        onPress={handleContinue}
                    >
                        <Text style={styles.historyButtonText}>Go Back</Text>
                    </TouchableOpacity>

                    <Text style={styles.historyButtonText1}>
                        NOTE: After successful withdrawal, money will be credited on the next month's 5th
                    </Text>
                </View>

                {withdrawalHistory.length > 0 && (
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
        marginHorizontal: 25
    },
    totalScoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    totalScoreText1: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    withdrawButton: {
        backgroundColor: '#C3ACD0',
        padding: 20,
        borderRadius: 10,
        marginTop: -10,
        width: "90%",
        margin: 20
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
    withdrawButtonText: {
        color: '#000',
        fontSize: 16,
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
        marginTop: 20,
        marginRight: -30,
        marginHorizontal: -6,
        padding: -10
    },
    withdrawalNotes1: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'left',
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
