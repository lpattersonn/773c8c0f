import React from 'react';
import ActivityCard from './ActivityCard';

const ActivityList = ({ activities }) => {
    return (
        <div className="activityt-list">
            {activities.length === 0 ? (
                <p>No activities available.</p>
            ) : (
                activities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                ))
            )}
        </div>
    );
};

export default ActivityList;