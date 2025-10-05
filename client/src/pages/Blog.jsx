import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback data in case API fails
  const fallbackPosts = [
    {
      _id: '1',
      title: 'Design Thinking Process',
      content: 'Design thinking is a non-linear, iterative process that teams use to understand users, challenge assumptions, redefine problems and create innovative solutions to prototype and test.',
      author: 'Admin',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      createdAt: new Date('2023-06-15').toISOString()
    },
    {
      _id: '2',
      title: 'The Future of UX Design',
      content: 'As technology evolves, so does the field of UX design. This post explores emerging trends and what they mean for designers.',
      author: 'Admin',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      createdAt: new Date('2023-07-22').toISOString()
    },
    {
      _id: '3',
      title: 'Sustainable Design Practices',
      content: "Sustainability in design is more than a trend—it's a responsibility. Learn how designers are creating eco-friendly solutions.",
      author: 'Admin',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      createdAt: new Date('2023-08-10').toISOString()
    }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Make sure the server is running on port 5000
        const response = await fetch('http://localhost:5000/api/blog');
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const data = await response.json();
        console.log('Fetched blog posts:', data); // Debug log
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        } else {
          console.warn('No blog posts found in database, using fallback data');
          setPosts(fallbackPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError('Failed to load blog posts');
        // Use fallback data if API fails
        setPosts(fallbackPosts);
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

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, thoughts, and stories from the Whipsaw team.
          </p>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <Link to={`/blog/${post._id}`}>
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <span>{formatDate(post.createdAt)}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 hover:text-gray-700 transition-colors">{post.title}</h2>
                  <p className="text-gray-600 line-clamp-3">
                    {post.content}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-black font-medium hover:text-gray-700 transition-colors">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;