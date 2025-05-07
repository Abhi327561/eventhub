// frontend/src/pages/CreateEvent.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import VenueSelection from '../components/VenueSelection';
import EventForm from '../components/EventForm';
import './CreateEvent.css';

const CreateEvent = () => {
  const location = useLocation();
  const [selectedVenue, setSelectedVenue] = useState(location.state?.venue || null);

  if (!selectedVenue) {
    return (
      <PrivateRoute>
        <div className="create-event-page">
          <VenueSelection onVenueSelect={setSelectedVenue} />
        </div>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute>
      <div className="create-event-page">
        <h1>Create New Event</h1>
        <EventForm selectedVenue={selectedVenue} />
      </div>
    </PrivateRoute>
  );
};

export default CreateEvent;