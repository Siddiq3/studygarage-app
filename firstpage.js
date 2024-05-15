import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Animated, Alert, Image, Text, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const stateBoards = [
    { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
    { label: 'Telangana', value: 'Telangana' },
    { label: 'Karnataka', value: 'Karnataka' },
];

const classes = [
    { label: '6th', value: '6thClass' },
    { label: '7th', value: '7thClass' },
    { label: '8th', value: '8thClass' },
    { label: '9th', value: '9thClass' },
    { label: '10th', value: '10thClass' },
    { label: 'Inter', value: 'Inter' },
];

const defaultAvatarImage = require('./assets/boy.png'); // Add default avatar image here

const FirstPage = ({ navigation }) => {
    const [stateBoard, setStateBoard] = useState(null);
    const [classValue, setClassValue] = useState(null);
    const [isStateBoardFocus, setIsStateBoardFocus] = useState(false);
    const [isClassFocus, setIsClassFocus] = useState(false);
    const [userName, setUserName] = useState('');
    const [avatar, setAvatar] = useState('boy');
    const [fadeAnim] = useState(new Animated.Value(0));
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);
    useEffect(() => {
        const checkStoredData = async () => {
            try {
                const storedUserName = await AsyncStorage.getItem('userName');
                const storedAvatar = await AsyncStorage.getItem('avatar');
                const storedStateBoard = await AsyncStorage.getItem('stateBoard');
                const storedClassValue = await AsyncStorage.getItem('classValue');

                if (storedUserName && storedAvatar && storedStateBoard && storedClassValue) {
                    // Data found, store in state and navigate to second page
                    setUserName(storedUserName);
                    setAvatar(storedAvatar);
                    setStateBoard(storedStateBoard);
                    setClassValue(storedClassValue);
                    navigation.navigate('SecondPage', {
                        userName: storedUserName,
                        stateBoard: storedStateBoard,
                        classValue: storedClassValue,
                        avatar: storedAvatar,
                    });
                }
            } catch (error) {
                console.error('Error checking stored data:', error);
            } finally {
                setLoading(false); // Set loading to false regardless of the outcome
            }
        };

        checkStoredData();
    }, []);

    useEffect(() => {
        const checkData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData !== null) {
                    navigation.navigate('SecondScreen');
                }
            } catch (error) {
                console.error('Error checking data:', error);
            }
        };

        checkData();
    }, []);

    const handleContinue = async () => {
        if (!userName.trim()) {
            Alert.alert('Name Required', 'Please enter your name.');
            return;
        }

        try {
            await AsyncStorage.setItem('userName', userName);
            await AsyncStorage.setItem('avatar', avatar);
            await AsyncStorage.setItem('stateBoard', stateBoard);
            await AsyncStorage.setItem('classValue', classValue);
            navigation.navigate('SecondPage', {
                userName: userName,
                stateBoard: stateBoard,
                classValue: classValue,
                avatar: avatar
            });
        } catch (error) {
            console.log('Error storing data:', error);
        }
    };

    const handleAvatarSelect = (selectedAvatar) => {
        setAvatar(selectedAvatar);
    };
    return (
        <View style={styles.container}>
            {loading ? ( // Show loading indicator if loading is true
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Image source={avatar === 'girl' ? require('./assets/girl.png') : defaultAvatarImage} style={styles.defaultAvatarImage} />
                    <Text style={styles.selectImageText}>Select Profile Photo</Text>
                    <View style={styles.avatarContainer}>
                        <TouchableOpacity onPress={() => handleAvatarSelect('girl')}>
                            <Image source={require('./assets/girl.png')} style={[styles.avatarImage, avatar === 'girl' && styles.selectedAvatar]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAvatarSelect('boy')}>
                            <Image source={defaultAvatarImage} style={[styles.avatarImage, avatar === 'boy' && styles.selectedAvatar]} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        value={userName}
                        onChangeText={text => setUserName(text)}
                    />
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={stateBoards}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isStateBoardFocus ? 'Select State Board' : '...'}
                        searchPlaceholder="Search..."
                        value={stateBoard}
                        onFocus={() => setIsStateBoardFocus(true)}
                        onBlur={() => setIsStateBoardFocus(false)}
                        onChange={item => {
                            setStateBoard(item.value);
                            setIsStateBoardFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isStateBoardFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={classes}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isClassFocus ? 'Select Class' : '...'}
                        searchPlaceholder="Search..."
                        value={classValue}
                        onFocus={() => setIsClassFocus(true)}
                        onBlur={() => setIsClassFocus(false)}
                        onChange={item => {
                            setClassValue(item.value);
                            setIsClassFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isClassFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                    <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                        <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default FirstPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
    },
    defaultAvatarImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 50,
    },
    selectImageText: {
        fontSize: 24,
        marginBottom: 20,
    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginHorizontal: 20,
    },
    selectedAvatar: {
        borderWidth: 2,
        borderColor: 'blue',
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    dropdown: {
        width: '80%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#999',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#000',
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        paddingHorizontal: 16,
    },
    continueButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    continueText: {
        color: 'white',
        fontSize: 18,
    },
});
