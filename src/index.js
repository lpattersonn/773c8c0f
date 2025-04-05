import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import './scss/_compiled/style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ActivityProvider } from './context/ActivityContext';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <ActivityProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ActivityProvider>
  </React.StrictMode>
);
