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
    // Check if activities are selected
    if (selectedCount === 0) {
      setButtonLabel('No activities selected');
    } else {
      // Check the state of selected activities
      const allSelectedAreArchived = selected.every(activity => activity.is_archived);

      // Update the label depending on the current page
      if (isOnArchivedPage) {
        setButtonLabel(allSelectedAreArchived ? 'Unarchive Selected' : 'No activities selected');
      } else {
        setButtonLabel(allSelectedAreArchived ? 'No activities selected' : 'Archive Selected');
      }
    }
  }, [selectedCount, isOnArchivedPage, selected]);

  const buttonIcon = isOnArchivedPage
    ? 'bi bi-file-earmark-zip-fill' // Icon for unarchive
    : 'bi bi-archive-fill'; // Icon for archive

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
      title={selectedCount === 0 ? 'Select at least one activity' : ''}
    >
      <i className={buttonIcon}></i> {buttonLabel}
    </button>
  );
};

export default ArchiveButton;
