import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ActivityContext } from '../context/ActivityContext';
import ActivityCard from '../components/ActivityCard';
import TabNavigation from '../components/TabNavigation';

const ActivityFeed = () => {
  const context = useContext(ActivityContext);

  if (!context || !context.activities) {
    return <p className="loading">Loading...</p>;
  }

  const { activities } = context;

  return (
    <div className="activity-feed">
      <TabNavigation />
      <h2 className="activity-feed-title">Activity Feed</h2>
      <div className="activity-list">
        {activities.length === 0 ? (
          <p>No activities available.</p>
        ) : (
          activities
            .filter(activity => !activity.is_archived)
            .map(activity => (
              <Link key={activity.id} to={`/activity/${activity.id}`}>
                <ActivityCard activity={activity} />
              </Link>
            ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
