import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Phone from '../assets/images/phone-solid.svg';
import User from '../assets/images/user-solid.svg';
import Gear from '../assets/images/gear-solid.svg';
import { fetchActivities } from '../api/activityApi';

const Footer = () => {
    // Count activities
    const [activityCount, setActivityCount] = useState(0) 

    useEffect(() => {
        const getActivities = async () => {
          const data = await fetchActivities();
          setActivityCount(data.length);
        };

        getActivities();
    }, []);

    return (
        <footer>
            <div className="container">
                <div className="footer-action">
                    <div className="icon-badge">
                    <Link to="/">
                        <img className="phone" src={Phone} alt="See all feed" />
                        {activityCount > 0 && (
                            <span className="badge">{activityCount}</span>
                        )}
                    </Link>
                    </div>
                    <Link to="/profile">
                        <img src={User} alt="See user profile" />
                    </Link>
                    <Link to="/settings">
                        <img src={Gear} alt="See settings" />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;