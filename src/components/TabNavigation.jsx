import React, { useContext, useEffect, useState } from 'react';
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

  // Filter activities for feed and archived
  const feedActivities = activities.filter(a => !a.is_archived);
  const archivedActivities = activities.filter(a => a.is_archived);

  // Determine if all items in feed and archived are selected
  const allSelectedFeed = feedActivities.every(a => selectedActivitiesFeed.includes(a.id));
  const allSelectedArchived = archivedActivities.every(a => selectedActivitiesArchived.includes(a.id));

  const isOnArchivedPage = location.pathname === '/archived'; // Check if we're on the Archived page

  const toggleSelectAll = () => {
    if (isOnArchivedPage) {
      if (allSelectedArchived) {
        unselectAllActivities(true);  // Unselect all in archived
      } else {
        selectAllActivities(true);   // Select all in archived
      }
    } else {
      if (allSelectedFeed) {
        unselectAllActivities(false); // Unselect all in feed
      } else {
        selectAllActivities(false);   // Select all in feed
      }
    }
  };

  const handleAction = () => {
    if (isOnArchivedPage) {
      // Unarchive selected activities if we're on the archived page
      onArchive('unarchive', selectedActivitiesArchived);
    } else {
      // Archive selected activities if we're on the home page
      onArchive('archive', selectedActivitiesFeed);
    }
  };

  // Determine checkbox checked status
  const isCheckboxChecked = isOnArchivedPage 
    ? archivedActivities.length > 0 && allSelectedArchived 
    : feedActivities.length > 0 && allSelectedFeed;

  return (
    <div className="tab-navigation">
      <div className="tab-navigation__container">
        <div className="tab-navigation__header">
          <div className="container">
            <div className="logo">
              <Link to="/" >
                <Logo />
              </Link>
            </div>
            <div className="actions">
              <ArchiveButton
                onArchive={handleAction} // Pass handleAction as the onArchive function
                selectedActivities={isOnArchivedPage ? selectedActivitiesArchived : selectedActivitiesFeed}
                activities={activities}
              />
              <input
                className="checkbox"
                type="checkbox"
                checked={isCheckboxChecked} // Update checkbox checked status based on conditions
                onChange={toggleSelectAll}
                title="Select all"
              />
            </div>
          </div>
        </div>
        <nav className="tab-navigation__links">
          <Link
            to="/"
            className={`tab-navigation__link ${isOnArchivedPage ? "" : "tab-navigation__link--active"}`}
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
