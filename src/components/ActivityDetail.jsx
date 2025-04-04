import React from 'react';

const ActivityDetail = ({ activity }) => {
  return (
    <div className="activity-detail">
      <h2>Activity Detail</h2>
      <p><strong>From:</strong> {activity.from}</p>
      <p><strong>To:</strong> {activity.to}</p>
      <p><strong>Duration:</strong> {activity.duration}</p>
      <p><strong>Call Type:</strong> {activity.call_type}</p>
      <p><strong>Direction:</strong> {activity.direction}</p>
    </div>
  );
};

export default ActivityDetail;
