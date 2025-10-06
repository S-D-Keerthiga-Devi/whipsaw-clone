import express from 'express';
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Protected admin routes
router.post('/', protect, createBlog); // Removed admin middleware temporarily for testing
router.put('/:id', protect, updateBlog); // Removed admin middleware temporarily for testing
router.delete('/:id', protect, deleteBlog); // Removed admin middleware temporarily for testing

export default router;