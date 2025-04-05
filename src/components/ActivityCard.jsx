import React, { useContext } from 'react';
import Avatar from '../assets/images/avatar.svg';
import { ActivityContext } from '../context/ActivityContext';
import { useNavigate } from 'react-router-dom';

const ActivityCard = ({ activity, isArchived }) => {
  const { selectedActivitiesFeed, selectedActivitiesArchived, toggleSelectActivity } = useContext(ActivityContext);
  const navigate = useNavigate();

  const isChecked = isArchived
    ? selectedActivitiesArchived?.includes(activity?.id)
    : selectedActivitiesFeed?.includes(activity?.id);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getCallTypeLabel = () => {
    const callTypeMap = {
      missed: 'Missed a call from',
      answered: 'Received a call from',
    };
    return callTypeMap[activity?.call_type] || 'Received a voicemail from';
  };

  const displayName = activity?.direction === 'inbound' ? activity?.to : activity?.via;
  const counterparty = activity?.direction === 'inbound' ? activity?.via : activity?.to;
  const callIcon = `bi bi-telephone-${activity?.direction === 'inbound' ? 'inbound' : 'outbound'}`;

  const handleActivitySelection = (e) => {
    e.stopPropagation(); // prevent checkbox from triggering navigation
    toggleSelectActivity(activity?.id, isArchived);
  };

  const handleCardClick = () => {
    navigate(`/activity/${activity?.id}`);
  };

  return (
    <div className="activity-card" onClick={handleCardClick}>
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
                onClick={handleActivitySelection}
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
