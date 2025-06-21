import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
} from 'react-native';
import { useAuth } from '../contexts/authContext';
import { useTheme } from '../contexts/themeContext';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

const EditProfileScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const { auth, updateUser } = useAuth();
    
    const [newImageUri, setNewImageUri] = useState(null);
    const [firstName, setFirstName] = useState(auth.user.firstName);
    const [lastName, setLastName] = useState(auth.user.lastName);

    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "You need to allow access to your photos to change your profile picture.");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!pickerResult.canceled) {
            setNewImageUri(pickerResult.assets[0].uri);
        }
    };

    const handleSaveChanges = () => {
        if (!firstName || !lastName) {
            Alert.alert("Validation Error", "First and last name cannot be empty.");
            return;
        }
        
        const updatedUser = {
            ...auth.user,
            firstName,
            lastName,
            image: newImageUri || auth.user.image,
        };

        updateUser(updatedUser);

        Alert.alert("Success", "Your profile has been updated.");
        navigation.goBack();
    };

    const imageSource = newImageUri ? { uri: newImageUri } : (auth.user.image ? { uri: auth.user.image } : require('../assets/adaptive-icon.png'));

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <View style={styles.avatarContainer}>
                    <Image source={imageSource} style={styles.avatar} />
                    <TouchableOpacity style={styles.editButton} onPress={handlePickImage}>
                        <Feather name="edit-2" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>First Name</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Enter your first name"
                    placeholderTextColor={theme.subtleText}
                />

                <Text style={styles.label}>Last Name</Text>
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Enter your last name"
                    placeholderTextColor={theme.subtleText}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input, styles.readOnlyInput]}
                    value={auth.user.email}
                    editable={false}
                />
                
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const getStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    form: {
        padding: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
        position: 'relative',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: colors.primary,
    },
    editButton: {
        position: 'absolute',
        bottom: 5,
        right: '28%', 
        backgroundColor: colors.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.card,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: colors.text,
        marginBottom: 20,
    },
    readOnlyInput: {
        backgroundColor: colors.background,
        color: colors.subtleText,
    },
    saveButton: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: colors.theme === 'dark' ? colors.background : '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditProfileScreen;