import React, { createContext, useState } from 'react';

export const VenueContext = createContext();

export const VenueProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);

  return (
    <VenueContext.Provider value={{ venues, setVenues }}>
      {children}
    </VenueContext.Provider>
  );
};
