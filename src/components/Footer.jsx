import React from 'react';
import { Link } from 'react-router-dom';
import Phone from '../assets/images/phone-solid.svg';
import User from '../assets/images/user-solid.svg';
import Gear from '../assets/images/gear-solid.svg';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-action">
                    <img className="phone" src={Phone} alt="See all feed" />
                    <Link to="/profile"><img className="" src={User} alt="See user profile" /></Link>
                    <Link to="/settings"><img className="" src={Gear} alt="See settings" /></Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;