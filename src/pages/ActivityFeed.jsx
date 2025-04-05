import React, { useContext } from 'react';
import { ActivityContext } from '../context/ActivityContext';
import ActivityCard from '../components/ActivityCard';

const ActivityFeed = () => {
  const { activities, loading, selectedActivitiesFeed } = useContext(ActivityContext);

  // Filter out archived activities
  const nonArchivedActivities = activities.filter(activity => !activity.is_archived);

  return (
    <div className="container">
      <div className="activity-list">
        {loading ? (
          <p>Loading...</p>
        ) : nonArchivedActivities.length === 0 ? (
          <p className='mt-3'>No activities available.</p>
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
    </div>
  );
};

export default ActivityFeed;
