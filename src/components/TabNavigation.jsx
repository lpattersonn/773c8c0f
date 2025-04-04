import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("/");

  return (
    <div className="tab-navigation">
        <div className="row">
            <div className="col-12 mb-2">
                <h2>Quick Access</h2>
            </div>
            <div className="col-6">
                <Link 
                to="/" 
                className={`tab-link activity-feed ${activeTab === "/" ? "active" : ""}`} 
                onClick={() => setActiveTab("/")}
                >
                Activity Feed
                </Link>
            </div>
            <div className="col-6">
                <Link 
                    to="/archived" 
                    className={`tab-link archived-calls ${activeTab === "/archived" ? "active" : ""}`} 
                    onClick={() => setActiveTab("/archived")}
                >
                    Archived Calls
                </Link>
            </div>
        </div>
    </div>
  );
};

export default TabNavigation;
