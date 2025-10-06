// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('whipsawUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('whipsawUser');
      }
    }
  }, []);

  const login = async (username, password) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login
      if (username === 'admin' && password === 'admin123') {
        const userData = {
          username: 'admin',
          isAdmin: true,
          token: 'demo-token'
        };
        localStorage.setItem('whipsawUser', JSON.stringify(userData));
        setUser(userData);
        return { success: true, redirectTo: '/admin/dashboard' };
      }
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('whipsawUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);