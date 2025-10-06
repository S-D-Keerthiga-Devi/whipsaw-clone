// Projects.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react'; // Added useState import

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Project data with detailed information
  const projects = [
    {
      id: 1,
      title: "Aurora Smart Home",
      category: "Product Design / UX Design",
      description: "Revolutionary smart home ecosystem with intuitive controls and seamless device integration.",
      image: "https://images.unsplash.com/photo-1558002038-1055e2e8ecea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      tags: ["IoT", "UI/UX", "Industrial Design"],
      featured: true,
      stats: { users: "2.4M", satisfaction: "98%" },
      challenges: "Creating a unified interface for diverse smart home devices while maintaining simplicity.",
      solution: "Developed a context-aware system that adapts to user patterns and preferences."
    },
    {
      id: 2,
      title: "Nexus Health Platform",
      category: "Healthcare Design",
      description: "Comprehensive digital health platform connecting patients, providers, and caregivers.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      tags: ["Healthcare", "Data Visualization", "Accessibility"],
      featured: true,
      stats: { providers: "15K", patients: "850K" },
      challenges: "Designing for diverse user groups with varying technical literacy and accessibility needs.",
      solution: "Created adaptive interfaces with personalized workflows and comprehensive accessibility features."
    },
    {
      id: 3,
      title: "Veridian Finance App",
      category: "Fintech Design",
      description: "Next-generation banking experience with AI-powered financial insights and automation.",
      image: "https://images.unsplash.com/photo-1563986768609-322da575a99b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      tags: ["Fintech", "AI", "Mobile Design"],
      featured: true,
      stats: { downloads: "5.2M", rating: "4.8/5" },
      challenges: "Simplifying complex financial data while maintaining security and trust.",
      solution: "Designed an intuitive information architecture with progressive disclosure of complex features."
    },
    {
      id: 4,
      title: "Stellar Learning Platform",
      category: "EdTech Design",
      description: "Adaptive learning platform that personalizes education paths for optimal knowledge retention.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      tags: ["EdTech", "AI", "Gamification"],
      featured: false,
      stats: { students: "1.8M", courses: "420" },
      challenges: "Creating engaging learning experiences that adapt to diverse learning styles.",
      solution: "Implemented AI-driven content personalization with gamification elements."
    },
    {
      id: 5,
      title: "EcoTrack Sustainability",
      category: "Environmental Design",
      description: "Comprehensive platform for tracking and reducing carbon footprint across organizations.",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      tags: ["Sustainability", "Data Visualization", "Enterprise"],
      featured: false,
      stats: { companies: "3.5K", co2: "12M tons" },
      challenges: "Visualizing complex environmental data in an actionable and understandable way.",
      solution: "Created interactive dashboards with predictive analytics and benchmarking tools."
    },
    {
      id: 6,
      title: "ConnectAR Social Platform",
      category: "AR/VR Design",
      description: "Augmented reality social platform blending digital interactions with physical environments.",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      tags: ["AR/VR", "Social", "Mobile"],
      featured: false,
      stats: { users: "980K", interactions: "42M" },
      challenges: "Designing intuitive AR interactions for users with varying technical familiarity.",
      solution: "Developed gesture-based controls with contextual guidance and progressive complexity."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Projects</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore our award-winning designs that have transformed industries and user experiences.
          </motion.p>
        </motion.div>

        {/* Featured projects grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featuredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              className="group relative"
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* All projects section */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-3xl font-bold text-gray-900">All Projects</h3>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                All Categories
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Filter
              </button>
            </div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <h4 className="text-xl font-bold text-white">{project.title}</h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-2">{project.category}</p>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex space-x-4">
                      {project.stats && Object.entries(project.stats).map(([key, value], statIndex) => (
                        <div key={statIndex} className="text-center">
                          <p className="font-bold text-gray-900">{value}</p>
                          <p className="text-xs text-gray-500 capitalize">{key}</p>
                        </div>
                      ))}
                    </div>
                    <Link 
                      to={`/work/project-${project.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Project Card Component
const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
      whileHover={{ y: -15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isHovered ? 0.85 : 0.7 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
            Featured
          </span>
        </div>
        
        {/* Stats overlay */}
        <motion.div 
          className="absolute bottom-4 left-4 right-4 flex justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 20 
          }}
          transition={{ duration: 0.3 }}
        >
          {project.stats && Object.entries(project.stats).map(([key, value], statIndex) => (
            <div key={statIndex} className="text-center">
              <p className="font-bold text-white">{value}</p>
              <p className="text-xs text-gray-300 capitalize">{key}</p>
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <p className="text-blue-600 text-sm font-medium mb-1">{project.category}</p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
          <p className="text-gray-600">{project.description}</p>
        </div>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
          
          <Link 
            to={`/work/project-${project.id}`}
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            View Project Details
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;