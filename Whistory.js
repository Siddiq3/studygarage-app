// WithdrawalHistoryPage.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { format } from 'date-fns';

const WithdrawalHistoryPage = ({ route }) => {
    const withdrawalHistory = route.params.withdrawalHistory || [];

    // Render individual withdrawal item
    const renderWithdrawalItem = ({ item }) => (
        <View style={styles.withdrawalItem}>
            <View style={styles.withdrawalItemContent}>

                <Text style={styles.withdrawalItemDate}>
                    {format(new Date(item.date), 'MM/dd/yyyy ')}
                </Text>
                <Text>           </Text>
                <Text>           </Text>
                <Text>           </Text>
                <Text style={[styles.withdrawalItemAmount, item.amount === 10 && { color: 'green' }]}>
                    +{item.amount}rs/-
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.withdrawalHistoryHeader}>Withdrawal History</Text>
            <Text style={styles.historyButtonText1}>NOTE:After successful withdrawal money will be credited  next month 5th</Text>
            {withdrawalHistory.length > 0 ? (
                <FlatList
                    data={withdrawalHistory}
                    renderItem={renderWithdrawalItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text>No transactions done yet</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: "100%"
    },
    withdrawalHistoryHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    withdrawalItem: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 8,
        marginBottom: 10,
        width: "100%",


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
    historyButtonText1: {
        color: '#000',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default WithdrawalHistoryPage;
