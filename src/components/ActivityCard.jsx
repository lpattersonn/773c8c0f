import React, { useContext } from 'react';
import Avatar from '../assets/images/avatar.svg';
import { ActivityContext } from '../context/ActivityContext';
import { useNavigate } from 'react-router-dom';
import { formatPhoneNumber } from '../assets/js/helper';
import Voicemail from '../assets/images/voicemail_icon.svg';
import Incoming from '../assets/images/incoming_icon.svg';
import Missed from '../assets/images/missed_icon.svg';

const ActivityCard = ({ activity, isArchived }) => {
  const { selectedActivitiesFeed, selectedActivitiesArchived, toggleSelectActivity } = useContext(ActivityContext);
  const navigate = useNavigate();

  // Determine if this card is currently selected
  const isChecked = isArchived
    ? selectedActivitiesArchived?.includes(activity?.id)
    : selectedActivitiesFeed?.includes(activity?.id);

  // Format date (e.g., "Jul 3, 2024")
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Format time (e.g., "02:45 PM")
  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get a label based on the call type
  const getCallTypeLabel = () => {
    const callTypeMap = {
      missed: 'Missed call',
      answered: 'Answered call ',
    };
    return callTypeMap[activity?.call_type] || 'Received a voicemail';
  };

  // For alt text of image - determine who the activity was to or via
  const cardHeader = activity?.direction === 'inbound' ? activity?.to : activity?.via;

  // Create a human-readable string for the call flow (e.g., "123 → 456")
  const getDisplayHeader = () => {
    const from = activity?.from || 'Unknown';
    const to = activity?.to || 'Unknown';
    const via = activity?.via || 'Unknown';

    if (activity?.direction === 'inbound') {
      return `${formatPhoneNumber(to)} ← ${formatPhoneNumber(via)}`; 
    } else {
      return `${formatPhoneNumber(via)} → ${formatPhoneNumber(to)}`;
    }
  };

  // Handle selection toggle (checkbox)
  const handleActivitySelection = (e) => {
    e.stopPropagation(); // Prevent click from navigating
    toggleSelectActivity(activity?.id, isArchived);
  };

  // Navigate to the activity details page
  const handleCardClick = () => {
    navigate(`/activity/${activity?.id}`);
  };

  return (
    <div className="activity-card" onClick={handleCardClick}>
      {/* Date of call */}
      <div className="activity-card__date">
        <p className="activity-card__date-text small">{formatDate(activity?.created_at)}</p>
      </div>

      {/* Main card content */}
      <div className="activity-card__content">
        {/* Avatar Image */}
        <div className="activity-card__image">
          <img src={Avatar} alt={`User image from ${cardHeader || 'Unknown'}`} />
        </div>

        {/* Call Info */}
        <div className="activity-card__info">
          {/* Header row: phone flow and checkbox */}
          <div className="activity-card__info-heading">
            <h3 className="activity-card__header">{getDisplayHeader()}</h3>
            <div className="activity-card__actions">       
              {/* Three-dot icon placeholder */}
              <div className="activity-card__separator">
                <div className="activity-card__dot"></div>
                <div className="activity-card__dot"></div>
                <div className="activity-card__dot"></div>
              </div>

              {/* Checkbox to select the activity */}
              <input
                className="checkbox"
                type="checkbox"
                checked={isChecked}
                onClick={handleActivitySelection}
              />
            </div>
          </div>

          {/* Meta info: icon, label, time */}
          <p className="activity-card__meta small">
            {/* Dynamic call-type icon */}
            {activity?.call_type === 'answered' ? (
              <img src={Incoming} alt="Answered" />
            ) : activity?.call_type === 'voicemail' ? (
              <img src={Voicemail} alt="Voicemail" />
            ) : (
              <img src={Missed} alt="Missed" />
            )}
            {`${getCallTypeLabel()} at ${formatTime(activity?.created_at)}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
