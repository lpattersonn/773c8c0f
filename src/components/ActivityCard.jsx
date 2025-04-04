// src/components/ActivityCard.jsx
import React from 'react';

const ActivityCard = ({ activity }) => {
  return (
    <div className="activity-card">
      <h3>{activity.call_type}</h3>
      <p>{activity.from} to {activity.to}</p>
      <p>Duration: {activity.duration}s</p>
    </div>
  );
};

export default ActivityCard;
