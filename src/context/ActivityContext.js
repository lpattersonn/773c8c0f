import React, { createContext, useState, useEffect } from 'react';
import { fetchActivities } from '../api/activityApi';

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [selectedActivitiesFeed, setSelectedActivitiesFeed] = useState([]);  // Activity Feed selections
  const [selectedActivitiesArchived, setSelectedActivitiesArchived] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAllArchived, setIsAllArchived] = useState(false); // Track if all are archived

  // Fetch activities from the API
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

  // Unarchive a single activity
  const unarchiveActivity = (id) => {
    setActivities(activities.map(activity =>
      activity.id === id ? { ...activity, is_archived: false } : activity
    ));
  };

  // Archive all activities (in Feed tab)
  const archiveAllActivities = () => {
    const updatedActivities = activities.map(activity =>
      selectedActivitiesFeed.includes(activity.id)
        ? { ...activity, is_archived: true }
        : activity
    );
    setActivities(updatedActivities);
    setSelectedActivitiesFeed([]); // Clear selections after archiving
  };

  // Unarchive all activities (in Archived tab)
  const unarchiveAllActivities = () => {
    const updatedActivities = activities.map(activity =>
      selectedActivitiesArchived.includes(activity.id)
        ? { ...activity, is_archived: false }
        : activity
    );
    setActivities(updatedActivities);
    setSelectedActivitiesArchived([]); // Clear selections after unarchiving
  };

  // Toggle activity selection (individual)
  const toggleSelectActivity = (id, isArchived) => {
    if (isArchived) {
      setSelectedActivitiesArchived(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    } else {
      setSelectedActivitiesFeed(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    }
  };

  // Select all activities (either Feed or Archived)
  const selectAllActivities = (isArchived) => {
    const allIds = activities.map(a => a.id);
    if (isArchived) {
      setSelectedActivitiesArchived(allIds);
    } else {
      setSelectedActivitiesFeed(allIds);
    }
  };

  // Unselect all activities (either Feed or Archived)
  const unselectAllActivities = (isArchived) => {
    if (isArchived) {
      setSelectedActivitiesArchived([]);
    } else {
      setSelectedActivitiesFeed([]);
    }
  };

  // Archive or Unarchive selected activities
  const onArchive = (action, selectedActivities) => {
    if (action === 'archive') {
      const updatedActivities = activities.map(activity =>
        selectedActivities.includes(activity.id)
          ? { ...activity, is_archived: true }
          : activity
      );
      setActivities(updatedActivities);
    } else if (action === 'unarchive') {
      const updatedActivities = activities.map(activity =>
        selectedActivities.includes(activity.id)
          ? { ...activity, is_archived: false }
          : activity
      );
      setActivities(updatedActivities);
    }
  };

  return (
    <ActivityContext.Provider value={{
      activities, loading,
      archiveActivity, unarchiveActivity,
      archiveAllActivities, unarchiveAllActivities,
      isAllArchived, onArchive,
      selectedActivitiesFeed, selectedActivitiesArchived, 
      toggleSelectActivity,
      selectAllActivities, unselectAllActivities
    }}>
      {children}
    </ActivityContext.Provider>
  );
};
