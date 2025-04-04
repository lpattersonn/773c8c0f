import React from 'react';
import ActivityCard from './ActivityCard';

const ActivityList = ({ actiivities }) => {
    return (
        <div className="activityt-list">
            {actiivities.length === 0 ? (
                <p>No activities available.</p>
            ) : (
                actiivities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                ))
            )}
        </div>
    );
};

export default ActivityList;