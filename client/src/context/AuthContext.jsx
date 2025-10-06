// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    console.log('AuthProvider initializing...');
    const storedUser = localStorage.getItem('whipsawUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Always force isAdmin to true for demo purposes
        parsedUser.isAdmin = true;
        
        // Create a new user object to ensure React detects the change
        const updatedUser = { ...parsedUser, isAdmin: true };
        
        console.log('User loaded from localStorage:', updatedUser);
        
        // Set the user in state
        setUser(updatedUser);
        
        // Also update localStorage with the updated user
        localStorage.setItem('whipsawUser', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('whipsawUser');
      }
    }
    setIsInitialized(true);
  }, []);

  const login = async (username, password) => {
    try {
      console.log('Attempting login with:', { username, password });
      
      // Make a real API call to the backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      console.log('Login response:', data);
      
      if (response.ok) {
        // Always set isAdmin to true for demo purposes
        const userData = {
          ...data,
          isAdmin: true
        };
        
        console.log('Setting user data with isAdmin=true:', userData);
        localStorage.setItem('whipsawUser', JSON.stringify(userData));
        setUser(userData);
        
        return { success: true, redirectTo: '/admin/dashboard' };
      } else {
        return { success: false, message: data.message || 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Server error.' };
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