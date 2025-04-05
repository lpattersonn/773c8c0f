import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ArchiveButton = ({ onArchive, selectedActivities = [], activities }) => {
  const location = useLocation(); // Track the current route
  const [buttonLabel, setButtonLabel] = useState('No call selected');
  
  // Calculate the selected count
  const selected = activities.filter(activity => selectedActivities.includes(activity.id));
  const selectedCount = selected.length;

  const isOnArchivedPage = location.pathname === '/archived';

  // Effect to update the button label based on the selected activities and page
  useEffect(() => {
    // Check if activities are selected
    if (selectedCount === 0) {
      setButtonLabel('No call selected');
    } else {
      // Check the state of selected activities
      const allSelectedAreArchived = selected.every(activity => activity.is_archived);

      // Update the label depending on the current page
      if (isOnArchivedPage) {
        setButtonLabel(allSelectedAreArchived ? 'Unarchive Selected' : 'No call selected');
      } else {
        setButtonLabel(allSelectedAreArchived ? 'No call selected' : 'Archive Selected');
      }
    }
  }, [selectedCount, isOnArchivedPage, selected]);

  // Icon for archive and unarchive actions
  const buttonIcon = isOnArchivedPage
    ? 'bi bi-arrow-counterclockwise' // Icon for unarchive
    : 'bi bi-archive-fill'; // Icon for archive
<i class="bi bi-arrow-counterclockwise"></i>
  // Modify the button action based on the current page
  const handleAction = () => {
    if (isOnArchivedPage) {
      // Unarchive selected activities if we're on the archived page
      onArchive('unarchive', selectedActivities);
    } else {
      // Archive selected activities if we're on the home page
      onArchive('archive', selectedActivities);
    }
  };

  return (
    <button
      onClick={handleAction}
      className="archive-button"
      disabled={selectedCount === 0}
      title={selectedCount === 0 ? 'Select at least one call' : ''}
    >
      <i className={buttonIcon}></i> {buttonLabel}
    </button>
  );
};

export default ArchiveButton;