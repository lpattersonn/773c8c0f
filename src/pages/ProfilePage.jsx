import React from 'react';
// import './ProfilePage.css'; // You can include styles in a separate CSS file

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <h1>Leshan Patterson</h1>
          <p className="bio">
            A passionate web developer with experience in React, Node.js, and frontend technologies.
          </p>
          <div className="contact-info">
            <p>Email: leshan@leshanpatterson.com</p>
            <p>Location: Toronto, Canada</p>
          </div>
        </div>
      </div>
      <div className="profile-footer">
        <button className='button-green'>Edit Profile</button>
      </div>
    </div>
  );
};

export default ProfilePage;
