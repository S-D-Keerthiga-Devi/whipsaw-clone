import { motion } from 'framer-motion';

const About = () => {
  // Enhanced animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { 
        duration: 0.7, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15
      } 
    },
    exit: { 
      opacity: 0, 
      transition: { 
        duration: 0.5,
        ease: "easeInOut" 
      } 
    }
  };

  const itemVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="pt-24 pb-20"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <motion.div 
          className="mb-20 max-w-4xl mx-auto text-center"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Whipsaw</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a globally recognized design firm creating innovative products, experiences, and brands that transform businesses.
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.div 
          className="mb-20"
          variants={staggerContainer}
        >
          <motion.div 
            className="max-w-4xl mx-auto mb-10"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Founded in 1999, Whipsaw has grown from a small industrial design studio to a comprehensive innovation firm with global reach. Our journey has been defined by a relentless pursuit of excellence and a commitment to creating meaningful impact through design.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Over the decades, we've partnered with startups and Fortune 500 companies alike, helping them navigate complex challenges and emerge with solutions that resonate with users and drive business success.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-gray-50 p-8 rounded-lg border border-gray-200"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">To create innovative designs that improve people's lives and help businesses thrive in an ever-changing world.</p>
            </motion.div>
            <motion.div 
              className="bg-gray-50 p-8 rounded-lg border border-gray-200"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">To be the world's most influential design firm, known for transformative solutions that shape the future of human experience.</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Our Approach */}
        <motion.div 
          className="mb-20"
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            variants={itemVariants}
          >
            Our Approach
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            <motion.div 
              className="text-center"
              variants={itemVariants}
            >
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold mb-4">Discover</h3>
              <p className="text-gray-700 leading-relaxed">We immerse ourselves in your world, understanding your business, users, and market to identify opportunities.</p>
            </motion.div>
            <motion.div 
              className="text-center"
              variants={itemVariants}
            >
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold mb-4">Create</h3>
              <p className="text-gray-700 leading-relaxed">Our multidisciplinary team collaborates to develop innovative concepts and refine them through iterative design.</p>
            </motion.div>
            <motion.div 
              className="text-center"
              variants={itemVariants}
            >
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold mb-4">Deliver</h3>
              <p className="text-gray-700 leading-relaxed">We transform concepts into market-ready solutions, providing support throughout implementation and launch.</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Values */}
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            variants={itemVariants}
          >
            Our Values
          </motion.h2>

          <motion.div 
            className="space-y-6"
            variants={staggerContainer}
          >
            {[
              {
                title: 'Innovation',
                description: 'We push boundaries and challenge conventions to discover new possibilities.'
              },
              {
                title: 'Excellence',
                description: 'We hold ourselves to the highest standards in everything we do.'
              },
              {
                title: 'Collaboration',
                description: 'We believe the best solutions emerge from diverse perspectives working together.'
              },
              {
                title: 'Impact',
                description: 'We measure our success by the positive difference we make for users and businesses.'
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200"
                variants={itemVariants}
              >
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;