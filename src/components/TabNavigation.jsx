import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("/");

  return (
    <div className="tab-navigation">
      <Link 
        to="/" 
        className={`tab-link ${activeTab === "/" ? "active" : ""}`} 
        onClick={() => setActiveTab("/")}
      >
        Activity Feed
      </Link>
      <Link 
        to="/archived" 
        className={`tab-link ${activeTab === "/archived" ? "active" : ""}`} 
        onClick={() => setActiveTab("/archived")}
      >
        Archived Calls
      </Link>
    </div>
  );
};

export default TabNavigation;
