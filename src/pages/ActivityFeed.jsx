import React, { useContext } from 'react';
import { ActivityContext } from '../context/ActivityContext';
import ArchiveButton from '../components/ArchiveButton';
import ActivityCard from '../components/ActivityCard';
import TabNavigation from '../components/TabNavigation';

const ActivityFeed = () => {
  const { activities, loading, archiveActivity, archiveAllActivities, isAllArchived } = useContext(ActivityContext);

  return (
    <div>
      <TabNavigation />
      <h2>Activity Feed</h2>
      <ArchiveButton onArchive={archiveAllActivities} isArchived={isAllArchived} />

      <div className="activity-list">
        {loading ? (
          <p>Loading...</p>
        ) : activities.length === 0 ? (
          <p>No activities available.</p>
        ) : (
          activities
            .filter(activity => !activity.is_archived) // Only show non-archived activities
            .map(activity => (
              <div key={activity.id} onClick={() => archiveActivity(activity.id)}>
                <ActivityCard activity={activity} />
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
