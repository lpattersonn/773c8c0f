import React, { createContext, useState, useEffect } from 'react';
import { fetchActivities } from '../api/activityApi';

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAllArchived, setIsAllArchived] = useState(false); // Track if all are archived

  useEffect(() => {
    const getActivities = async () => {
      const data = await fetchActivities();
      setActivities(data);
      setLoading(false);
    };

    getActivities();
  }, []);

  // Archive a single activity
  const archiveActivity = (id) => {
    setActivities(activities.map(activity =>
      activity.id === id ? { ...activity, is_archived: !activity.is_archived } : activity
    ));
  };

  // unarchive a single activity
  const unarchiveActivity = (id) => {
    setActivities(activities.map(activity =>
      activity.id === id ? { ...activity, is_archived: false } : activity
    ));
  };

  // Archive all activities
  const archiveAllActivities = () => {
    const updatedActivities = activities.map(activity => ({
      ...activity,
      is_archived: !isAllArchived, // Toggle all activities' archived status
    }));
    setActivities(updatedActivities);
    setIsAllArchived(!isAllArchived); // Toggle the all-archived state
  };

  // Unarchive all activities (in Archived tab)
  const unarchiveAllActivities = () => {
    const updatedActivities = activities.map(activity => ({
      ...activity,
      is_archived: false, // Set all to unarchived
    }));
    setActivities(updatedActivities);
    setIsAllArchived(false); // Reset archived state
  };

  return (
    <ActivityContext.Provider value={{ activities, loading, archiveActivity, unarchiveActivity, archiveAllActivities, unarchiveAllActivities, isAllArchived }}>
      {children}
    </ActivityContext.Provider>
  );
};
