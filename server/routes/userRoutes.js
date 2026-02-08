import express from 'express';
import {
  getUserProfile,
  getUserRegistrations,
  getAttendanceHistory,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  updateProfile,      
  changePassword
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes (user)
router.get('/profile', protect, getUserProfile);
router.get('/registrations', protect, getUserRegistrations);
router.get('/attendance', protect, getAttendanceHistory);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
// Protected routes (admin only)
router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/:id/role', protect, admin, updateUserRole);
router.delete('/:id', protect, admin, deleteUser);

export default router;