import React, { useContext } from 'react';
import { ActivityContext } from '../context/ActivityContext';
import ActivityCard from '../components/ActivityCard';
import ArchiveButton from '../components/ArchiveButton';
import TabNavigation from '../components/TabNavigation';

const ArchivedCalls = () => {
  const { activities, loading, selectedActivities, unarchiveActivity, unarchiveAllActivities } = useContext(ActivityContext);

  // Filter for only archived activities
  const archivedActivities = activities.filter(activity => activity.is_archived);

  return (
    <div className="activity-list">
      {loading ? (
        <div className="container">
          <p>Loading...</p>
        </div>
      ) : archivedActivities.length === 0 ? (
        <div className="container">
          <p className="mt-3">No archived calls available.</p>
        </div>
      ) : (
        archivedActivities.map(activity => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            isArchived={true} // Marking these as archived
          />
        ))
      )}
    </div>
  );
};

export default ArchivedCalls;
