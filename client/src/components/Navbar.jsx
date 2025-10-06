import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/work' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-white bg-opacity-90 py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-black tracking-tight">
            WHIPSAW
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                  location.pathname === link.path 
                    ? 'text-black font-semibold border-b-2 border-black pb-1' 
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Authentication Links */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  Welcome, {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium uppercase tracking-wider text-white bg-black rounded hover:bg-gray-800 transition-colors px-4 py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="ml-4 px-4 py-2 text-sm font-medium uppercase tracking-wider text-white bg-black rounded hover:bg-gray-800 transition-colors"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-black transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`w-full h-0.5 bg-black transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-6"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      to={link.path}
                      className={`block text-base uppercase tracking-wider transition-colors ${
                        location.pathname === link.path 
                          ? 'text-black font-semibold' 
                          : 'text-gray-700 hover:text-black'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Authentication Links */}
                {user ? (
                  <motion.div variants={itemVariants} className="flex flex-col space-y-4">
                    <div className="text-sm font-medium text-gray-700">
                      Welcome, {user.username}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-5 py-3 text-sm font-medium uppercase tracking-wider text-white bg-black rounded hover:bg-gray-800 transition-colors"
                    >
                      Logout
                    </button>
                  </motion.div>
                ) : (
                  <motion.div variants={itemVariants}>
                    <Link
                      to="/admin/login"
                      className="inline-block px-5 py-3 text-sm font-medium uppercase tracking-wider text-white bg-black rounded hover:bg-gray-800 transition-colors"
                    >
                      Admin
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;