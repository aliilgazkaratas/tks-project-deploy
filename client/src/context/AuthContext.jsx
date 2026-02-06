import { createContext, useState, useEffect } from 'react';
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  getCurrentUser,
  getStoredUser
} from '../services/authServices';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Verify token by fetching current user
          const response = await getCurrentUser();
          setUser(response.user);
        } catch (error) {
          console.error('Auth init error:', error);
          // Token is invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        // No token, check for stored user (for UI display)
        const storedUser = getStoredUser();
        if (storedUser) {
          setUser(storedUser);
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      const response = await registerService(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message || 'Registration failed');
      throw error;
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      setError(null);
      const response = await loginService(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message || 'Login failed');
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutService();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user even if API call fails
      setUser(null);
    }
  };

  // Update user in context
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateUser,
    isAuthenticated,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};