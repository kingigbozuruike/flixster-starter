import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideBar.css';

const SideBar = ({ likedMovies, watchedMovies, className, onClose }) => {
    const location = useLocation();
    const likedCount = Object.values(likedMovies).filter(Boolean).length;
    const watchedCount = Object.values(watchedMovies).filter(Boolean).length;

    return (
        <div className={`sidebar ${className || ''}`}>
            <button className="sidebar-close-btn" onClick={onClose}>×</button>

            <div className="sidebar-header">
                <h3>Navigation</h3>
            </div>

            <div className="sidebar-nav">
                <Link
                    to="/"
                    className={location.pathname === '/' ? 'active' : ''}
                    onClick={onClose}
                >
                    <span>Home</span>
                </Link>

                <Link
                    to="/favorites"
                    className={location.pathname === '/favorites' ? 'active' : ''}
                    onClick={onClose}
                >
                    <span>Favorites</span>
                    <span className="count-badge">{likedCount}</span>
                </Link>

                <Link
                    to="/watched"
                    className={location.pathname === '/watched' ? 'active' : ''}
                    onClick={onClose}
                >
                    <span>Watched</span>
                    <span className="count-badge">{watchedCount}</span>
                </Link>
            </div>

            <div className="sidebar-footer">
                <p>Flixster - Your Movie Companion</p>
            </div>
        </div>
    );
};

export default SideBar;
