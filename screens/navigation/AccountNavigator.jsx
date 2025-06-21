import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../Account';
import EditProfileScreen from '../EditProfileScreen';
import { useTheme } from '../../contexts/themeContext';

const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
    const { theme } = useTheme();

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="AccountMain" 
                component={AccountScreen} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="EditProfile" 
                component={EditProfileScreen} 
                options={{ 
                    title: 'Edit Profile',
                    headerStyle: {
                        backgroundColor: theme.card,
                    },
                    headerTintColor: theme.text,
                    headerTitleStyle: {
                        color: theme.text,
                    },
                 }}
            />
        </Stack.Navigator>
    );
}

export default AccountNavigator;