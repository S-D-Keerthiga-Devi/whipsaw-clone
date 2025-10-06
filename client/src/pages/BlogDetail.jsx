import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fallback data for when post is not found
  const placeholderPost = {
    _id: id,
    title: 'Sample Blog Post',
    content: 'This is a sample blog post content. The actual post could not be loaded from the database.',
    author: 'Admin',
    image: 'https://source.unsplash.com/random/800x600?blog',
    createdAt: new Date().toISOString()
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        
        // First get the response as text
        const responseText = await response.text();
        
        // Try to parse it as JSON
        let data;
        try {
          data = responseText ? JSON.parse(responseText) : null;
        } catch (e) {
          console.error('Error parsing JSON:', e, responseText);
          throw new Error('Invalid response format');
        }
        
        if (data) {
          setPost(data);
        } else {
          // If data is empty or null, use placeholder
          setPost(placeholderPost);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post');
        // Use placeholder post when there's an error
        setPost(placeholderPost);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
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
        damping: 15
      }
    }
  };

  return (
    <div className="pt-24 pb-20 relative">
      {(post || placeholderPost) && (
        <Helmet>
          <title>{(post || placeholderPost).title} | Whipsaw Blog</title>
          <meta name="description" content={(post || placeholderPost).content.substring(0, 160)} />
          <meta property="og:title" content={(post || placeholderPost).title} />
          <meta property="og:description" content={(post || placeholderPost).content.substring(0, 160)} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://whipsaw.com/blog/${(post || placeholderPost)._id}`} />
          {(post || placeholderPost).image && <meta property="og:image" content={(post || placeholderPost).image} />}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="author" content={(post || placeholderPost).author} />
        </Helmet>
      )}
      <div className="container mx-auto px-4 relative">
        <Link to="/blog" className="inline-block mb-8 text-blue-600 hover:text-blue-800">
          &larr; Back to Blog
        </Link>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 p-8">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p>{error}</p>
          </div>
        ) : post || placeholderPost ? (
          <motion.div 
            className="max-w-4xl mx-auto relative"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl font-bold mb-6"
              variants={itemVariants}
            >
              {(post || placeholderPost).title}
            </motion.h1>
            
            <motion.div 
              className="mb-8"
              variants={itemVariants}
            >
              <img 
                src={(post || placeholderPost).image} 
                alt={(post || placeholderPost).title} 
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </motion.div>
            
            <motion.div 
              className="flex items-center mb-6 text-gray-600"
              variants={itemVariants}
            >
              <span>By {(post || placeholderPost).author || 'Admin'}</span>
              <span className="mx-2">•</span>
              <span>{(post || placeholderPost).createdAt ? formatDate((post || placeholderPost).createdAt) : 'Unknown date'}</span>
            </motion.div>
            
            <motion.div 
              className="prose prose-lg max-w-none"
              variants={itemVariants}
            >
              {(post || placeholderPost) && (post || placeholderPost).content && (
                typeof (post || placeholderPost).content === 'string' ? 
                  <div dangerouslySetInnerHTML={{ __html: (post || placeholderPost).content }} /> : 
                  <p>{JSON.stringify((post || placeholderPost).content)}</p>
              )}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
            <p className="text-gray-600 mb-8">The blog post you are looking for does not exist or has been removed.</p>
            <Link to="/blog" className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Back to Blog
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;