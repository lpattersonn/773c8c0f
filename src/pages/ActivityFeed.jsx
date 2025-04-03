import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ActivityContext } from '../context/ActivityContext';
import ActivityCard from '../components/ActivityCard';
import TabNavigation from '../components/TabNavigation';

const ActivityFeed = () => {
    const { activities } = useContext(ActivityContext); // Get activiteis from context

    return(
        <div>
            <TabNavigation />
            <h2>Activity Feed</h2>
            <div className="activity-list">
                {activities.filter(activity => !activity.is_archived).map(activity => (
                    <Link key={activity.id} to={`/activity/${activity.id}`}>
                        <ActivityCard activity={activity} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ActivityFeed;