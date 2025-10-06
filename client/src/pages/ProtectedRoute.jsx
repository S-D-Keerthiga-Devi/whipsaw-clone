// ProtectedRoute.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  // If no user in context, check if we need to redirect
  if (!user) {
    // Check localStorage as a fallback
    const storedUser = localStorage.getItem('whipsawUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // For admin routes, check if user has admin rights
        if (adminOnly && !parsedUser.isAdmin) {
          return <Navigate to="/" replace />;
        }
        // If we have a valid user in localStorage, render children
        return children;
      } catch (e) {
        // Invalid JSON in localStorage
        return <Navigate to="/admin/login" replace />;
      }
    } else {
      // No user in localStorage either, redirect to login
      return <Navigate to="/admin/login" replace />;
    }
  }

  // User exists in context, check if they have admin rights for admin routes
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has necessary permissions
  return children;
};

export default ProtectedRoute;