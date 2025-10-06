import express from 'express';
import { getAllWork, getWorkById, createWork, updateWork, deleteWork } from '../controllers/workController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllWork);
router.get('/:id', getWorkById);

// Protected routes (admin only)
router.post('/', protect, admin, createWork);
router.put('/:id', protect, admin, updateWork);
router.delete('/:id', protect, admin, deleteWork);

export default router;