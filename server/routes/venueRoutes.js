const express = require('express');
const router = express.Router();
const { getVenues, getVenueById, createVenue } = require('../controllers/venueController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(getVenues)
  .post(protect, admin, createVenue);

router.route('/:id')
  .get(getVenueById);

module.exports = router;
