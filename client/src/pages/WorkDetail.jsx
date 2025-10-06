import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const WorkDetail = () => {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/work/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch work details');
        }
        
        const data = await response.json();
        setWork(data);
      } catch (error) {
        console.error('Error fetching work details:', error);
        setError('Failed to load work details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkDetail();
  }, [id]);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  if (loading) {
    return (
      <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="container mx-auto px-4 py-16 min-h-screen"
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </motion.div>
    );
  }

  if (error || !work) {
    return (
      <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="container mx-auto px-4 py-16 min-h-screen"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="mb-8">{error || 'Work not found'}</p>
          <Link to="/work" className="inline-block px-6 py-3 bg-black text-white">
            Back to Work
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="container mx-auto px-4 py-16 min-h-screen"
    >
      {/* Back button */}
      <Link to="/work" className="inline-flex items-center mb-8 text-gray-600 hover:text-black transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Work
      </Link>
      
      {/* Hero image */}
      <div className="mb-12">
        <img 
          src={work.image} 
          alt={work.title} 
          className="w-full h-[50vh] object-cover"
        />
      </div>
      
      {/* Project details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-6">{work.title}</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl mb-8">{work.description}</p>
            <div dangerouslySetInnerHTML={{ __html: work.content }} />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8">
            <h3 className="text-xl font-bold mb-6">Project Details</h3>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-1">Client</p>
              <p className="font-medium">{work.client}</p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-1">Year</p>
              <p className="font-medium">{work.year}</p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-1">Category</p>
              <p className="font-medium capitalize">{work.category}</p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-1">Author</p>
              <p className="font-medium">{work.author}</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Date</p>
              <p className="font-medium">
                {work.date ? format(new Date(work.date), 'MMMM dd, yyyy') : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkDetail;