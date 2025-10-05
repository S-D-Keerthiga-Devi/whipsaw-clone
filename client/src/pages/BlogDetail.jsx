import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fallback data in case API fails
  const fallbackPosts = {
    '1': {
      _id: '1',
      title: 'Design Thinking Process',
      content: `
        <p>Design thinking is a non-linear, iterative process that teams use to understand users, challenge assumptions, redefine problems and create innovative solutions to prototype and test.</p>
        
        <h2>The Five Stages of Design Thinking</h2>
        <p>The design thinking process consists of five key phases: Empathize, Define, Ideate, Prototype, and Test. Each stage is crucial to developing solutions that truly address user needs.</p>
        
        <h2>Empathize</h2>
        <p>The first stage involves gaining an empathetic understanding of the problem you're trying to solve. This means observing, engaging with, and empathizing with people to understand their experiences and motivations.</p>
        
        <h2>Define</h2>
        <p>In this stage, you'll analyze your observations and synthesize them to define the core problems you've identified. Creating a problem statement in a human-centered manner is key.</p>
        
        <h2>Ideate</h2>
        <p>The third stage is where you start to generate ideas. The goal is quantity over quality at this point—brainstorming as many creative solutions as possible.</p>
        
        <h2>Prototype</h2>
        <p>This experimental phase aims to identify the best possible solution for each problem found. Teams create scaled-down versions of the product to investigate the solutions generated in the previous stage.</p>
        
        <h2>Test</h2>
        <p>Designers thoroughly test the complete product using the best solutions identified in the prototype phase. This is an iterative process where results are often used to redefine problems.</p>
      `,
      author: 'Admin',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      createdAt: new Date('2023-06-15').toISOString()
    },
    '2': {
      _id: '2',
      title: 'The Future of UX Design',
      content: `
        <p>As technology evolves, so does the field of UX design. This post explores emerging trends and what they mean for designers.</p>
        
        <h2>Voice User Interfaces</h2>
        <p>Voice-activated assistants like Siri, Alexa, and Google Assistant have changed how users interact with technology. Designing for voice requires a different approach than traditional visual interfaces.</p>
        
        <h2>Augmented Reality</h2>
        <p>AR is transforming UX design by blending digital elements with the physical world. This creates immersive experiences that can enhance everything from shopping to education.</p>
        
        <h2>Personalization</h2>
        <p>Users now expect experiences tailored to their preferences and behaviors. AI and machine learning are making it possible to create highly personalized interfaces that adapt to individual users.</p>
        
        <h2>Ethical Design</h2>
        <p>As technology becomes more integrated into our lives, ethical considerations in design are more important than ever. Designers must consider privacy, accessibility, and the potential social impacts of their work.</p>
      `,
      author: 'Admin',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      createdAt: new Date('2023-07-22').toISOString()
    },
    '3': {
      _id: '3',
      title: 'Sustainable Design Practices',
      content: `
        <p>Sustainability in design is more than a trend—it's a responsibility. Learn how designers are creating eco-friendly solutions.</p>
        
        <h2>Materials Selection</h2>
        <p>Choosing sustainable materials is one of the most direct ways designers can reduce environmental impact. This includes considering renewable resources, recycled materials, and biodegradable options.</p>
        
        <h2>Energy Efficiency</h2>
        <p>Designing products that consume less energy throughout their lifecycle is crucial. This applies to everything from electronic devices to buildings and transportation systems.</p>
        
        <h2>Longevity and Repairability</h2>
        <p>Creating products that last longer and can be easily repaired reduces waste and resource consumption. This approach challenges the "planned obsolescence" model that has dominated product design for decades.</p>
        
        <h2>Circular Design</h2>
        <p>The circular economy model aims to eliminate waste by keeping products and materials in use. Designers are increasingly adopting this approach, creating products that can be easily disassembled, recycled, or repurposed at the end of their life.</p>
      `,
      author: 'Admin',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      createdAt: new Date('2023-08-10').toISOString()
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/blog/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post');
        // Use fallback data if API fails
        setPost(fallbackPosts[id] || {
          _id: '404',
          title: 'Post Not Found',
          content: '<p>The blog post you are looking for does not exist.</p>',
          author: 'System',
          image: 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          createdAt: new Date().toISOString()
        });
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

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
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
        ) : post ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
            
            <div className="mb-8">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>
            
            <div className="flex items-center mb-6 text-gray-600">
              <span>By {post.author || 'Admin'}</span>
              <span className="mx-2">•</span>
              <span>{post.createdAt ? formatDate(post.createdAt) : 'Unknown date'}</span>
            </div>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        ) : (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
            <p>The blog post you are looking for does not exist.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;