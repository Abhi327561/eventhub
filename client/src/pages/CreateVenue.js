import React from 'react';
import PrivateRoute from '../components/PrivateRoute';
import VenueForm from '../components/VenueForm';
import AdminRoute from '../components/AdminRoute';
import './CreateVenue.css';

const CreateVenue = () => {
  return (
    <PrivateRoute>
      <AdminRoute>
        <div className="create-venue-page">
          <h1>Create New Venue</h1>
          <VenueForm />
        </div>
      </AdminRoute>
    </PrivateRoute>
  );
};

export default CreateVenue;
