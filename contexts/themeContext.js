import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lightColors = {
  theme: 'light',
  background: '#f8f9fa',
  card: '#ffffff',
  text: '#333333',
  subtleText: '#666666',
  primary: '#27ae60',
  border: '#eeeeee',
};

const darkColors = {
  theme: 'dark',
  background: '#121212',
  card: '#1e1e1e',
  text: '#ffffff',
  subtleText: '#a0a0a0',
  primary: '#2ecc71',
  border: '#2c2c2c',
};

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [themeMode, setThemeMode] = useState(systemTheme);

  const theme = themeMode === 'dark' ? darkColors : lightColors;

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themeMode');
        if (savedTheme) {
          setThemeMode(savedTheme);
        }
      } catch (error) {
        console.error('Failed to load theme from storage.', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    try {
      await AsyncStorage.setItem('themeMode', newTheme);
    } catch (error) {
      console.error('Failed to save theme to storage.', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default ThemeProvider;