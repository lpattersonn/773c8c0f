import React, { useContext, useMemo, useEffect, useState } from 'react';
import { ActivityContext } from '../context/ActivityContext';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import ArchiveButton from './ArchiveButton';

const TabNavigation = () => {
  const location = useLocation(); // Hook to get current location/pathname
  const {
    selectedActivitiesFeed,
    selectedActivitiesArchived,
    selectAllActivities,
    unselectAllActivities,
    onArchive,
    activities
  } = useContext(ActivityContext); // Destructuring activity-related state and functions from context

  const isOnArchivedPage = location.pathname === '/archived'; // Boolean flag to check if on the archived page
  const isOnActivityPage = location.pathname.includes('/activity'); // Boolean flag to check if on an activity detail page

  const [selectAllManuallyTriggered, setSelectAllManuallyTriggered] = useState(false); // State for manual selection toggle

  // Effect to reset select all state when switching to archived page
  useEffect(() => {
    setSelectAllManuallyTriggered(false);
  }, [isOnArchivedPage]);

  // Filter visible activities based on whether we're on archived or feed page
  const visibleActivities = useMemo(
    () => activities.filter(a => a.is_archived === isOnArchivedPage),
    [activities, isOnArchivedPage]
  );

  // Get the selected activities based on the current page (feed or archived)
  const selectedActivities = isOnArchivedPage
    ? selectedActivitiesArchived
    : selectedActivitiesFeed;

  // Check if all visible activities are selected
  const areAllSelected = useMemo(() => {
    if (visibleActivities.length === 0) return false;
    const visibleIds = visibleActivities.map(a => a.id).sort();
    const selectedIds = selectedActivities.slice().sort();
    return JSON.stringify(visibleIds) === JSON.stringify(selectedIds);
  }, [visibleActivities, selectedActivities]);

  // Toggle select/unselect all visible activities
  const toggleSelectAll = () => {
    if (areAllSelected) {
      unselectAllActivities(visibleActivities, isOnArchivedPage); // Unselect all if already selected
      setSelectAllManuallyTriggered(false);
    } else {
      selectAllActivities(visibleActivities, isOnArchivedPage); // Select all visible activities
      setSelectAllManuallyTriggered(true);
    }
  };

  // Handle the action of archiving or unarchiving activities
  const handleAction = () => {
    if (isOnActivityPage) {
      const activityId = location.pathname.split('/').pop(); // Get the current activity ID from the URL
      const currentActivity = activities.find(activity => activity.id === activityId); // Find the activity by ID
      const action = currentActivity?.is_archived ? 'unarchive' : 'archive'; // Determine action based on the archived status

      // Perform archive/unarchive action and alert the user
      onArchive(action, [activityId]);
      alert(`Call has been ${action === 'archive' ? 'archived' : 'unarchived'}.`);
    } else {
      // Handle archive/unarchive for selected activities on feed/archived pages
      const action = isOnArchivedPage ? 'unarchive' : 'archive';
      onArchive(action, selectedActivities);
    }

    setSelectAllManuallyTriggered(false); // Reset manual select all trigger
  };

  // Get current activity details if on activity detail page
  const currentActivityId = location.pathname.split('/').pop();
  const currentActivity = activities.find(a => a.id === currentActivityId);

  return (
    <div className="tab-navigation">
      <div className="tab-navigation__container">
        <div className="tab-navigation__header">
          <div className="container">
            <div className="logo">
              <Link to="/">
                <Logo /> {/* Link to home page with logo */}
              </Link>
            </div>
            <div className="actions">
              {/* Only show ArchiveButton and select all checkbox if not on activity detail page */}
              {!isOnActivityPage && (
                <>
                  <ArchiveButton
                    onArchive={handleAction} // Pass handleAction to ArchiveButton
                    selectedActivities={selectedActivities} // Pass selected activities
                    activities={activities} // Pass all activities for context
                  />
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={selectAllManuallyTriggered && areAllSelected} // Check if all activities are selected
                    onChange={toggleSelectAll} // Toggle select all action
                    title="Select all"
                    disabled={visibleActivities.length === 0} // Disable if no visible activities
                  />
                </>
              )}

              {/* Show single archive/unarchive button if on activity detail page */}
              {isOnActivityPage && currentActivity && (
                <button 
                  className="archive-button"
                  onClick={handleAction} // Trigger archive/unarchive action
                  style={{ marginLeft: '10px' }}
                >
                  {currentActivity.is_archived ? 'Unarchive Call' : 'Archive Call'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation links for Activity Feed and Archived Calls */}
        <nav className="tab-navigation__links">
          <Link
            to="/"
            className={`tab-navigation__link ${
              !isOnArchivedPage && !isOnActivityPage ? "tab-navigation__link--active" : ""
            }`}
          >
            Activity Feed
          </Link>
          <Link
            to="/archived"
            className={`tab-navigation__link ${
              isOnArchivedPage ? "tab-navigation__link--active" : ""
            }`}
          >
            Archived Calls
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;
