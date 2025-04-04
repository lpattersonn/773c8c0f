import React, { createContext, useState, useEffect } from 'react';
import { fetchActivities } from '../api/activityApi';

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
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

  console.log(activities);

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
    const updatedActivities = activities.map(activity =>
      selectedActivities.includes(activity.id)
        ? { ...activity, is_archived: !isAllArchived }
        : activity
    );
    setActivities(updatedActivities);
    setIsAllArchived(!isAllArchived);
    setSelectedActivities([]); // optionally clear selection
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


  const toggleSelectActivity = (id) => {
    setSelectedActivities(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  const selectAllActivities = () => {
    const allIds = activities.map(a => a.id);
    setSelectedActivities(allIds);
  };
  
  const unselectAllActivities = () => {
    setSelectedActivities([]);
  };
  

  return (
    <ActivityContext.Provider value={{
      activities, loading,
      archiveActivity, unarchiveActivity,
      archiveAllActivities, unarchiveAllActivities,
      isAllArchived,
      selectedActivities, toggleSelectActivity,
      selectAllActivities, unselectAllActivities
    }}>
      {children}
    </ActivityContext.Provider>
  );
};
