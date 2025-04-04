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
    activities
  } = useContext(ActivityContext);

  const allSelected = selectedActivities.length === activities.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      unselectAllActivities();
    } else {
      selectAllActivities();
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
                        <ArchiveButton onArchive={archiveAllActivities} isArchived={isAllArchived} />
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
