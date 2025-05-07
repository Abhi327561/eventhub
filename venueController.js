const Venue = require('../models/Venue');
const asyncHandler = require('express-async-handler');

// @desc    Get all venues
// @route   GET /api/venues
// @access  Public
exports.getVenues = asyncHandler(async (req, res) => {
  const venues = await Venue.find({});
  res.json({
    success: true,
    count: venues.length,
    data: venues
  });
});

// @desc    Get single venue
// @route   GET /api/venues/:id
// @access  Public
exports.getVenueById = asyncHandler(async (req, res) => {
  const venue = await Venue.findById(req.params.id);
  
  if (!venue) {
    res.status(404);
    throw new Error('Venue not found');
  }
  
  res.json({
    success: true,
    data: venue
  });
});

// @desc    Create venue
// @route   POST /api/venues
// @access  Private/Admin
exports.createVenue = asyncHandler(async (req, res) => {
  const { name, address, capacity, fee, amenities, contactPhone } = req.body;
  
  const venue = await Venue.create({
    name,
    address,
    capacity,
    fee,
    amenities,
    contactPhone
  });
  
  res.status(201).json({
    success: true,
    data: venue
  });
});