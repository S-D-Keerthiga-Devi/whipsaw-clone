import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }
  
  setIsSubmitting(true);
  setSubmitStatus(null);
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      setSubmitStatus({ success: true, message: 'Message sent successfully!' });
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } else {
      setSubmitStatus({ success: false, message: data.message || 'Failed to send message. Please try again.' });
    }
  } catch (error) {
    setSubmitStatus({ success: false, message: `Network error: ${error.message}` });
  } finally {
    setIsSubmitting(false);
  }
};

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="pt-28 pb-24 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h1 className="text-5xl font-bold mb-4 tracking-tight">Get in Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a project in mind? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-16">
            <motion.div 
              className="md:w-1/2"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.form 
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-8 rounded-lg shadow-sm"
                variants={itemVariants}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                    placeholder="Your email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                    placeholder="Your message"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
                
                {submitStatus && (
                  <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {submitStatus.message}
                  </div>
                )}
              </motion.form>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              variants={itemVariants}
            >
              <div className="bg-gray-50 p-8 rounded-lg h-full">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Address</h4>
                    <p className="text-gray-600">
                      123 Design Street<br />
                      ABC City, CA 94103<br />
                      India
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Email</h4>
                    <p className="text-gray-600">info@whipsaw.com</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Phone</h4>
                    <p className="text-gray-600">+1 (415) 555-0123</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
                    <div className="flex space-x-4 ml-24">
                      <a href="#" className="text-gray-600 hover:text-black transition-colors">Twitter</a>
                      <a href="#" className="text-gray-600 hover:text-black transition-colors">Instagram</a>
                      <a href="#" className="text-gray-600 hover:text-black transition-colors">LinkedIn</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;