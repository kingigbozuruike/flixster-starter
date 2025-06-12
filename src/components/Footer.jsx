import { Link } from 'react-router-dom';
import React from 'react';



const Footer = () => {
  return (
    <footer className="footer">
        <div className='nav-links'>
            <Link to="/home">Now Playing</Link>
            <Link to="/movies">Search</Link>
        </div>
        <div className='social-links'>
            <a href="https://www.facebook.com/"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.twitter.com/"><i className="fa-brands fa-twitter"></i></a>
            <a href="https://www.youtube.com/"><i className="fa-brands fa-youtube"></i></a>
        </div>
        <div className='footer-links'>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
        </div>
        <p>Copyright © 2023 Meta. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
