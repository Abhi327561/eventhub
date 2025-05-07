const Event = require('../models/Event');
const User = require('../models/User');
const Venue = require('../models/Venue');
const asyncHandler = require('express-async-handler');

const checkEventOwnership = async (eventId, userId) => {
  const event = await Event.findById(eventId);
  if (!event) return { error: 'Event not found' };
  if (event.createdBy.toString() !== userId) return { error: 'Not authorized' };
  return { event };
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private
exports.createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, venueId, category, price, organizerPhone } = req.body;
  
  // Verify venue exists
  const venue = await Venue.findById(venueId);
  if (!venue) {
    res.status(400);
    throw new Error('Venue not found');
  }
  
  // Validate required fields
  if (!title || !description || !date || !venueId || !category || !organizerPhone) {
    res.status(400);
    throw new Error('Please include all required fields');
  }

  const event = await Event.create({
    title,
    description,
    date,
    venue: {
      id: venue._id,
      name: venue.name,
      address: venue.address,
      capacity: venue.capacity,
      fee: venue.fee
    },
    category,
    price: price || 0,
    organizer: {
      id: req.user._id,
      name: req.user.name,
      phone: organizerPhone
    },
    createdBy: req.user._id
  });

  res.status(201).json(event);
});

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find()
    .sort({ date: -1 })
    .populate('createdBy', 'name email');
  res.json(events);
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate('createdBy', 'name email');
  
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }
  
  res.json(event);
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
exports.updateEvent = asyncHandler(async (req, res) => {
  const { title, description, date, venueId, category, price } = req.body;

  // Check if event exists and user has permission
  const { error, event } = await checkEventOwnership(req.params.id, req.user.id);
  if (error) {
    res.status(404);
    throw new Error(error);
  }

  let venueUpdate = event.venue;
  if (venueId) {
    const venue = await Venue.findById(venueId);
    if (!venue) {
      res.status(400);
      throw new Error('Venue not found');
    }
    venueUpdate = {
      id: venue._id,
      name: venue.name,
      address: venue.address,
      capacity: venue.capacity,
      fee: venue.fee
    };
  }

  // Update fields
  const updatedFields = {
    title: title || event.title,
    description: description || event.description,
    date: date || event.date,
    venue: venueUpdate,
    category: category || event.category,
    price: price !== undefined ? price : event.price
  };

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    { $set: updatedFields },
    { new: true, runValidators: true }
  );

  res.json(updatedEvent);
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
exports.deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }
  
  await event.deleteOne();
  res.json({ msg: 'Event removed successfully' });
});