import axios from 'axios';

const API_URL = '/api/events'; // Base URL set in package.json proxy

// Create new event
export const createEvent = async (eventData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, eventData, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Event creation failed:', error.response?.data);
    throw error.response?.data || { error: 'Event creation failed' };
  }
};

// Other event-related API calls can go here too
export const getEvents = async () => {
  // ... implementation
};