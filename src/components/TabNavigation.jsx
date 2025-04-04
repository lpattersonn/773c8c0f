
import React from 'react';
import { Link } from 'react-router-dom';

const TabNavigation = () => {
  return (
    <div className="tab-navigation">
      <Link to="/">Activity Feed</Link>
      <Link to="/archived">Archived Calls</Link>
    </div>
  );
};

export default TabNavigation;
