import { Link } from 'react-router-dom';
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/movie.png" alt="Flixster Logo" />
          <h3>Flixster</h3>
        </div>

        <div className="footer-links-container">
          <div className="footer-section">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">Movies</Link></li>
              <li><Link to="/">TV Shows</Link></li>
              <li><Link to="/">New & Popular</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Terms of Service</Link></li>
              <li><Link to="/">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          <p>© {new Date().getFullYear()} Flixster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
