import React, { useState, useContext } from 'react';
import { ActivityContext } from '../context/ActivityContext';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import ArchiveButton from './ArchiveButton';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("/");
  const {
    archiveAllActivities,
    isAllArchived,
    selectedActivities,
    selectAllActivities,
    unselectAllActivities,
    onArchive,
    activities
  } = useContext(ActivityContext);

  const allSelected = selectedActivities.length === activities.length;
  const isOnArchivedPage = activeTab === '/archived'; // Check if we're on the Archived page

  const toggleSelectAll = () => {
    if (allSelected) {
      unselectAllActivities();
    } else {
      selectAllActivities();
    }
  };

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
    <div className="tab-navigation">
      <div className="tab-navigation__container">
        <div className="tab-navigation__header">
          <div className="container">
            <div className="logo">
              <Link to="/" onClick={() => setActiveTab("/")}>
                <Logo />
              </Link>
            </div>
            <div className="actions">
              <ArchiveButton
                onArchive={handleAction} // Pass handleAction as the onArchive function
                selectedActivities={selectedActivities}
                activities={activities}
              />
              <input
                className="checkbox"
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                title="Select all"
              />
            </div>
          </div>
        </div>
        <nav className="tab-navigation__links">
          <Link 
            to="/" 
            className={`tab-navigation__link ${activeTab === "/" ? "tab-navigation__link--active" : ""}`} 
            onClick={() => setActiveTab("/")}
          >
            Activity Feed
          </Link>
          <Link 
            to="/archived" 
            className={`tab-navigation__link ${activeTab === "/archived" ? "tab-navigation__link--active" : ""}`} 
            onClick={() => setActiveTab("/archived")}
          >
            Archived Calls
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;
