import React, { useContext, useMemo, useEffect, useState } from 'react';
import { ActivityContext } from '../context/ActivityContext';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import ArchiveButton from './ArchiveButton';

const TabNavigation = () => {
  const location = useLocation();
  const {
    selectedActivitiesFeed,
    selectedActivitiesArchived,
    selectAllActivities,
    unselectAllActivities,
    onArchive,
    activities
  } = useContext(ActivityContext);

  const isOnArchivedPage = location.pathname === '/archived';

  // Track if user manually toggled the "Select All" checkbox
  const [selectAllManuallyTriggered, setSelectAllManuallyTriggered] = useState(false);

  // Reset manual select state when route changes
  useEffect(() => {
    setSelectAllManuallyTriggered(false);
  }, [isOnArchivedPage]);

  // Filter visible activities based on current page
  const visibleActivities = useMemo(
    () => activities.filter(a => a.is_archived === isOnArchivedPage),
    [activities, isOnArchivedPage]
  );

  const selectedActivities = isOnArchivedPage
    ? selectedActivitiesArchived
    : selectedActivitiesFeed;

  // Check if all visible activities are selected
  const areAllSelected = useMemo(() => {
    if (visibleActivities.length === 0) return false;
    const visibleIds = visibleActivities.map(a => a.id).sort();
    const selectedIds = selectedActivities.slice().sort();
    const result = JSON.stringify(visibleIds) === JSON.stringify(selectedIds);

    console.log('👀 Are all selected?', result);
    console.log('Visible IDs:', visibleIds);
    console.log('Selected IDs:', selectedIds);

    return result;
  }, [visibleActivities, selectedActivities]);

  const toggleSelectAll = () => {
    if (areAllSelected) {
      unselectAllActivities(visibleActivities, isOnArchivedPage);
      setSelectAllManuallyTriggered(false);
    } else {
      selectAllActivities(visibleActivities, isOnArchivedPage);
      setSelectAllManuallyTriggered(true);
    }
  };

  const handleAction = () => {
    const action = isOnArchivedPage ? 'unarchive' : 'archive';
    onArchive(action, selectedActivities);
    setSelectAllManuallyTriggered(false); // Reset checkbox state
  };  

  return (
    <div className="tab-navigation">
      <div className="tab-navigation__container">
        <div className="tab-navigation__header">
          <div className="container">
            <div className="logo">
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <div className="actions">
              <ArchiveButton
                onArchive={handleAction}
                selectedActivities={selectedActivities}
                activities={activities}
              />
              <input
                className="checkbox"
                type="checkbox"
                checked={selectAllManuallyTriggered && areAllSelected}
                onChange={toggleSelectAll}
                title="Select all"
                disabled={visibleActivities.length === 0}
              />
            </div>
          </div>
        </div>
        <nav className="tab-navigation__links">
          <Link
            to="/"
            className={`tab-navigation__link ${!isOnArchivedPage ? "tab-navigation__link--active" : ""}`}
          >
            Activity Feed
          </Link>
          <Link
            to="/archived"
            className={`tab-navigation__link ${isOnArchivedPage ? "tab-navigation__link--active" : ""}`}
          >
            Archived Calls
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;
