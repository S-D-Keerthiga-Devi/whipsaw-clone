// AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get user from localStorage if not in context
        const storedUser = localStorage.getItem('whipsawUser');
        let token;
        
        if (user && user.token) {
          token = user.token;
        } else if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser.token;
        }
        
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        // Fetch blogs - using relative URL to avoid CORS issues
        const blogsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include'
        });
        
        let blogsData = [];
        
        if (!blogsResponse.ok) {
          console.error('Blog response error:', blogsResponse.status, blogsResponse.statusText);
          setError(`Failed to fetch blogs: ${blogsResponse.statusText}`);
        } else {
          try {
            blogsData = await blogsResponse.json();
          } catch (e) {
            console.error('Error parsing blogs JSON:', e);
            setError('Error parsing blogs data');
          }
        }
        
        setBlogs(Array.isArray(blogsData) ? blogsData : []);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // Handle delete item
  const handleDelete = async (id) => {
    if (!user) return;
    
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Get user from localStorage if not in context
      const storedUser = localStorage.getItem('whipsawUser');
      let token;
      
      if (user && user.token) {
        token = user.token;
      } else if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        token = parsedUser.token;
      }
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }
      
      // Update state to remove the deleted blog
      setBlogs(blogs.filter(blog => blog._id !== id));
      setError(null); // Clear any previous errors
    } catch (err) {
        console.error('Error deleting blog:', err);
        setError('Failed to delete blog. Please try again.');
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your content</p>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {/* Content */}
      <div className="mb-6">
        <Link
          to="/admin/blogs/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
        >
          Add New Blog
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {blogs.length > 0 ? (
              blogs.map(blog => (
                <li key={blog._id}>
                  <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{blog.title}</h3>
                      <p className="mt-1 text-sm text-gray-500 truncate">{blog.summary}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/blogs/edit/${blog._id}`}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No blogs found</li>
            )}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;