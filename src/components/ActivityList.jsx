import React from 'react';
import ActivityCard from './ActivityCard';

// ActivityList renders a list of ActivityCard components
const ActivityList = ({ activities }) => {
  // Check if there are no activities available, and display a message
  if (activities.length === 0) {
    return <p className="mt-3">No activities available.</p>;
  }

  return (
    <div className="activity-list">
      {/* Map through the activities array and render each ActivityCard */}
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default ActivityList;
