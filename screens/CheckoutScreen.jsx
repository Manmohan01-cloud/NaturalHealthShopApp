import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from 'react-native';
import { useTheme } from '../contexts/themeContext';

const CheckoutScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [addressInfo, setAddressInfo] = useState({
        fullName: '',
        addressLine1: '',
        city: '',
        pincode: '',
        state: '',
        contactNumber: '',
    });

    const handleInputChange = (field, value) => {
        setAddressInfo(prevState => ({ ...prevState, [field]: value }));
    };

    const handleContinue = () => {
        for (const key in addressInfo) {
            if (!addressInfo[key]) {
                Alert.alert('Incomplete Form', `Please fill out the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
                return;
            }
        }
        Alert.alert('Success', 'Address saved. Proceeding to payment.');
        console.log('Address Info:', addressInfo);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.form}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        value={addressInfo.fullName}
                        onChangeText={(val) => handleInputChange('fullName', val)}
                        placeholder="Enter your full name"
                        placeholderTextColor={theme.subtleText}
                    />
                    
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={styles.input}
                        value={addressInfo.addressLine1}
                        onChangeText={(val) => handleInputChange('addressLine1', val)}
                        placeholder="House No, Building, Street, Area"
                        placeholderTextColor={theme.subtleText}
                    />
                    
                    <Text style={styles.label}>City</Text>
                    <TextInput
                        style={styles.input}
                        value={addressInfo.city}
                        onChangeText={(val) => handleInputChange('city', val)}
                        placeholder="Enter your city"
                        placeholderTextColor={theme.subtleText}
                    />

                    <Text style={styles.label}>Pincode</Text>
                    <TextInput
                        style={styles.input}
                        value={addressInfo.pincode}
                        onChangeText={(val) => handleInputChange('pincode', val)}
                        placeholder="Enter 6-digit pincode"
                        placeholderTextColor={theme.subtleText}
                        keyboardType="number-pad"
                        maxLength={6}
                    />
                    
                    <Text style={styles.label}>State</Text>
                    <TextInput
                        style={styles.input}
                        value={addressInfo.state}
                        onChangeText={(val) => handleInputChange('state', val)}
                        placeholder="Enter your state"
                        placeholderTextColor={theme.subtleText}
                    />

                    <Text style={styles.label}>Contact Number</Text>
                    <TextInput
                        style={styles.input}
                        value={addressInfo.contactNumber}
                        onChangeText={(val) => handleInputChange('contactNumber', val)}
                        placeholder="Enter 10-digit mobile number"
                        placeholderTextColor={theme.subtleText}
                        keyboardType="phone-pad"
                        maxLength={10}
                    />
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                    <Text style={styles.continueButtonText}>Continue to Payment</Text>
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
    scrollViewContent: {
        paddingBottom: 100,
    },
    form: {
        padding: 20,
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
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        backgroundColor: colors.card,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    continueButton: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    continueButtonText: {
        color: colors.theme === 'dark' ? colors.background : '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;