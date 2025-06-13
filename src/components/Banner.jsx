import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <div className="banner-logo">
          <img src="/flixster.png" alt="Flixster Logo" />
        </div>
        <div className="banner-text">
          <h2>Discover and Explore Movies</h2>
          <p>Find the latest releases, watch trailers, and keep track of your favorites</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
