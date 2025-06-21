import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext } from "react";
import { SESSION_KEYS } from "../constants/appContants";

export const AuthContext = createContext();

const initialAuth = {
  isAuthenticated: false,
  user: null,
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialAuth);

  const logout = () => {
    setAuth(initialAuth);
    AsyncStorage.removeItem(SESSION_KEYS.AUTH);
  };

  const updateUser = async (updatedUser) => {
    const newAuthState = {
        ...auth,
        user: updatedUser,
    };
    setAuth(newAuthState);
    await AsyncStorage.setItem(SESSION_KEYS.AUTH, JSON.stringify(newAuthState));
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;