import VoiceSession from '../models/VoiceSession.js';
import asyncHandler from 'express-async-handler'; // For handling async errors

// @desc    Create a new voice session
// @route   POST /api/voice-sessions
// @access  Private
const createVoiceSession = asyncHandler(async (req, res) => {
  const { audioUrl, transcription, reflection, duration } = req.body;

  const voiceSession = new VoiceSession({
    user: req.user._id, // Assuming user is added to req by auth middleware
    audioUrl,
    transcription,
    reflection,
    duration
  });

  const createdSession = await voiceSession.save();
  res.status(201).json(createdSession);
});

// @desc    Get user voice sessions with pagination
// @route   GET /api/voice-sessions/user/:userId
// @access  Private
const getUserVoiceSessions = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Verify user authorization
  if (req.user._id.toString() !== userId && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to access these sessions');
  }

  const sessions = await VoiceSession.getUserSessions(userId, page, limit);
  res.json(sessions);
});

// @desc    Get single voice session by ID
// @route   GET /api/voice-sessions/:id
// @access  Private
const getVoiceSessionById = asyncHandler(async (req, res) => {
  const voiceSession = await VoiceSession.findById(req.params.id).populate('user reflection');

  if (!voiceSession) {
    res.status(404);
    throw new Error('Voice session not found');
  }

  // Verify user authorization
  if (voiceSession.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to access this session');
  }

  res.json(voiceSession);
});

// @desc    Update voice session
// @route   PUT /api/voice-sessions/:id
// @access  Private
const updateVoiceSession = asyncHandler(async (req, res) => {
  const voiceSession = await VoiceSession.findById(req.params.id);

  if (!voiceSession) {
    res.status(404);
    throw new Error('Voice session not found');
  }

  // Verify user authorization
  if (voiceSession.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to update this session');
  }

  const { audioUrl, transcription, reflection, duration, status, errorMessage } = req.body;

  voiceSession.audioUrl = audioUrl || voiceSession.audioUrl;
  voiceSession.transcription = transcription || voiceSession.transcription;
  voiceSession.reflection = reflection || voiceSession.reflection;
  voiceSession.duration = duration || voiceSession.duration;
  voiceSession.status = status || voiceSession.status;
  voiceSession.errorMessage = errorMessage || voiceSession.errorMessage;

  const updatedSession = await voiceSession.save();
  res.json(updatedSession);
});

// @desc    Delete voice session
// @route   DELETE /api/voice-sessions/:id
// @access  Private
const deleteVoiceSession = asyncHandler(async (req, res) => {
  const voiceSession = await VoiceSession.findById(req.params.id);

  if (!voiceSession) {
    res.status(404);
    throw new Error('Voice session not found');
  }

  // Verify user authorization
  if (voiceSession.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to delete this session');
  }

  await voiceSession.remove();
  res.json({ message: 'Voice session removed' });
});

// @desc    Retry failed sessions
// @route   POST /api/voice-sessions/retry-failed
// @access  Private
const retryFailedSessions = asyncHandler(async (req, res) => {
  // Only allow admin users
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error('Admin access required');
  }

  const result = await VoiceSession.retryFailedSessions();
  res.json({ message: 'Retry initiated', result });
});

// @desc    Get status analytics
// @route   GET /api/voice-sessions/analytics/:startDate/:endDate
// @access  Private
const getStatusAnalytics = asyncHandler(async (req, res) => {
  // Only allow admin users
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error('Admin access required');
  }

  const { startDate, endDate } = req.params;
  const analytics = await VoiceSession.getStatusAnalytics(
    new Date(startDate),
    new Date(endDate)
  );
  res.json(analytics);
});

export {
  createVoiceSession,
  getUserVoiceSessions,
  getVoiceSessionById,
  updateVoiceSession,
  deleteVoiceSession,
  retryFailedSessions,
  getStatusAnalytics
};