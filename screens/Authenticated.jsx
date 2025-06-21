import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import { useCart } from "../contexts/cartContext";
import { useTheme } from '../contexts/themeContext';

import Home from './Home';
import Cart from './Cart';
import AccountNavigator from './navigation/AccountNavigator';

const Tab = createBottomTabNavigator();

const Authenticated = () => {
  const { shoppingCart } = useCart();
  const { theme } = useTheme();

  const totalItemsInCart = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.subtleText,
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 11,
          marginBottom: 5,
        },
        tabBarStyle: {
          paddingTop: 5,
          height: 60,
          backgroundColor: theme.card,
          borderTopColor: theme.border,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'AccountStack') iconName = 'user';
          else if (route.name === 'Cart') iconName = 'shopping-cart';

          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen 
        name="AccountStack"
        component={AccountNavigator} 
        options={{ title: 'Account' }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarBadge: totalItemsInCart > 0 ? totalItemsInCart : null,
        }}
      />
    </Tab.Navigator>
  );
};

export default Authenticated;