const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  category: {
    type: String,
    required: true,
    enum: ['music', 'sports', 'arts', 'business', 'food', 'technology', 'hackathon', 'cultural', 'other'],
    default: 'other'
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  venue: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Venue',
      required: true
    },
    name: String,
    address: String,
    capacity: Number,
    fee: Number
  },
  organizer: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: String,
    phone: {
      type: String,
      required: [true, 'Organizer phone is required'],
      validate: {
        validator: function(v) {
          return /^\d{10,15}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', eventSchema);