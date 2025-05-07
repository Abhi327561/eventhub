import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/events');
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response.data);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category === filter);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>
      
      <div className="events-filter">
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
          <option value="arts">Arts</option>
          <option value="business">Business</option>
          <option value="food">Food</option>
          <option value="technology">Technology</option>
          <option value="hackathon">Hackathon</option>
          <option value="cultural">cultural</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <p>No events found in this category</p>
        )}
      </div>
    </div>
  );
};

export default Events;