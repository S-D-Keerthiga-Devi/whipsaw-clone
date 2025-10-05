import express from 'express';
import { registerAdmin, loginUser, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router;