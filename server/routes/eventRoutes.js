import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventAttendees,
  cancelEvent
} from '../controllers/eventController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/:id/register', protect, registerForEvent);
router.delete('/:id/register', protect, unregisterFromEvent);

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected routes (admin only)
router.post('/', protect, admin, createEvent);
router.put('/:id', protect, admin, updateEvent);
router.delete('/:id', protect, admin, deleteEvent);
router.get('/:id/attendees', protect, admin, getEventAttendees);
router.post('/:id/cancel', protect, admin, cancelEvent);

export default router;

// Note: The getEventById route is public but returns additional info if user is logged in (handled in controller).
