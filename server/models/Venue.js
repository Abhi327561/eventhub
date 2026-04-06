const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Venue name is required'],
    unique: true,
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1']
  },
  fee: {
    type: Number,
    required: [true, 'Rental fee is required'],
    min: [0, 'Fee cannot be negative']
  },
  amenities: {
    type: [String],
    default: []
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    validate: {
      validator: function(v) {
        return /^\d{10,15}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  images: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
venueSchema.index({ name: 'text', address: 'text' });

module.exports = mongoose.model('Venue', venueSchema);
