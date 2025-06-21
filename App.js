import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import Authenticated from './screens/Authenticated';
import AuthProvider, { AuthContext } from './contexts/authContext';
import CartProvider from './contexts/cartContext';
import WishlistProvider from './contexts/wishlistContext';
import ThemeProvider, { useTheme } from './contexts/themeContext';
import { AlertProvider } from './contexts/AlertContext'; 
import { SESSION_KEYS } from './constants/appContants';
import { setToken } from './utils/axiosClient';

const Stack = createNativeStackNavigator();


const AppNavigator = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const { theme } = useTheme();
    const [isRestoring, setIsRestoring] = useState(true);

    useEffect(() => {
        const restoreUserSession = async () => {
            try {
                const sessionString = await AsyncStorage.getItem(SESSION_KEYS.AUTH);
                if (sessionString) {
                    const session = JSON.parse(sessionString);
                    setToken(session.accessToken, session.refreshToken);
                    setAuth(session);
                }
            } catch (e) {
                console.error('Failed to restore session', e);
            } finally {
                setTimeout(() => setIsRestoring(false), 100);
            }
        };
        restoreUserSession();
    }, [setAuth]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isRestoring ? (
                    <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                ) : auth.isAuthenticated ? (
                    <Stack.Screen name="Authenticated" component={Authenticated} options={{ headerShown: false }} />
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen
                            name="Signup"
                            component={SignUpScreen}
                            options={{
                                title: 'Create Account',
                                headerStyle: { backgroundColor: theme.card },
                                headerTintColor: theme.text,
                                headerTitleStyle: { color: theme.text },
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <ThemeProvider>
                        <AlertProvider>
                            <AppNavigator />
                        </AlertProvider>
                    </ThemeProvider>
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}