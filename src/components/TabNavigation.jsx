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
  const isOnActivityPage = location.pathname.includes('/activity');

  const [selectAllManuallyTriggered, setSelectAllManuallyTriggered] = useState(false);

  useEffect(() => {
    setSelectAllManuallyTriggered(false);
  }, [isOnArchivedPage]);

  const visibleActivities = useMemo(
    () => activities.filter(a => a.is_archived === isOnArchivedPage),
    [activities, isOnArchivedPage]
  );

  const selectedActivities = isOnArchivedPage
    ? selectedActivitiesArchived
    : selectedActivitiesFeed;

  const areAllSelected = useMemo(() => {
    if (visibleActivities.length === 0) return false;
    const visibleIds = visibleActivities.map(a => a.id).sort();
    const selectedIds = selectedActivities.slice().sort();
    return JSON.stringify(visibleIds) === JSON.stringify(selectedIds);
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
    if (isOnActivityPage) {
      const activityId = location.pathname.split('/').pop();
      const currentActivity = activities.find(activity => activity.id === activityId);
      const action = currentActivity?.is_archived ? 'unarchive' : 'archive';

      onArchive(action, [activityId]);
      alert(`Call has been ${action === 'archive' ? 'archived' : 'unarchived'}.`);
    } else {
      const action = isOnArchivedPage ? 'unarchive' : 'archive';
      onArchive(action, selectedActivities);
    }

    setSelectAllManuallyTriggered(false);
  };

  const currentActivityId = location.pathname.split('/').pop();
  const currentActivity = activities.find(a => a.id === currentActivityId);

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
              {!isOnActivityPage && (
                <>
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
                </>
              )}

              {isOnActivityPage && currentActivity && (
                <button 
                  className="archive-button"
                  onClick={handleAction}
                  style={{ marginLeft: '10px' }}
                >
                  {currentActivity.is_archived ? 'Unarchive Call' : 'Archive Call'}
                </button>
              )}
            </div>
          </div>
        </div>

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
