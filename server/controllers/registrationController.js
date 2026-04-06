const Registration = require('../models/Registration');
const Event = require('../models/Event');

// Register for event
const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;
    const userEmail = req.user.email;

    // Validate input
    if (!eventId) {
      return res.status(400).json({ 
        success: false,
        error: 'Event ID is required'
      });
    }

    // Check event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ 
        success: false,
        error: 'Event not found' 
      });
    }

    // Check event capacity
    if (event.capacity) {
      const registrationsCount = await Registration.countDocuments({ eventId });
      if (registrationsCount >= event.capacity) {
        return res.status(400).json({
          success: false,
          error: 'Event has reached maximum capacity'
        });
      }
    }

    // Check existing registration
    const existingRegistration = await Registration.findOne({ eventId, userId });
    if (existingRegistration) {
      return res.status(400).json({ 
        success: false,
        error: 'Already registered for this event' 
      });
    }

    // Create registration
    const registration = await Registration.create({
      eventId,
      userId,
      email: userEmail,
      registeredAt: new Date()
    });

    return res.status(201).json({
      success: true,
      data: registration,
      message: 'Registration successful'
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error during registration'
    });
  }
};

// Get user registrations
const getUserRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ userId: req.user.id })
      .populate('eventId')
      .sort('-registeredAt');

    return res.json({
      success: true,
      count: registrations.length,
      data: registrations
    });

  } catch (error) {
    console.error('Get registrations error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error fetching registrations'
    });
  }
};

module.exports = {
  registerForEvent,
  getUserRegistrations
};
