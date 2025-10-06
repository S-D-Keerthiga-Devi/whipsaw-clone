import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const Work = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const heroRef = useRef(null);
  const filterRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const filterInView = useInView(filterRef, { once: true, amount: 0.5 });
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  // Fetch work items from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/work');
        
        if (!response.ok) {
          throw new Error('Failed to fetch work items');
        }
        
        const data = await response.json();
        setProjects(data.length > 0 ? data : sampleProjects);
      } catch (error) {
        console.error('Error fetching work items:', error);
        setError('Failed to load work items');
        setProjects(sampleProjects); // Use sample data as fallback
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  // Sample projects data with high-quality Unsplash images
  const sampleProjects = [
    {
      id: 1,
      title: 'Autonomous Vehicle Interface',
      category: 'digital',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      client: 'Future Motors',
      year: '2023',
      description: 'A revolutionary interface design for autonomous vehicles that enhances user experience and safety through intuitive controls and real-time feedback systems.',
      content: 'This project involved designing a comprehensive interface for next-generation autonomous vehicles. The interface prioritizes user safety while providing intuitive controls and real-time feedback. We conducted extensive user research and testing to ensure the design meets the needs of diverse users.',
      author: 'Design Team'
    },
    {
      id: 2,
      title: 'Smart Home Ecosystem',
      category: 'product',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      client: 'HomeConnect',
      year: '2022',
      description: 'A comprehensive smart home system featuring seamless integration of lighting, security, climate control, and entertainment devices with voice and app control.'
    },
    {
      id: 3,
      title: 'Medical Diagnostic Device',
      category: 'product',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      client: 'HealthTech',
      year: '2023',
      description: 'An innovative portable diagnostic device that enables rapid, accurate testing for multiple health conditions with wireless connectivity to healthcare systems.'
    },
    {
      id: 4,
      title: 'Financial App Redesign',
      category: 'digital',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      client: 'MoneyWise',
      year: '2022'
    },
    {
      id: 5,
      title: 'Sustainable Packaging System',
      category: 'packaging',
      image: 'https://images.unsplash.com/photo-1567570671138-76c7e06caa3b?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      client: 'EcoGoods',
      year: '2023'
    },
    {
      id: 6,
      title: 'Wearable Health Monitor',
      category: 'product',
      image: 'https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      client: 'VitalTrack',
      year: '2022'
    },
    {
      id: 7,
      title: 'Retail Experience Design',
      category: 'spaces',
      image: 'https://images.unsplash.com/photo-1758520387606-382ad2471b65?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      client: 'ModernShop',
      year: '2023'
    },
    {
      id: 8,
      title: 'Electric Vehicle Charging Station',
      category: 'product',
      image: 'https://images.unsplash.com/photo-1738101001619-f0fd42ceafb0?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      client: 'PowerGrid',
      year: '2022'
    }
  ];

  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // Scroll-triggered animation component for each project
  const AnimatedProject = ({ project, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { 
      once: true, 
      amount: 0.3,
      margin: "-100px"
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -100, scale: 0.9 }}
        animate={isInView ? { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          transition: {
            duration: 0.9,
            delay: (index % 3) * 0.15,
            ease: [0.17, 0.55, 0.55, 1]
          }
        } : {}}
        className="group"
      >
        <motion.div 
          className="relative overflow-hidden rounded-lg shadow-lg"
          whileHover={{ y: -8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
            <div>
              <h3 className="text-white text-2xl font-bold">{project.title}</h3>
              <p className="text-gray-200 mt-2">Client: {project.client}</p>
              <p className="text-gray-200">Year: {project.year}</p>
              {project.description && (
                <p className="text-gray-300 mt-3 line-clamp-3">{project.description}</p>
              )}
              <Link 
                to={`/work/project-${project.id}`}
                className="inline-block mt-5 text-white bg-black/40 hover:bg-black/60 px-4 py-2 rounded-md transition-colors duration-300"
              >
                View Project
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="pt-24 pb-20"
    >
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div ref={heroRef} className="mb-16 max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={heroInView ? { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }
            } : {}}
          >
            Our Work
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, delay: 0.2, ease: [0.17, 0.55, 0.55, 1] }
            } : {}}
          >
            Explore our portfolio of innovative designs across products, digital experiences, packaging, and spaces.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div 
          ref={filterRef}
          className="flex flex-wrap justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={filterInView ? {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: [0.17, 0.55, 0.55, 1] }
          } : {}}
        >
          {['all', 'product', 'digital', 'packaging', 'spaces'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`mx-2 mb-2 px-6 py-2 rounded-full transition-colors ${
                filter === category 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <AnimatedProject key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to start your project?</h2>
          <Link 
            to="/contact" 
            className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Work;