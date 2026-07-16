import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  const checkUser = async () => {

    const token =
      localStorage.getItem('token');


    if (token) {

      try {

        const userData =
          await authService.getMe();


        localStorage.setItem(
          'user',
          JSON.stringify(userData)
        );


        setUser(userData);


      } catch(error) {

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setUser(null);

      }

    }


    setLoading(false);

  };


  checkUser();


}, []);

  const login = async (credentials) => {

    const data = await authService.login(credentials);

    localStorage.setItem(
      'token',
      data.access_token
    );


    const userData = await authService.getMe();


    localStorage.setItem(
      'user',
      JSON.stringify(userData)
    );


    setUser(userData);


    return userData;
};

  const signup = async (userData) => {
    const data = await authService.signup(userData);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
