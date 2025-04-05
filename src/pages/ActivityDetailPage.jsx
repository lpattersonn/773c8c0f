import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchActivitiesDetails } from '../api/activityApi';
import { ActivityContext } from '../context/ActivityContext';
import { formatPhoneNumber, formatDuration } from '../assets/js/helper';

const ActivityDetailPage = () => {
  const { id } = useParams(); // Get activity ID from the URL
  const [activity, setActivity] = useState(null); // State to hold current activity details
  const { activities } = useContext(ActivityContext); // Get activities from context

  // Fetch the activity from context or API
  useEffect(() => {
    const getActivityDetails = async () => {
      const data = await fetchActivitiesDetails(id);
      setActivity(data);
    };

    const existingActivity = activities.find(a => a.id === id);
    if (existingActivity) {
      setActivity(existingActivity);
    } else {
      getActivityDetails();
    }
  }, [id, activities]);

  // Show loading if activity is not ready
  if (!activity) {
    return (
      <div className="container mt-3">
        <p>Loading...</p>
      </div>
    );
  }

  const contactNumber = activity.to || activity.from;

  // Get related calls to/from the same number
  const callHistory = activities.filter(
    (a) => a.id !== activity.id && (a.to === contactNumber || a.from === contactNumber)
  );

  // Format date (e.g., "Jul 3, 2024")
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format time (e.g., "02:45 PM")
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="activity-details">
      <div className="container">
        {/* Phone Number Card */}
        <div className="details-card">
          <h2>Phone number:</h2>
          <p className="phone-number">{formatPhoneNumber(activity.from)}</p>
        </div>

        {/* Call Details Card */}
        <div className="details-card">
          <h2>Call details:</h2>

          <div className="details-card__date">
            <div className="date">{formatDate(activity.created_at)}</div>
          </div>

          <div className="details-card__actions">
            <div className="action-time">
              <p>{formatTime(activity.created_at)}</p>
            </div>

            <div className="action-detail">
              <p>
                <strong>
                  Call {activity.call_type} | {activity.direction}
                </strong>
              </p>
              <p>{formatDuration(activity.duration)}</p>
              <p>Archive status: <span className='archive-status'>{activity.is_archived ? 'Archived' : 'Not Archived'}</span></p>
              <p>Aircall number: {formatPhoneNumber(activity.via)}</p>
              <p>To: {formatPhoneNumber(activity.to)}</p>
            </div>
          </div>
        </div>

        {/* Related Call History Card */}
        {callHistory.length > 0 && (
          <div className="details-card">
            <h2>Call history with {formatPhoneNumber(contactNumber)}:</h2>
            <ul>
              {callHistory.map((call) => (
                <li key={call.id}>
                  <span>{call.call_type}</span> call on {formatDate(call.created_at)} at {formatTime(call.created_at)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityDetailPage;
