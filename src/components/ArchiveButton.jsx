import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ArchiveButton = ({ onArchive, selectedActivities, activities }) => {
  const location = useLocation(); // Track the current route
  const [buttonLabel, setButtonLabel] = useState('No activities selected');
  const selected = activities.filter(activity => selectedActivities.includes(activity.id));
  const selectedCount = selected.length;

  const isOnArchivedPage = location.pathname === '/archived';

  // Effect to update the button label based on the selected activities and page
  useEffect(() => {
    // Check the selected activities and update the button label accordingly
    if (selectedCount === 0) {
      setButtonLabel('No activities selected');
    } else {
      if (isOnArchivedPage) {
        setButtonLabel('Unarchive Selected');
      } else {
        setButtonLabel('Archive Selected');
      }
    }
  }, [selectedCount, isOnArchivedPage]); // Dependencies: selectedCount and current route

  const buttonIcon = isOnArchivedPage
    ? 'bi bi-file-earmark-zip-fill'
    : 'bi bi-archive-fill';

  return (
    <button
      onClick={onArchive}
      className="archive-button"
      disabled={selectedCount === 0}
      title={selectedCount === 0 ? 'Select at least one activity' : ''}
    >
      <i className={buttonIcon}></i> {buttonLabel}
    </button>
  );
};

export default ArchiveButton;
