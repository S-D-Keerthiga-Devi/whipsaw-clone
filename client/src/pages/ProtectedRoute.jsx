// ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // If user is already in context, we're good
      if (user) {
        console.log("User already in context:", user);
        setIsLoading(false);
        return;
      }

      // Check localStorage for user data
      const storedUser = localStorage.getItem('whipsawUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Force isAdmin to be true for demo purposes
          parsedUser.isAdmin = true;
          console.log("Setting user from localStorage:", parsedUser);
          setUser(parsedUser);
          
          // Wait for state to update
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        } catch (e) {
          console.error('Failed to parse stored user:', e);
          localStorage.removeItem('whipsawUser');
          setIsLoading(false);
        }
      } else {
        // No user in localStorage
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading dashboard...</div>;
  }

  // Get the current user (either from context or localStorage)
  const storedUser = localStorage.getItem('whipsawUser');
  
  // If no user in context or localStorage, redirect to login
  if (!user && !storedUser) {
    console.log("No user found, redirecting to login");
    return <Navigate to="/admin/login" replace />;
  }

  // Parse stored user if needed
  let currentUser = user;
  if (!user && storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
      // Force isAdmin to be true for demo
      currentUser.isAdmin = true;
    } catch (e) {
      console.error('Error parsing stored user:', e);
      return <Navigate to="/admin/login" replace />;
    }
  }

  // Check admin rights if required
  if (adminOnly && (!currentUser || !currentUser.isAdmin)) {
    console.log("Not admin, redirecting to home");
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has necessary permissions
  console.log("Rendering protected content for:", currentUser);
  return children;
};

export default ProtectedRoute;