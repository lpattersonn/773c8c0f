import React, { useState } from 'react';

const Settings = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    notifications: true,
    darkMode: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings Saved:', formData);
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="setting-item">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="setting-item">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleInputChange}
            />
            Enable Notifications
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              name="darkMode"
              checked={formData.darkMode}
              onChange={handleInputChange}
            />
            Enable Dark Mode
          </label>
        </div>
        <button type="submit" className="save-button">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
