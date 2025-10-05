import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Work = () => {
  const [filter, setFilter] = useState('all');
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  // Sample projects data with high-quality Unsplash images
  const projects = [
    {
      id: 1,
      title: 'Autonomous Vehicle Interface',
      category: 'digital',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      client: 'Future Motors',
      year: '2023',
      description: 'A revolutionary interface design for autonomous vehicles that enhances user experience and safety through intuitive controls and real-time feedback systems.'
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
      image: 'https://source.unsplash.com/random/800x600?packaging,sustainable&sig=5',
      client: 'EcoGoods',
      year: '2023'
    },
    {
      id: 6,
      title: 'Wearable Health Monitor',
      category: 'product',
      image: 'https://source.unsplash.com/random/800x600?wearable,health&sig=6',
      client: 'VitalTrack',
      year: '2022'
    },
    {
      id: 7,
      title: 'Retail Experience Design',
      category: 'spaces',
      image: 'https://source.unsplash.com/random/800x600?retail,store&sig=7',
      client: 'ModernShop',
      year: '2023'
    },
    {
      id: 8,
      title: 'Electric Vehicle Charging Station',
      category: 'product',
      image: 'https://source.unsplash.com/random/800x600?electric,charging&sig=8',
      client: 'PowerGrid',
      year: '2022'
    }
  ];

  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

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
        <div className="mb-16 max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Our Work
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600"
            variants={itemVariants}
          >
            Explore our portfolio of innovative designs across products, digital experiences, packaging, and spaces.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12"
          variants={itemVariants}
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
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                initial: { y: 20, opacity: 0 },
                animate: { 
                  y: 0, 
                  opacity: 1, 
                  transition: { duration: 0.5 } 
                }
              }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group"
            >
              <motion.div 
                className="group relative overflow-hidden rounded-lg shadow-lg"
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
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-20 text-center"
          variants={itemVariants}
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