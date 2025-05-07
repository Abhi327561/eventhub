// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { protect, admin } = require('../middleware/auth');

// Regular user routes
router.route('/')
  .get(eventController.getEvents)
  .post(protect, eventController.createEvent);

// Protected admin routes
router.route('/:id')
  .get(eventController.getEvent)
  .put(protect, admin, eventController.updateEvent)  // Requires admin
  .delete(protect, admin, eventController.deleteEvent);  // Requires admin

module.exports = router;