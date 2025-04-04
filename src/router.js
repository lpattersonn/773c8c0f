import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActivityFeed from './pages/ActivityFeed';
import ArchivedCalls from './pages/ArchivedCalls';
import ActivityDetailPage from './pages/ActivityDetailPage';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ActivityFeed />} />
                <Route path="/archived" element={<ArchivedCalls />} />
                <Route path="/activity/:id" element={<ActivityDetailPage />} />
                
            </Routes>
        </Router>
    );
};

export default AppRouter;
