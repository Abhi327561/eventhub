import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import './Home.css';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/events?limit=3');
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to EventHub</h1>
        <p>Discover and create amazing events in your area</p>
      </section>

      <section className="featured-events">
        <h2>Featured Events</h2>
        <div className="events-grid">
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
