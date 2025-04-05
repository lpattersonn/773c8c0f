import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchActivitiesDetails } from '../api/activityApi';
import { ActivityContext } from '../context/ActivityContext';

const ActivityDetailPage = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const { activities, loading } = useContext(ActivityContext);

  useEffect(() => {
    const getActivityDetails = async () => {
      const data = await fetchActivitiesDetails(id);
      setActivity(data);
    };
    
    getActivityDetails();
  }, [id]);

  if (!activity) return <p>Loading...</p>;

  // Find all other activities with the same `to` or `from`
  const contactNumber = activity.to || activity.from;
  const callHistory = activities.filter(a => 
    a.id !== activity.id && (a.to === contactNumber || a.from === contactNumber)
  );

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="activity-details">
      <div className="container">
        <div className="details-card">
          <h2>call Details:</h2>
          <p><strong>From:</strong> {activity.from}</p>
          <p><strong>To:</strong> {activity.to}</p>
          <p><strong>Duration:</strong> {activity.duration} seconds</p>
          <p><strong>Call Type:</strong> {activity.call_type}</p>
          <p><strong>Direction:</strong> {activity.direction}</p>
          <p><strong>Date:</strong> {formatDate(activity.created_at)}</p>
          <p><strong>Time:</strong> {formatTime(activity.created_at)}</p>
        </div>
        {callHistory.length > 0 && (
          <div className="details-card">
            <h3>Call History with {contactNumber}:</h3>
            <ul>
              {callHistory.map((call) => (
                <li key={call.id}>
                  <strong>{call.call_type}</strong> on {formatDate(call.created_at)} at {formatTime(call.created_at)}
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
