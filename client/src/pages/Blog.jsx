import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback data for when API returns empty array
  const placeholderPosts = [
    {
      _id: '1',
      title: 'The Future of Product Design',
      content: 'Exploring emerging trends and technologies shaping the future of product design...',
      author: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdAt: new Date('2023-05-15').toISOString()
    },
    {
      _id: '2',
      title: 'Sustainable Design Practices',
      content: 'How designers are incorporating sustainability into their process and outcomes...',
      author: 'John Doe',
      image: 'https://images.unsplash.com/photo-1498075702571-ecb018f3752d?q=80&w=1756&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdAt: new Date('2023-06-22').toISOString()
    },
    {
      _id: '3',
      title: 'User-Centered Design: A Case Study',
      content: 'A deep dive into how user-centered design principles transformed a failing product...',
      author: 'Alex Johnson',
      image: 'https://images.unsplash.com/photo-1710799885122-428e63eff691?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdAt: new Date('2023-07-10').toISOString()
    }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Use relative URL to avoid CORS issues
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const data = await response.json();
        console.log('Fetched blog posts:', data);
        setPosts(data.length > 0 ? data : placeholderPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError('Failed to load blog posts. Please try again later.');
        // Use placeholder posts when there's an error
        setPosts(placeholderPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch (error) {
      console.error('Error formatting date:', error, dateString);
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  return (
    <div className="pt-24 pb-20">
      <Helmet>
        <title>Blog | Whipsaw - Insights and Stories</title>
        <meta name="description" content="Explore the latest insights, thoughts, and stories from the Whipsaw team on design, innovation, and creativity." />
        <meta name="keywords" content="whipsaw, blog, design, innovation, creative, insights" />
        <meta property="og:title" content="Whipsaw Blog" />
        <meta property="og:description" content="Insights, thoughts, and stories from the Whipsaw team." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://whipsaw.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, thoughts, and stories from the Whipsaw team.
          </p>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {(posts.length > 0 ? posts : placeholderPosts).map((post) => (
            <motion.article 
              key={post._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Link to={`/blog/${post._id}`}>
                <img 
                  src={post.image} 
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-56 object-cover transform transition-transform duration-300"
                  onLoad={(e) => e.target.classList.add('loaded')}
                  style={{ willChange: 'transform' }}
                />
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <span>{formatDate(post.createdAt)}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 hover:text-gray-700 transition-colors">{post.title}</h2>
                  <p className="text-gray-600 line-clamp-3">
                    {typeof post.content === 'string' 
                      ? post.content.replace(/<[^>]*>/g, '') 
                      : JSON.stringify(post.content).substring(0, 150) + '...'}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-black font-medium hover:text-gray-700 transition-colors">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;