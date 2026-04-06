import axios from 'axios';

const API_URL = '/api/events';

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

export const getEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch events:', error.response?.data);
    throw error.response?.data || { error: 'Failed to fetch events' };
  }
};

export const getEvent = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch event:', error.response?.data);
    throw error.response?.data || { error: 'Failed to fetch event' };
  }
};

export const deleteEvent = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'x-auth-token': token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete event:', error.response?.data);
    throw error.response?.data || { error: 'Failed to delete event' };
  }
};
