import React from 'react';

const ActivityCard = ({ activity }) => {
    return (
        <div className="activity-card">
            <p><strong>From:</strong> {activity.from}</p>
            <p><strong>To:</strong> {activity.to}</p>
            <p><strong>Call Type:</strong> {activity.call_type}</p>
            <p><strong>Direction:</strong> {activity.direction}</p>
        </div>
    )
};

export default ActivityCard;