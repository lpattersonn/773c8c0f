import React, { useContext } from 'react';
import { ActivityContext } from '../context/ActivityContext';
import ActivityCard from '../components/ActivityCard';
import ArchiveButton from '../components/ArchiveButton';
import TabNavigation from '../components/TabNavigation';

const ArchivedCalls = () => {
  const { activities, loading, unarchiveActivity, unarchiveAllActivities } = useContext(ActivityContext);

  return (
    <>
      <div className="container">
        <div className="activity-list">
          {loading ? (
            <p>Loading...</p>
          ) : activities.length === 0 ? (
            <p>No archived activities available.</p>
          ) : (
            activities
              .filter(activity => activity.is_archived) // Only show archived activities
              .map(activity => (
                  <div key={activity.id} onClick={() => unarchiveActivity(activity.id)}>
                      <ActivityCard activity={activity} />
                  </div>
              ))
          )}
        </div>
      </div>
    </>
  );
};

export default ArchivedCalls;
