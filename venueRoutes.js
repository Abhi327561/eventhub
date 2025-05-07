const express = require('express');
const router = express.Router();
const { getVenues, getVenueById } = require('../controllers/venueController');
// Remove or correct this line if you're not using auth middleware:
// const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getVenues);
  // If you want to protect the route:
  // .post(protect, admin, venueController.createVenue);

router.route('/:id')
  .get(getVenueById);

module.exports = router;