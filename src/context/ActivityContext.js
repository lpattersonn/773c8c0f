import React, { createContext, useState, useEffect } from 'react';
import { fetchActivities } from '../api/activityApi';

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [selectedActivitiesFeed, setSelectedActivitiesFeed] = useState([]); // Activity Feed selections
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
  const toggleSelectActivity = (activityId, isArchived) => {
    if (isArchived) {
      // If the activity is archived, toggle its selection in selectedActivitiesArchived
      setSelectedActivitiesArchived((prevSelected) => {
        if (prevSelected.includes(activityId)) {
          // If it's already selected, unselect it
          return prevSelected.filter((id) => id !== activityId);
        } else {
          // If it's not selected, select it
          return [...prevSelected, activityId];
        }
      });
    } else {
      // If the activity is from the feed, toggle its selection in selectedActivitiesFeed
      setSelectedActivitiesFeed((prevSelected) => {
        if (prevSelected.includes(activityId)) {
          // If it's already selected, unselect it
          return prevSelected.filter((id) => id !== activityId);
        } else {
          // If it's not selected, select it
          return [...prevSelected, activityId];
        }
      });
    }
  };

  // Select all activities (either Feed or Archived)
  const selectAllActivities = (activities, isArchived) => {
    if (isArchived) {
      // Select all archived activities
      setSelectedActivitiesArchived(activities.map(a => a.id));
    } else {
      // Select all feed activities
      setSelectedActivitiesFeed(activities.map(a => a.id));
    }
  };

  // Unselect all activities (either Feed or Archived)
  const unselectAllActivities = (activities, isArchived) => {
    if (isArchived) {
      // Unselect all archived activities
      setSelectedActivitiesArchived([]);
    } else {
      // Unselect all feed activities
      setSelectedActivitiesFeed([]);
    }
  };

  // Archive or Unarchive selected activities
  const onArchive = (action, selectedIds) => {
    // Update the activities list based on the action
    const updatedActivities = activities.map((activity) =>
      selectedIds.includes(activity.id)
        ? { ...activity, is_archived: action === 'archive' }
        : activity
    );
  
    setActivities(updatedActivities);
  
    // Clear selected items after action
    setSelectedActivitiesFeed([]);
    setSelectedActivitiesArchived([]);
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
