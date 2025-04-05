import React from 'react';

// ActivityDetail displays a breakdown of a single call's key information
const ActivityDetail = ({ activity }) => {
  if (!activity) {
    return <p>No activity data available.</p>;
  }

  const {
    from = 'Unknown',
    to = 'Unknown',
    duration = 'N/A',
    call_type = 'N/A',
    direction = 'N/A',
  } = activity;

  return (
    <div className="activity-detail">
      <h2>Activity Detail</h2>

      {/* From Number */}
      <p><strong>From:</strong> {from}</p>

      {/* To Number */}
      <p><strong>To:</strong> {to}</p>

      {/* Duration of Call */}
      <p><strong>Duration:</strong> {duration} seconds</p>

      {/* Type of Call: missed, answered, voicemail */}
      <p><strong>Call Type:</strong> {call_type}</p>

      {/* Direction: inbound or outbound */}
      <p><strong>Direction:</strong> {direction}</p>
    </div>
  );
};

export default ActivityDetail;
