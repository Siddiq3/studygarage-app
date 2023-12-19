/*import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, BackHandler, Alert } from 'react-native';

const WithdrawalFormPage = ({ navigation }) => {
    const [formData, setFormData] = useState({
        userName: '',
        phoneNumber: '',
        upiId: '',
        email: '',
    });

    const handleBackPress = () => {
        Alert.alert(
            'Exit App',
            'Do you want to exit the app?',
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                { text: 'Exit', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
        );
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);

    const handleSubmit = async () => {
        // Implement your form submission logic here
        // This is similar to your existing handleSubmit logic
        try {
            const response = await fetch('https://your-api-domain.com/withdrawal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Withdrawal request submitted successfully!');
            } else {
                alert('Error submitting withdrawal request');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred');
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

          
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
            >
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.submitButton}
                onPress={navigation.navigate('10th class')}
            >
                <Text style={styles.submitButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        width: '80%',
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default WithdrawalFormPage;
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, BackHandler, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the necessary navigation hook

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
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
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
                alert('Withdrawal request submitted successfully!');
                // Navigate to the home page after successful submission
                navigation.navigate('10th class'); // 'Home' should be the name of your home page in your navigation stack
            } else {
                alert('Error submitting withdrawal request');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred');
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
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        width: '80%',
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default WithdrawalFormPage;
