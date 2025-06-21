import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetails from '../components/ProductDetails';
import LandingPage from './LandingPage';
import WishlistScreen from './WishlistScreen';
import CheckoutScreen from './CheckoutScreen';
import { useTheme } from '../contexts/themeContext';

const Stack = createNativeStackNavigator();

const Home = () => {
    const { theme } = useTheme();

    return (
        <Stack.Navigator initialRouteName='LandingPage'>
            <Stack.Screen
                options={{ headerShown: false }}
                name='LandingPage'
                component={LandingPage}
            />
            <Stack.Screen
                name='Details'
                component={ProductDetails}
                options={{
                    headerStyle: { backgroundColor: theme.card },
                    headerTintColor: theme.text,
                    headerTitleStyle: { color: theme.text },
                }}
            />
            <Stack.Screen
                name='Wishlist'
                component={WishlistScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Checkout'
                component={CheckoutScreen}
                options={{
                    title: 'Shipping Address',
                    headerStyle: { backgroundColor: theme.card },
                    headerTintColor: theme.text,
                    headerTitleStyle: { color: theme.text },
                }}
            />
        </Stack.Navigator>
    );
}

export default Home;