import React, { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import TextInputComponent from '../components/common/TextInputComponent';
import getSignUpScreenStyles from '../styles/signUpScreenStyles';
import { useTheme } from '../contexts/themeContext';
import { registerUser } from '../services/authService';

const SignUpScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = getSignUpScreenStyles(theme);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userCredential, setUserCredential] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setError('');
    setUserCredential(prev => ({...prev, [field]: value}));
  };

  const handleSignUp = async () => {
    const { firstName, lastName, email, password } = userCredential;
    setError('');

    if (!firstName || !lastName || !email || !password) {
      setError('All fields are required.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setIsLoading(true);
    try {
        const result = await registerUser(userCredential);
        console.log("Signup API Response:", result);
        if(result && result.id) {
            Alert.alert("Success", "Account created successfully! Please log in.");
            navigation.navigate('Login');
        } else {
            setError("Something went wrong during signup.");
        }
    } catch (err) {
        setError(err.message || "An error occurred during signup.");
    } finally {
        setIsLoading(false);
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us to get started</Text>

          <View style={styles.inputContainer}>
            <Feather name="user" size={22} color={theme.subtleText} style={styles.inputIcon} />
            <TextInputComponent
              placeholder="First Name"
              onChange={(text) => handleInputChange('firstName', text)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="user" size={22} color={theme.subtleText} style={styles.inputIcon} />
            <TextInputComponent
              placeholder="Last Name"
              onChange={(text) => handleInputChange('lastName', text)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="mail" size={22} color={theme.subtleText} style={styles.inputIcon} />
            <TextInputComponent
              placeholder="Email"
              onChange={(text) => handleInputChange('email', text)}
              style={styles.input}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="lock" size={22} color={theme.subtleText} style={styles.inputIcon} />
            <TextInputComponent
              placeholder="Password"
              onChange={(text) => handleInputChange('password', text)}
              style={styles.input}
              secureTextEntry={true}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color={theme.theme === 'dark' ? theme.background : '#fff'} /> : <Text style={styles.signupButtonText}>Sign Up</Text>}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUpScreen;