import React from 'react';
import Phone from '../assets/images/phone-solid.svg';
import User from '../assets/images/user-solid.svg';
import Gear from '../assets/images/gear-solid.svg';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-action">
                    <img className="phone" src={Phone} alt="See all feed" />
                    <img className="" src={User} alt="See user profile" />
                    <img className="" src={Gear} alt="See settings" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;