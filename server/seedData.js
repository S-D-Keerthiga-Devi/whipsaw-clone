import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from './models/Blog.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/whipsaw')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample blog posts
const samplePosts = [
  {
    title: 'The Future of Product Design',
    content: 'Exploring emerging trends and technologies shaping the future of product design. From AI-powered tools to sustainable materials, the landscape of product design is evolving rapidly. Designers must stay ahead of these trends to create innovative and impactful products.',
    author: 'Jane Smith',
    image: 'https://source.unsplash.com/random/800x600?design,product&sig=1',
    createdAt: new Date('2023-05-15')
  },
  {
    title: 'Sustainable Design Practices',
    content: 'How designers are incorporating sustainability into their process and outcomes. Sustainable design is no longer optional but essential for creating products that minimize environmental impact while maximizing social benefit. This article explores best practices for sustainable design.',
    author: 'John Doe',
    image: 'https://source.unsplash.com/random/800x600?sustainable,design&sig=2',
    createdAt: new Date('2023-06-22')
  },
  {
    title: 'User-Centered Design: A Case Study',
    content: 'A deep dive into how user-centered design principles transformed a failing product into a success story. By focusing on user needs, conducting thorough research, and iterating based on feedback, the team was able to create a product that truly resonated with its target audience.',
    author: 'Alex Johnson',
    image: 'https://source.unsplash.com/random/800x600?user,design&sig=3',
    createdAt: new Date('2023-07-10')
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Blog.deleteMany({});
    console.log('Cleared existing blog posts');
    
    // Insert sample posts
    const createdPosts = await Blog.insertMany(samplePosts);
    console.log(`Added ${createdPosts.length} blog posts to the database`);
    
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();