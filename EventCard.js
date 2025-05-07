import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      
      <div className="event-details">
        <h3>{event.title}</h3>
        <p className="event-category">{event.category}</p>
        <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
        <p className="event-venue">{event.venue.name}</p>
        <p className="event-price">${event.price}</p>
        {event.createdBy && typeof event.createdBy === 'object' && (
          <p className="event-creator">Organizer: {event.createdBy.name}</p>
        )}
        <Link to={`/events/${event._id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;