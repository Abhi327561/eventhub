import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './VenueSelection.css';

const VenueSelection = ({ onVenueSelect }) => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get('/api/venues');
        const venuesData = Array.isArray(res.data) ? res.data : 
                         res.data.data ? res.data.data : 
                         [];
        setVenues(venuesData);
      } catch (err) {
        console.error(err);
        setError('Failed to load venues');
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  if (loading) return <div>Loading venues...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!venues.length) return <div>No venues available</div>;

  const handleSelect = (venue) => {
    setSelectedVenue(venue);
  };

  const handleConfirm = () => {
    if (selectedVenue) {
      onVenueSelect(selectedVenue);
      navigate('/create-event', { state: { venue: selectedVenue } });
    }
  };

  return (
    <div className="venue-selection">
      <h2>Select a Venue</h2>
      <div className="venue-list">
        {venues.map(venue => (
          <div 
            key={venue._id} 
            className={`venue-card ${selectedVenue?._id === venue._id ? 'selected' : ''}`}
            onClick={() => handleSelect(venue)}
          >
            <h3>{venue.name}</h3>
            <p>Address: {venue.address}</p>
            <p>Capacity: {venue.capacity}</p>
            <p>Rental Fee: ${venue.fee}</p>
          </div>
        ))}
      </div>
      <button 
        className="confirm-btn" 
        onClick={handleConfirm}
        disabled={!selectedVenue}
      >
        Confirm Selection
      </button>
    </div>
  );
};

export default VenueSelection;
