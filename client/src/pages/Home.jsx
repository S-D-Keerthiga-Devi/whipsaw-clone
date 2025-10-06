// Home.jsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContent = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const letterAnimation = {
    initial: { opacity: 0, y: 50, rotateX: -90 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.03,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    })
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Sample projects data (same as in Work.jsx)
  const sampleProjects = [
    {
      id: 1,
      title: 'Autonomous Vehicle Interface',
      category: 'digital',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      client: 'Future Motors',
      year: '2023',
      description: 'A revolutionary interface design for autonomous vehicles that enhances user experience and safety through intuitive controls and real-time feedback systems.',
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
    }
  ];

  // Project Card Component
  const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px", amount: 0.3 });
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        ref={cardRef}
        className="group relative overflow-hidden rounded-lg shadow-lg bg-white cursor-pointer"
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={isInView ? {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.6, 0.05, 0.01, 0.9]
          }
        } : { opacity: 0, y: 60, scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -12, scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
      >
        <motion.div
          className="relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-80 object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-8 w-full">
            <motion.h3
              className="text-white text-2xl font-bold"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {project.title}
            </motion.h3>
            <motion.p
              className="text-gray-200 mt-2 font-light"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              {project.client} • {project.year}
            </motion.p>
            {/* View Project button removed */}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Marquee Component
  const Marquee = ({ children, reverse = false, pauseOnHover = false }) => {
    return (
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-4 py-4"
          animate={{
            x: reverse ? [0, -1000] : [-1000, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
        >
          {children}
          {children}
        </motion.div>
      </div>
    );
  };

  // Review Card Component
  const ReviewCard = ({ img, name, username, body }) => {
    return (
      <figure className="relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border border-gray-950/10 bg-gray-950/5 hover:bg-gray-950/10 p-4 transition-colors">
        <div className="flex flex-row items-center gap-2">
          <img className="rounded-full" width="32" height="32" alt="" src={img} />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium text-white/60">{username}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm text-white/80">{body}</blockquote>
      </figure>
    );
  };

  const reviews = [
    {
      name: "Google Chromecast",
      username: "Consumer Electronics",
      body: "Best-selling streaming device that revolutionized how people watch content. Design excellence meets mass-market appeal.",
      img: "https://avatar.vercel.sh/google",
    },
    {
      name: "Dell Precision",
      username: "Professional Computing",
      body: "Ground-up workstation design with innovative diamond-perforated cooling that's 85% open yet visually solid. Award-winning performance.",
      img: "https://avatar.vercel.sh/dell",
    },
    {
      name: "Tonal Fitness",
      username: "Wellness & Fitness",
      body: "Intelligent home gym system combining cutting-edge design with revolutionary strength training technology.",
      img: "https://avatar.vercel.sh/tonal",
    },
    {
      name: "Google OnHub",
      username: "Connected Home",
      body: "Beautiful router design that brought elegance to networking. Clean, purposeful aesthetics meet powerful functionality.",
      img: "https://avatar.vercel.sh/onhub",
    },
    {
      name: "Dropcam Security",
      username: "Home Security",
      body: "Pioneering smart home security camera with seamless user experience. Design that builds trust and confidence.",
      img: "https://avatar.vercel.sh/dropcam",
    },
    {
      name: "Medical Devices",
      username: "Healthcare Innovation",
      body: "Award-winning medical and wellness products combining industrial design with biotech precision. Over 300+ design awards.",
      img: "https://avatar.vercel.sh/medical",
    },
  ];

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  // Service Card Component
  const ServiceCard = ({ service, index }) => {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 10;
      const y = (e.clientY - rect.top - rect.height / 2) / 10;
      setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: 0, y: 0 });
    };

    return (
      <motion.div
        ref={cardRef}
        className="bg-gray-50 p-8 rounded-lg relative overflow-hidden cursor-pointer"
        variants={fadeIn}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          transition: { duration: 0.3 }
        }}
        style={{
          x: mousePos.x,
          y: mousePos.y,
        }}
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0`}
          whileHover={{ opacity: 0.05 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="text-4xl mb-4 relative z-10"
          animate={{
            rotateY: mousePos.x * 2,
            rotateX: -mousePos.y * 2,
          }}
          transition={{ duration: 0.1 }}
        >
          {service.icon}
        </motion.div>

        <motion.h3
          className="text-2xl font-bold mb-3 relative z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          {service.title}
        </motion.h3>

        <motion.p
          className="text-gray-600 relative z-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
          {service.description}
        </motion.p>

        <motion.div
          className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-10"
          style={{
            background: `linear-gradient(to top left, ${service.color.includes('blue') ? '#3B82F6' : service.color.includes('purple') ? '#A855F7' : '#F97316'}, transparent)`
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
        />
      </motion.div>
    );
  };

  return (
    <motion.div
      ref={containerRef}
      initial="initial"
      animate="animate"
      exit="exit"
      className="overflow-hidden relative" // Added relative positioning
    >
      {/* Hero Section with Parallax and Marquee */}
      <section className="h-screen relative flex flex-col items-center justify-center bg-black text-white overflow-hidden pt-24 mt-20">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: videoScale }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-32809-large.mp4" type="video/mp4" />
          </video>
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-30"
            whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center flex-1 flex flex-col justify-center"
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            x: mousePosition.x,
            y: mousePosition.y
          }}
        >
          <motion.h1
            className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8 tracking-tight"
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.02, textShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }}
            transition={{ duration: 0.3 }}
          >
            {"Design that Matters".split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterAnimation}
                style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-12 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
            whileHover={{ scale: 1.02, color: "#E5E7EB" }}
          >
            We create innovative products, experiences, and brands that transform businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.3, ease: [0.6, 0.05, 0.01, 0.9] }}
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={scrollToContent}
              className="bg-white text-black px-10 py-4 rounded-md font-medium hover:bg-gray-100 transition-colors text-lg shadow-lg relative overflow-hidden group"
            >
              <span 
              onClick={()=> navigate('/work')}
              className="relative z-10">Explore Our Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </button>
          </motion.div>
        </motion.div>

        {/* Marquee Section */}
        <motion.div
          className="w-full z-10 pb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="relative w-full">
            <Marquee pauseOnHover>
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover>
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>

            {/* Gradient overlays */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <button
              onClick={scrollToContent}
              className="text-white focus:outline-none"
              aria-label="Scroll down"
            >
              <motion.svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </motion.svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section ref={scrollRef} className="py-10 sm:py-16 md:py-20 bg-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-100 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            <motion.h2
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Featured Projects
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore some of our recent work that showcases our design expertise.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {sampleProjects.slice(0, 3).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/work"
              className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-10 sm:py-16 md:py-20 bg-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-100 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            <motion.h2
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our Services
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We offer comprehensive design solutions tailored to your unique needs.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { title: 'Product Design', icon: '📱', description: 'Creating innovative physical and digital products that solve real problems.', color: 'from-blue-500 to-cyan-500' },
              { title: 'UX/UI Design', icon: '🖥️', description: 'Crafting intuitive and engaging user experiences across all platforms.', color: 'from-purple-500 to-pink-500' },
              { title: 'Brand Strategy', icon: '🎯', description: 'Developing compelling brand identities that resonate with your audience.', color: 'from-orange-500 to-red-500' },
            ].map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-16 md:py-20 bg-black text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3), transparent 50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "linear-gradient(45deg, transparent 30%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)",
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            {"Ready to transform your ideas into reality?".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            className="text-xl max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            Let's collaborate to create something extraordinary together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/contact"
                className="inline-block bg-white text-black px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-200 transition-colors relative overflow-hidden group"
              >
                <span className="relative z-10">Get in Touch</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300"
                  initial={{ x: "-100%", rotate: -10 }}
                  whileHover={{ x: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Animated particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;