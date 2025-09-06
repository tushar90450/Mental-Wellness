import express from 'express';
import {
  createVoiceSession,
  getUserVoiceSessions,
  getVoiceSessionById,
  updateVoiceSession,
  deleteVoiceSession,
  retryFailedSessions,
  getStatusAnalytics
} from '../controllers/voiceSession.controller.js';
import { protect } from '../middleware/authMiddleware.js'; // Assuming authentication middleware

const router = express.Router();

// Create a new voice session
router.post('/', protect, createVoiceSession);

// Get all voice sessions for a user with pagination
router.get('/user/:userId', protect, getUserVoiceSessions);

// Get a single voice session by ID
router.get('/:id', protect, getVoiceSessionById);

// Update a voice session
router.put('/:id', protect, updateVoiceSession);

// Delete a voice session
router.delete('/:id', protect, deleteVoiceSession);

// Retry failed sessions
router.post('/retry-failed', protect, retryFailedSessions);

// Get status analytics
router.get('/analytics/:startDate/:endDate', protect, getStatusAnalytics);

export default router;