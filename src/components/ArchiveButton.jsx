import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ArchiveButton = ({ onArchive, selectedActivities = [], activities }) => {
  const location = useLocation(); // Get the current route information
  const [buttonLabel, setButtonLabel] = useState('No call selected'); // Default button label

  // Filter the selected activities based on the activity IDs
  const selected = activities.filter(activity => selectedActivities.includes(activity.id));
  const selectedCount = selected.length; // Count of selected activities

  // Check if we're on the archived page
  const isOnArchivedPage = location.pathname === '/archived';

  // Effect hook to update the button label whenever selected activities or page changes
  useEffect(() => {
    // If no activities are selected, set the button label to "No call selected"
    if (selectedCount === 0) {
      setButtonLabel('No call selected');
    } else {
      // Check if all selected activities are archived
      const allSelectedAreArchived = selected.every(activity => activity.is_archived);

      // Update the button label based on the selected activities and the current page
      if (isOnArchivedPage) {
        // On the archived page, we either unarchive selected or show 'No call selected'
        setButtonLabel(allSelectedAreArchived ? 'Unarchive Selected' : 'No call selected');
      } else {
        // On the main page, we either archive selected or show 'No call selected'
        setButtonLabel(allSelectedAreArchived ? 'No call selected' : 'Archive Selected');
      }
    }
  }, [selectedCount, isOnArchivedPage, selected]); // Dependencies: selected activities, page location

  // Determine which icon to use based on whether we are on the archived page or not
  const buttonIcon = isOnArchivedPage
    ? 'bi bi-arrow-counterclockwise' // Icon for unarchive
    : 'bi bi-archive-fill'; // Icon for archive

  // Handle the button action: archive or unarchive based on the current page
  const handleAction = () => {
    if (isOnArchivedPage) {
      // If on the archived page, unarchive the selected activities
      onArchive('unarchive', selectedActivities);
    } else {
      // Otherwise, archive the selected activities
      onArchive('archive', selectedActivities);
    }
  };

  return (
    <button
      onClick={handleAction} // Trigger the corresponding action when the button is clicked
      className="archive-button"
      disabled={selectedCount === 0} // Disable button if no activities are selected
      title={selectedCount === 0 ? 'Select at least one call' : ''} // Tooltip when no call is selected
    >
      <i className={buttonIcon}></i> {buttonLabel} {/* Display the appropriate icon and label */}
    </button>
  );
};

export default ArchiveButton;
