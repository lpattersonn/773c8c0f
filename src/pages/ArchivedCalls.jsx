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
    <>
      <div className="container">
        <div className="activity-list">
          {loading ? (
            <p>Loading...</p>
          ) : archivedActivities.length === 0 ? (
            <p className="mt-3">No archived activities available.</p>
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
      </div>
    </>
  );
};

export default ArchivedCalls;
