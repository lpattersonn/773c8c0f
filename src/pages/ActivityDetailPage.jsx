import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchActivitiesDetails } from '../api/activityApi';
import { ActivityContext } from '../context/ActivityContext';
import formatPhoneNumber from '../assets/js/helper';

const ActivityDetailPage = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const { activities } = useContext(ActivityContext);

  useEffect(() => {
    const getActivityDetails = async () => {
      const data = await fetchActivitiesDetails(id);
      setActivity(data);
    };

    const updatedActivity = activities.find((a) => a.id === id);
    if (updatedActivity) {
      setActivity(updatedActivity);
    } else {
      getActivityDetails();
    }
  }, [id, activities]);

  if (!activity) {
    return (
      <div className="container mt-3">
        <p>Loading...</p>
      </div>
    );
  }

  const contactNumber = activity.to || activity.from;
  const callHistory = activities.filter(
    (a) => a.id !== activity.id && (a.to === contactNumber || a.from === contactNumber)
  );

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
        <div className="details-card">
          <h2>Phone number:</h2>
          <p className="phone-number">{formatPhoneNumber(activity.from)}</p>
        </div>
        <div className="details-card">
          <h2>Call details:</h2>
          <p>
            <strong>Aircall number:</strong> {formatPhoneNumber(activity.via)}
          </p>
          <p>
            <strong>To:</strong> {formatPhoneNumber(activity.to)}
          </p>
          <p>
            <strong>Duration:</strong> {activity.duration} seconds
          </p>
          <p>
            <strong>Call type:</strong> {activity.call_type}
          </p>
          <p>
            <strong>Direction:</strong> {activity.direction}
          </p>
          <p>
            <strong>Date:</strong> {formatDate(activity.created_at)}
          </p>
          <p>
            <strong>Time:</strong> {formatTime(activity.created_at)}
          </p>
          <p>
            <strong>Archive status:</strong>{' '}
            {activity.is_archived ? 'Archived' : 'Not Archived'}
          </p>
        </div>
        {callHistory.length > 0 && (
          <div className="details-card">
            <h2>Call history with {formatPhoneNumber(contactNumber)}:</h2>
            <ul>
              {callHistory.map((call) => (
                <li key={call.id}>
                  <strong>{call.call_type}</strong> call on {formatDate(call.created_at)} at{' '}
                  {formatTime(call.created_at)}
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
