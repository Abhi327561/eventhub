import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './VenueForm.css';

const VenueForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    capacity: '',
    fee: '',
    amenities: '',
    contactPhone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const amenitiesArray = formData.amenities 
        ? formData.amenities.split(',').map(item => item.trim())
        : [];

      await axios.post('/api/venues', {
        ...formData,
        capacity: Number(formData.capacity),
        fee: Number(formData.fee),
        amenities: amenitiesArray
      }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });

      navigate('/venues');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create venue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="venue-form">
      <h2>Create New Venue</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Venue Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Rental Fee ($)</label>
          <input
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Amenities (comma separated)</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            placeholder="WiFi, Projector, Parking"
          />
        </div>

        <div className="form-group">
          <label>Contact Phone</label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Venue'}
        </button>
      </form>
    </div>
  );
};

export default VenueForm;
