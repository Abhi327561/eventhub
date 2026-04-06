import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PrivateRoute from '../components/PrivateRoute';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const config = {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        };
        const res = await axios.get('/api/events', config);
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const deleteEvent = async (id) => {
    try {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      };
      await axios.delete(`/api/events/${id}`, config);
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <PrivateRoute adminOnly>
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <div className="events-list">
          {events.map(event => (
            <div key={event._id} className="admin-event-card">
              <h3>{event.title}</h3>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <button 
                onClick={() => deleteEvent(event._id)}
                className="btn btn-danger"
              >
                Delete Event
              </button>
            </div>
          ))}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminDashboard;
