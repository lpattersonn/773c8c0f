import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchActivitiesDetails } from '../api/activityApi'; // Function to fetch activity details from the API
import { ActivityContext } from '../context/ActivityContext'; // Import context for activity state management
import formatPhoneNumber from '../assets/js/helper'; // Helper function to format phone numbers

const ActivityDetailPage = () => {
  const { id } = useParams(); // Get activity ID from the URL parameters
  const [activity, setActivity] = useState(null); // State to store the current activity details
  const { activities } = useContext(ActivityContext); // Access the activities from the context

  // Fetch activity details when the component is mounted or when `id` or `activities` changes
  useEffect(() => {
    const getActivityDetails = async () => {
      const data = await fetchActivitiesDetails(id); // Fetch activity details from the API
      setActivity(data); // Set the fetched activity to state
    };

    // Check if the activity already exists in the context state and use it directly if available
    const updatedActivity = activities.find((a) => a.id === id);
    if (updatedActivity) {
      setActivity(updatedActivity); // Use activity from context if found
    } else {
      getActivityDetails(); // If not found, fetch activity from the API
    }
  }, [id, activities]); // Dependency array includes `id` and `activities` so the effect runs when either changes

  // If no activity is found or still loading, show a loading message
  if (!activity) {
    return (
      <div className="container mt-3">
        <p>Loading...</p> {/* Display loading text */}
      </div>
    );
  }

  const contactNumber = activity.to || activity.from; // Get the contact number (either "to" or "from")
  
  // Filter activities that have the same contact number (either "to" or "from")
  const callHistory = activities.filter(
    (a) => a.id !== activity.id && (a.to === contactNumber || a.from === contactNumber)
  );

  // Format a date string to a human-readable format
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { // Format the date to 'MMM dd, yyyy'
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format a time string to a 2-digit hour and minute format
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { // Format the time to 'hh:mm AM/PM'
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="activity-details">
      <div className="container">
        {/* Activity details card */}
        <div className="details-card">
          <h2>Phone number:</h2>
          <p className="phone-number">{formatPhoneNumber(activity.from)}</p> {/* Format and display the phone number */}
        </div>

        {/* Call details card */}
        <div className="details-card">
          <h2>Call details:</h2>
          <p>
            <strong>Aircall number:</strong> {formatPhoneNumber(activity.via)} {/* Format Aircall number */}
          </p>
          <p>
            <strong>To:</strong> {formatPhoneNumber(activity.to)} {/* Format "to" phone number */}
          </p>
          <p>
            <strong>Duration:</strong> {activity.duration} seconds {/* Display call duration */}
          </p>
          <p>
            <strong>Call type:</strong> {activity.call_type} {/* Display call type (e.g., inbound, outbound) */}
          </p>
          <p>
            <strong>Direction:</strong> {activity.direction} {/* Display call direction */}
          </p>
          <p>
            <strong>Date:</strong> {formatDate(activity.created_at)} {/* Format and display the call date */}
          </p>
          <p>
            <strong>Time:</strong> {formatTime(activity.created_at)} {/* Format and display the call time */}
          </p>
          <p>
            <strong>Archive status:</strong>{' '}
            {activity.is_archived ? 'Archived' : 'Not Archived'} {/* Display if the activity is archived */}
          </p>
        </div>

        {/* Display call history if there are related calls */}
        {callHistory.length > 0 && (
          <div className="details-card">
            <h2>Call history with {formatPhoneNumber(contactNumber)}:</h2>
            <ul>
              {callHistory.map((call) => (
                <li key={call.id}>
                  <span>{call.call_type}</span> call on {formatDate(call.created_at)} at{' '}
                  {formatTime(call.created_at)} {/* Display call history */}
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
