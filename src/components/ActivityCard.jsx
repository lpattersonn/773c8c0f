import React, { useContext } from 'react';
import Avatar from '../assets/images/avatar.svg';
import { ActivityContext } from '../context/ActivityContext';

const ActivityCard = ({ activity, isArchived }) => {
  const { selectedActivitiesFeed, selectedActivitiesArchived, toggleSelectActivity } = useContext(ActivityContext);

  // Check if the activity is selected
  const isChecked = isArchived
    ? selectedActivitiesArchived?.includes(activity?.id)
    : selectedActivitiesFeed?.includes(activity?.id);

  // Format the date to be more readable
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Format the time to be more readable
  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get a readable description based on the call type
  const getCallTypeLabel = () => {
    const callTypeMap = {
      missed: 'Missed a call from',
      answered: 'Received a call from',
    };
    return callTypeMap[activity?.call_type] || 'Received a voicemail from';
  };

  // Decide which user label to show (who the call is coming from/going to)
  const displayName = activity?.direction === 'inbound' ? activity?.to : activity?.via;

  // Decide which number to show in the call detail line
  const counterparty = activity?.direction === 'inbound' ? activity?.via : activity?.to;

  // Construct the icon class based on call direction
  const callIcon = `bi bi-telephone-${activity?.direction === 'inbound' ? 'inbound' : 'outbound'}`;

  // Handle the change for selecting/unselecting an individual activity
  const handleActivitySelection = () => {
    toggleSelectActivity(activity?.id, isArchived);
  };

  return (
    <div className="activity-card">
      <div className="activity-card__content">
        <div className="activity-card__image">
          <img src={Avatar} alt={`User image from ${displayName || 'Unknown'}`} />
        </div>
        <div className="activity-card__info">
          <div className="activity-card__info-heading">
            <h3 className="activity-card__name">{displayName || 'Unknown'}</h3>
            <div className="activity-card__actions">
              <div className="activity-card__date">
                <p className="activity-card__date-text small">{formatDate(activity?.created_at)}</p>
              </div>
              <div className="activity-card__separator">
                <div className="activity-card__dot"></div>
                <div className="activity-card__dot"></div>
                <div className="activity-card__dot"></div>
              </div>
              <input
                className="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleActivitySelection} // Handle individual activity selection
              />
            </div>
          </div>
          <p className="activity-card__meta small">
            <i className={callIcon}></i> {`${getCallTypeLabel()} ${counterparty || 'Unknown'} at ${formatTime(activity?.created_at)}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
