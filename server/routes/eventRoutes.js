const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.route('/')
  .get(eventController.getEvents)
  .post(protect, eventController.createEvent);

// Protected admin routes
router.route('/:id')
  .get(eventController.getEvent)
  .put(protect, admin, eventController.updateEvent)
  .delete(protect, admin, eventController.deleteEvent);

module.exports = router;
