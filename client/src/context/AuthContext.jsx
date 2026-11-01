import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vastukruta_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('vastukruta_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('vastukruta_token');
      if (storedToken) {
        try {
          const res = await authAPI.getMe();
          setUser(res.data.user);
          localStorage.setItem('vastukruta_user', JSON.stringify(res.data.user));
        } catch (err) {
          console.error('[Auth Error] Token verification failed:', err);
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      const { token: receivedToken, user: receivedUser } = res.data;

      setToken(receivedToken);
      setUser(receivedUser);
      localStorage.setItem('vastukruta_token', receivedToken);
      localStorage.setItem('vastukruta_user', JSON.stringify(receivedUser));

      return { success: true, message: res.data.message };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('vastukruta_token');
    localStorage.removeItem('vastukruta_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
