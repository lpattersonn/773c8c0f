// src/components/ActivityCard.jsx
import React from 'react';
import Avatar from '../assets/images/avatar.svg';

const ActivityCard = ({ activity }) => {
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

  // Construct the icon class
  const callIcon = `bi bi-telephone-${activity?.direction === 'inbound' ? 'inbound' : 'outbound'}`;

  return (
    <div className="activity-card">
      <div className="activity-card__image">
        <img src={Avatar} alt={`User image from ${displayName}`} />
      </div>
      <div className="activity-card__details">
        <h3 className="activity-card__name">{displayName}</h3>
        <p className="activity-card__info">
          <i className={callIcon}></i> {`${getCallTypeLabel()} ${counterparty}`}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
