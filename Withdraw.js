import React, { useState, useEffect } from 'react';
import { BackHandler, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WithdrawalFormPage = () => {
    const [formData, setFormData] = useState({
        userName: '',
        phoneNumber: '',
        upiId: '',
        email: '',
    });

    const navigation = useNavigation(); // Get the navigation object

    const handleBackPress = () => {
        Alert.alert(
            'Exit App',
            'Enter Your Details And Click On Submit Button OtherWise Money Will be Not Credited',
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                { text: 'Exit', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
        );
        return true;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            backHandler.remove();
        };
    }, []);

    const handleSubmit = async () => {
        // Implement your form submission logic here
        try {
            const response = await fetch('https://api.way2employee.com/sk0301withdrawal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                Alert.alert('Withdrawal request submitted successfully!');
                // Navigate to the home page after successful submission
                navigation.navigate('10th class'); // 'Home' should be the name of your home page in your navigation stack
            } else {
                Alert.alert('Error submitting withdrawal request');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('An unexpected error occurred');
        }

        // Reset the form
        setFormData({
            userName: '',
            phoneNumber: '',
            upiId: '',
            email: '',
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>Withdrawal Form</Text>
            {/* Your form inputs */}
            <TextInput
                style={styles.input}
                placeholder="User Name"
                value={formData.userName}
                onChangeText={(text) => setFormData({ ...formData, userName: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="UPI ID"
                value={formData.upiId}
                onChangeText={(text) => setFormData({ ...formData, upiId: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            {/* Submit button */}
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
            >
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 45,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 15,
        width: '100%',
        borderRadius: 8,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WithdrawalFormPage;
