import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const NewWork = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client: '',
    image: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/works`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      // First get the response as text
      const responseText = await response.text();
      
      // Try to parse it as JSON
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error('Error parsing JSON:', e, responseText);
        throw new Error('Invalid response format');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create work item');
      }

      // Redirect to dashboard on success
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Error creating work item:', err);
      setError(err.message || 'Failed to create work item');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">Add New Work</h1>
      
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
          />
        </div>
        
        <div>
          <label htmlFor="client" className="block text-sm font-medium text-gray-700">
            Client
          </label>
          <input
            type="text"
            id="client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Product Design, UX/UI, Branding"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
          />
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
          />
          <p className="mt-1 text-sm text-gray-500">
            Leave empty for a default image or provide a URL to your image
          </p>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={10}
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
          />
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Work'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default NewWork;