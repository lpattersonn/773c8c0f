import React, { createContext, useState, useEffect } from 'react';

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('https://aircall-api.onrender.com/activities')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched activities:', data);
        setActivities(data);
      })
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  return (
    <ActivityContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivityContext.Provider>
  );
};
