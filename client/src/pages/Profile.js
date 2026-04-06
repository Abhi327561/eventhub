import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrivateRoute from '../components/PrivateRoute';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        };

        const [userRes, regRes] = await Promise.all([
          axios.get('/api/auth/me', config),
          axios.get('/api/registrations/user', config)
        ]);

        setUser(userRes.data);
        setRegistrations(regRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <PrivateRoute>
      <div className="profile-page">
        <div className="profile-header">
          <h1>My Profile</h1>
          <div className="user-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            {user.role === 'admin' && <span className="badge-admin">Admin</span>}
          </div>
        </div>

        <div className="registrations-section">
          <h2>My Event Registrations</h2>
          {registrations.length > 0 ? (
            <div className="registrations-list">
              {registrations.map(reg => (
                <div key={reg._id} className="registration-card">
                  <h3>{reg.eventId.title}</h3>
                  <p>Date: {new Date(reg.eventId.date).toLocaleDateString()}</p>
                  <p>Venue: {reg.eventId.venue.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>You have not registered for any events yet.</p>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Profile;
