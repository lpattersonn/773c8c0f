import React from 'react';
import { Link } from 'react-router-dom';

const TabNavigation = () => {
  return (
    <div className="tab-navigation">
      <Link to="/" className="tab-link">Activity Feed</Link>
      <Link to="/archived" className="tab-link">Archived Calls</Link>
    </div>
  );
};

export default TabNavigation;
