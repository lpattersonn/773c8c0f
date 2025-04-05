import React, { useContext } from 'react';
import { ActivityContext } from '../context/ActivityContext';
import ActivityCard from '../components/ActivityCard';

const ActivityFeed = () => {
  const { activities, loading, selectedActivitiesFeed } = useContext(ActivityContext);

  // Filter out archived activities
  const nonArchivedActivities = activities.filter(activity => !activity.is_archived);

  return (
    <div className="activity-list">
      {loading ? (
        <div className="container">
          <p>Loading...</p>
        </div>
      ) : nonArchivedActivities.length === 0 ? (
        <div className="container">
          <p className='mt-3'>No calls available.</p>
        </div>
      ) : (
        nonArchivedActivities.map(activity => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            isArchived={false} // Initial archive arguments
          />
        ))
      )}
    </div>
  );
};

export default ActivityFeed;
