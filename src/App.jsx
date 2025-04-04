// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import ActivityFeed from './pages/ActivityFeed';
import ActivityDetailPage from './pages/ActivityDetailPage';
import ArchivedCalls from './pages/ArchivedCalls';

const App = () => {
  return (
    <div className="container">
      <Header />
      <div className="container-view">
        <Routes>
          <Route path="/" element={<ActivityFeed />} />
          <Route path="/activity/:id" element={<ActivityDetailPage />} />
          <Route path="/archived" element={<ArchivedCalls />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
