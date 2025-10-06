import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 w-full">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-6 tracking-tight">WHIPSAW</h3>
            <p className="text-gray-300">
              Creating innovative design solutions since 1999.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/work" className="text-gray-300 hover:text-white transition-colors">Work</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <address className="not-italic text-gray-300">
              <p>123 Design Street</p>
              <p>ABC City, CA 94103</p>
              <p className="mt-3">info@whipsaw.com</p>
              <p>+91 12345-67890</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Follow Us</h4>
            <div className="flex space-x-6">
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Twitter
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Instagram
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-300 hover:text-white transition-colors"
              >
                LinkedIn
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Whipsaw. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;