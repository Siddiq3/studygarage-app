import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Share, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import PremiumToggle from './src/components/premium/PremiumToggle';
import usePremiumSettings from './src/hooks/usePremiumSettings';
import { LAST_SELECTED_RATING_KEY } from './src/hooks/useReviewPrompt';

const MainPage = ({ closeDrawer, onAvatarUpdated }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isPickingImage, setIsPickingImage] = useState(false);
    const [lastRatedStars, setLastRatedStars] = useState(0);
    const navigation = useNavigation();
    const {
        settings,
        setHapticsEnabled,
        setReduceMotionOverride,
    } = usePremiumSettings();

    const getQuiz = async () => {
        setIsLoading(true);
        const url1 = 'https://siddiq3.github.io/Api/Cardapi.json';
        const res = await fetch(url1);
        const data = await res.json();

        setQuestions(data.results[0]);
        setIsLoading(false);
    };


    // Initial fetch and button status check
    useEffect(() => {
        getQuiz();

    }, []);

    useEffect(() => {
        let mounted = true;
        const hydrateRating = async () => {
            try {
                const storedRating = await AsyncStorage.getItem(LAST_SELECTED_RATING_KEY);
                if (!mounted) return;
                const parsed = Number(storedRating || 0);
                setLastRatedStars(Number.isFinite(parsed) ? Math.max(0, Math.min(5, parsed)) : 0);
            } catch (_error) {
                if (!mounted) return;
                setLastRatedStars(0);
            }
        };
        hydrateRating().catch(() => {});
        return () => {
            mounted = false;
        };
    }, []);

    const handleRateUs = () => {
        const storeUrl = Platform.select({

            android: 'https://play.google.com/store/apps/details?id=siddiqkolimidev.tenth_app',
        });

        Linking.openURL(storeUrl)
            .then(() => {
                console.log('Opened store page for rating.');
            })
            .catch((err) => {
                console.error('Error opening store page:', err);
            });
    };

    const handleShareApp = async () => {
        try {
            const result = await Share.share({
                message: 'Check out this amazing 👌 app usefull to all students : https://play.google.com/store/apps/details?id=siddiqkolimidev.tenth_app',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared via:', result.activityType);
                } else {
                    console.log('Shared');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share cancelled');
            }
        } catch (error) {
            console.error('Error sharing app:', error.message);
        }
    };


    const handleAboutUs = () => {
        Linking.openURL(`${questions.aboutus}`);
        console.log('About Us');
    };

    const handleChangeClass = () => {
        closeDrawer?.(false);
        setTimeout(() => {
            navigation.navigate('FirstPage', { editProfile: true });
        }, 140);
    };

    const handleChangeProfilePhoto = async () => {
        if (isPickingImage) return;

        setIsPickingImage(true);
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                Alert.alert('Permission needed', 'Please allow photo access to update your profile picture.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.85,
            });

            if (result.canceled || !result.assets?.length) {
                return;
            }

            const selectedUri = result.assets[0]?.uri;
            if (!selectedUri) return;

            await AsyncStorage.setItem('avatar', selectedUri);
            onAvatarUpdated?.(selectedUri);
            navigation.setParams({ avatar: selectedUri });
            closeDrawer?.(false);
        } catch (error) {
            console.error('Failed to update profile photo:', error);
            Alert.alert('Update failed', 'Unable to update profile photo right now. Please try again.');
        } finally {
            setIsPickingImage(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Profile</Text>
                <TouchableOpacity onPress={closeDrawer} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Icon name="close" size={18} color="#EAF0FF" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleRateUs}>
                <Icon name="star" size={20} color="#EAF0FF" />
                <View style={styles.buttonTextWrap}>
                    <Text style={styles.buttonText}>Rate Us</Text>
                    {lastRatedStars > 0 ? (
                        <Text style={styles.buttonSubText}>{`Last rating: ${lastRatedStars}★`}</Text>
                    ) : null}
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleShareApp}>
                <Icon name="share" size={20} color="#EAF0FF" />
                <Text style={styles.buttonText}>Share App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleAboutUs}>
                <Icon name="info-circle" size={20} color="#EAF0FF" />
                <Text style={styles.buttonText}>About Us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleChangeClass}>
                <Icon name="graduation-cap" size={20} color="#EAF0FF" />
                <Text style={styles.buttonText}>Change Board / Class</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleChangeProfilePhoto}
                disabled={isPickingImage}
            >
                <Icon name="camera" size={20} color="#EAF0FF" />
                <Text style={styles.buttonText}>
                    {isPickingImage ? 'Opening Gallery...' : 'Change Profile Photo'}
                </Text>
            </TouchableOpacity>

            <View style={styles.settingsBlock}>
                <Text style={styles.settingsTitle}>Experience Settings</Text>
                <PremiumToggle
                    label="Haptics"
                    hint="Enable touch feedback vibrations"
                    value={settings.hapticsEnabled}
                    onChange={setHapticsEnabled}
                />
                <View style={{ height: 8 }} />
                <PremiumToggle
                    label="Reduce Motion"
                    hint="Use calmer transitions"
                    value={settings.reduceMotionOverride === 'on'}
                    onChange={(enabled) =>
                        setReduceMotionOverride(enabled ? 'on' : 'system')
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 34,
        backgroundColor: '#0B0C10',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    title: {
        color: '#F5F7FF',
        fontSize: 20,
        fontWeight: '800',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        width: '100%',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
        backgroundColor: '#161922',
        paddingVertical: 14,
        paddingHorizontal: 14,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#EAF0FF',
    },
    buttonTextWrap: {
        marginLeft: 10,
        flex: 1,
    },
    buttonSubText: {
        marginTop: 2,
        fontSize: 12,
        fontWeight: '600',
        color: '#AEB8CF',
    },
    settingsBlock: {
        marginTop: 6,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.10)',
        paddingTop: 14,
    },
    settingsTitle: {
        color: '#B8C0D4',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 10,
    },
});

export default MainPage;
