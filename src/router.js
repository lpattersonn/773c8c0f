import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActivityFeed from './pages/ActivityFeed';
import ArchivedCalls from './pages/ArchivedCalls';
import ActivityDetailPage from './pages/ActivityDetailPage';
import ProfilePage from './pages/ProfilePage';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ActivityFeed />} />
                <Route path="/archived" element={<ArchivedCalls />} />
                <Route path="/activity/:id" element={<ActivityDetailPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
