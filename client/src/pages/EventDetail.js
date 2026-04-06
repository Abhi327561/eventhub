import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, registrationsRes] = await Promise.all([
          axios.get(`/api/events/${id}`),
          currentUser ? axios.get('/api/registrations', {
            headers: {
              'x-auth-token': localStorage.getItem('token')
            }
          }) : Promise.resolve({ data: { data: [] } })
        ]);

        setEvent(eventRes.data);
        setIsRegistered(
          registrationsRes.data.data.some(reg => reg.eventId === id)
        );
      } catch (err) {
        console.error('Fetch error:', err);
        setRegistrationStatus('Error loading event data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentUser]);

  const handleRegister = async () => {
    try {
      setRegistrationStatus('Processing...');
      
      const res = await axios.post('/api/registrations', 
        { eventId: id },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
          }
        }
      );

      if (res.data.success) {
        setIsRegistered(true);
        setRegistrationStatus('Registration successful!');
      } else {
        setRegistrationStatus(res.data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setRegistrationStatus(
        err.response?.data?.error || 
        'Error during registration. Please try again.'
      );
    }
  };

  if (loading) return <div className="loading">Loading event details...</div>;
  if (!event) return <div className="error">Event not found</div>;

  return (
    <div className="event-detail">
      <div className="event-header">
        <h1>{event.title}</h1>
        <span className="event-category">{event.category}</span>
      </div>

      <div className="event-meta">
        <p>
          <strong>Date:</strong> {new Date(event.date).toLocaleString()}
        </p>
        <p>
          <strong>Venue:</strong> {event.venue.name}, {event.venue.address}
        </p>
        <p>
          <strong>Price:</strong> ${event.price}
        </p>
      </div>

      <div className="event-description">
        <h3>Description</h3>
        <p>{event.description}</p>
      </div>

      {currentUser && (
        <div className="event-actions">
          {isRegistered ? (
            <div className="alert success">
              You are registered for this event!
            </div>
          ) : (
            <>
              <button 
                onClick={handleRegister} 
                className="btn register-btn"
              >
                Register Now
              </button>

              {registrationStatus && (
                <div className={`alert ${registrationStatus.includes('success') ? 'success' : 'error'}`}>
                  {registrationStatus}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EventDetail;
