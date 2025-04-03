// src/router.js
import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'React-router-dom';
import ActivityFeed from './pages/ActivityFeed';
import ArchivedCalls from './pages/ArcgivedCalls';
import ActivityDetailPage from './pages/ActivityDetailPage';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={ActivityFeed} />
                <Route path="/archived" component={ArchivedCalls} />
                <Route path="/activity/:id" copmponent={ActivityDetailPage} />
            </Switch>
        </Router>
    );
};

export default AppRouter;