import React, { createContext, useState, useContext, useRef } from 'react';
import { Animated } from 'react-native';
import CustomAlert from '../components/common/CustomAlert';

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
    const [alertInfo, setAlertInfo] = useState({ 
        isVisible: false, 
        title: '', 
        message: '',
        type: 'success',
        onConfirm: () => {}, 
    });
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const showAppAlert = (config) => {
        setAlertInfo({
            isVisible: true,
            title: config.title,
            message: config.message,
            type: config.type || 'success',
            onConfirm: config.onConfirm || (() => {}),
        });
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    };

    const hideAppAlert = () => {
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
            setAlertInfo({ ...alertInfo, isVisible: false, onConfirm: () => {} });
        });
    };

    const handleConfirm = () => {
        if (alertInfo.onConfirm) {
            alertInfo.onConfirm();
        }
        hideAppAlert();
    };

    return (
        <AlertContext.Provider value={{ showAppAlert }}>
            {children}
            {alertInfo.isVisible && (
                <Animated.View style={{ opacity: fadeAnim, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 9999 }}>
                    <CustomAlert 
                        isVisible={alertInfo.isVisible}
                        title={alertInfo.title}
                        message={alertInfo.message}
                        type={alertInfo.type}
                        onConfirm={handleConfirm}
                        onClose={hideAppAlert}
                    />
                </Animated.View>
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    return useContext(AlertContext);
};