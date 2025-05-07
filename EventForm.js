// frontend/src/components/EventForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/events';
import './EventForm.css';

const EventForm = ({ selectedVenue }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: 'music',
    price: 0,
    organizerPhone: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const categories = ['music', 'sports', 'arts', 'business', 'food', 'technology', 'hackathon', 'cultural', 'other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const eventData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: formData.date,
        venue: {
          id: selectedVenue._id,
          name: selectedVenue.name,
          address: selectedVenue.address,
          capacity: selectedVenue.capacity,
          fee: selectedVenue.fee
        },
        category: formData.category,
        price: Number(formData.price) || 0,
        organizerPhone: formData.organizerPhone
      };

      if (!eventData.title || !eventData.description || !eventData.date || !eventData.organizerPhone) {
        throw new Error('Please fill all required fields');
      }

      const createdEvent = await createEvent(eventData);
      
      if (!createdEvent?._id) {
        throw new Error('Invalid response from server');
      }

      navigate(`/events/${createdEvent._id}`);
      
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          'Failed to create event';
      setError(errorMessage);
      
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-form-container">
      <h2>Create New Event</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="venue-info">
        <h3>Selected Venue</h3>
        <p><strong>Name:</strong> {selectedVenue.name}</p>
        <p><strong>Address:</strong> {selectedVenue.address}</p>
        <p><strong>Capacity:</strong> {selectedVenue.capacity}</p>
        <p><strong>Venue Fee:</strong> ${selectedVenue.fee}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date and Time</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Organizer Phone</label>
          <input
            type="tel"
            name="organizerPhone"
            value={formData.organizerPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Ticket Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;