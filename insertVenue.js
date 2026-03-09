require('dotenv').config();
const connectDB = require('../config/db');
const Venue = require('../models/Venue');

const sampleVenues = [
  {
    name: "Grand Ballroom",
    address: "123 Main St, New York, NY",
    capacity: 500,
    fee: 2500,
    amenities: ["Stage", "Sound System", "Projector"],
    contactPhone: "5551234567"
  },
  {
    name: "Tech Conference Center",
    address: "456 Tech Blvd, San Francisco, CA",
    capacity: 300,
    fee: 1800,
    amenities: ["WiFi", "Whiteboards", "Video Conferencing"],
    contactPhone: "5559876543"
  }
];

const insertVenues = async () => {
  try {
    await connectDB();
    
    // Clear existing venues
    await Venue.deleteMany();
    console.log('Cleared existing venues');
    
    // Insert new venues
    const createdVenues = await Venue.insertMany(sampleVenues);
    console.log(`${createdVenues.length} venues inserted`);
    
    process.exit(0);
  } catch (err) {
    console.error('Error inserting venues:', err);
    process.exit(1);
  }
};

insertVenues();