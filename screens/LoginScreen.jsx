import React, { useContext, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import TextInputComponent from '../components/common/TextInputComponent';
import getLoginStyles from '../styles/loginScreenStyles';
import { authenticateUser } from '../services/authService';
import { AuthContext } from '../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SESSION_KEYS } from '../constants/appContants';
import { setToken } from '../utils/axiosClient';
import { useTheme } from '../contexts/themeContext';

const LoginScreen = ({ navigation }) => {
  const { setAuth } = useContext(AuthContext);
  const { theme } = useTheme();
  const styles = getLoginStyles(theme);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  
  const [userLoginCredential, setUserLoginCredential] = useState({
    username: 'emilys',
    password: 'emilyspass',
  });

  const handleLogin = async () => {
    setError('');
    if (!userLoginCredential.username || !userLoginCredential.password) {
        setError('Username and password cannot be empty.');
        return;
    }

    try {
      const result = await authenticateUser(userLoginCredential);
      if (result && result.accessToken) {
        const { accessToken, refreshToken, ...user } = result;
        setToken(accessToken, refreshToken);
        const session = { isAuthenticated: true, user, accessToken, refreshToken };
        await AsyncStorage.setItem(SESSION_KEYS.AUTH, JSON.stringify(session));
        setAuth(session);
      } else {
          setError(result.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login.');
      console.log('ERROR in Authentication...', err.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/splash_background.png')}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to your account</Text>
          <View style={styles.inputContainer}>
            <Feather name="user" size={22} color={theme.subtleText} style={styles.inputIcon} />
            <TextInputComponent
              placeholder="Username"
              value={userLoginCredential.username}
              onChange={(text) => {
                setError('');
                setUserLoginCredential((prev) => ({ ...prev, username: text }))
              }}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="lock" size={22} color={theme.subtleText} style={styles.inputIcon} />
            <TextInputComponent
              placeholder="Password"
              value={userLoginCredential.password}
              onChange={(text) => {
                setError('');
                setUserLoginCredential((prev) => ({ ...prev, password: text }))
              }}
              style={styles.input}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Feather name={isPasswordVisible ? 'eye-off' : 'eye'} size={22} color={theme.subtleText} />
            </TouchableOpacity>
          </View>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.socialLoginContainer}>
            <Text style={styles.socialLoginText}>Or, login with...</Text>
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Feather name="phone" size={24} color="#53d769" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="facebook-square" size={24} color="#4267B2" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;