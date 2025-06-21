import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Switch
} from 'react-native';
import { useAuth } from '../contexts/authContext';
import getAccountStyles from '../styles/accountStyles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/themeContext';
import { useAlert } from '../contexts/AlertContext';

const MenuRow = ({ title, iconName, iconBgColor, onPress, rightContent }) => {
    const { theme } = useTheme();
    const styles = getAccountStyles(theme);
    return(
        <TouchableOpacity style={styles.menuRow} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.menuRowInner}>
                <View style={[styles.menuIcon, { backgroundColor: iconBgColor }]}>
                    <Feather name={iconName} size={20} color="#fff" />
                </View>
                <Text style={styles.menuText}>{title}</Text>
            </View>
            {rightContent ? rightContent() : <Feather name="chevron-right" size={20} style={styles.chevronIcon} />}
        </TouchableOpacity>
    );
};

const AccountScreen = () => {
    const { theme, toggleTheme } = useTheme();
    const styles = getAccountStyles(theme);
    
    const { auth, logout } = useAuth();
    const navigation = useNavigation();
    const { showAppAlert } = useAlert();

    const [isDarkMode, setIsDarkMode] = useState(theme.theme === 'dark');
    
    const handleThemeToggle = () => {
        toggleTheme();
        setIsDarkMode(previousState => !previousState);
    }

    const handleLogoutPress = () => {
        showAppAlert({
            type: 'confirm',
            title: 'Logout',
            message: 'Are you sure you want to logout?',
            onConfirm: logout,
        });
    };
    
    const handleWishlistPress = () => {
        navigation.navigate('Home', { screen: 'Wishlist' });
    };

    const handleProfilePress = () => {
        navigation.navigate('EditProfile');
    };

    const handleOrdersPress = () => showAppAlert({title: 'Coming Soon', message: 'Your order history will be available here.', type: 'info'});

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <TouchableOpacity style={styles.profileHeader} onPress={handleProfilePress} activeOpacity={0.8}>
                    <Image
                        source={auth.user?.image ? {uri: auth.user.image} : require('../assets/adaptive-icon.png')}
                        style={styles.avatar}
                    />
                    <Text style={styles.userName}>{`${auth.user?.firstName} ${auth.user?.lastName}`}</Text>
                    <Text style={styles.userEmail}>{auth.user?.email}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, opacity: 0.6}}>
                        <Text style={{color: theme.subtleText}}>Edit Profile </Text>
                        <Feather name="edit-3" size={14} color={theme.subtleText} />
                    </View>
                </TouchableOpacity>

                <View style={styles.menuSection}>
                    <Text style={styles.menuSectionTitle}>My Account</Text>
                    <View style={styles.menuContainer}>
                        <MenuRow title="Profile Settings" iconName="user" iconBgColor="#e7f3fe" onPress={handleProfilePress} />
                        <View style={styles.separator} />
                        <MenuRow title="My Orders" iconName="box" iconBgColor="#fef6e6" onPress={handleOrdersPress} />
                        <View style={styles.separator} />
                        <MenuRow title="My Wishlist" iconName="heart" iconBgColor="#feeef0" onPress={handleWishlistPress} />
                    </View>
                </View>

                <View style={styles.menuSection}>
                    <Text style={styles.menuSectionTitle}>Settings</Text>
                    <View style={styles.menuContainer}>
                         <MenuRow 
                            title="Dark Mode" 
                            iconName="moon" 
                            iconBgColor={theme.theme === 'dark' ? '#2c3e50' : '#34495e'}
                            rightContent={() => <Switch onValueChange={handleThemeToggle} value={isDarkMode} trackColor={{false: '#767577', true: theme.primary}} thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'} />}
                         />
                    </View>
                </View>

                 <View style={styles.menuSection}>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuRow} onPress={handleLogoutPress} activeOpacity={0.7}>
                           <View style={styles.menuRowInner}>
                                <View style={[styles.menuIcon, {backgroundColor: '#fdecec'}]}>
                                    <Feather name="log-out" size={20} color="#e74c3c" />
                                </View>
                                <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AccountScreen;