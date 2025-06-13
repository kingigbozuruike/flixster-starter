import React, { useState } from 'react';
import './SideBar.css';

const SideBar = ({ likedMovies, watchedMovies, allMovies, className }) => {
    const [activeTab, setActiveTab] = useState('liked');

  // Filter movies based on liked/watched status
    const getLikedMovies = () => {
        if (!allMovies || !likedMovies) return [];
        return allMovies.filter(movie => likedMovies[movie.id]);
    };

    const getWatchedMovies = () => {
        if (!allMovies || !watchedMovies) return [];
        return allMovies.filter(movie => watchedMovies[movie.id]);
    };

    const likedMoviesList = getLikedMovies();
    const watchedMoviesList = getWatchedMovies();

    return (
        <div className={`sidebar ${className || ''}`}>
        <div className="sidebar-header">
            <h3>My Movies</h3>
            <div className="sidebar-tabs">
            <button
                className={activeTab === 'liked' ? 'active' : ''}
                onClick={() => setActiveTab('liked')}
            >
                Liked ({likedMoviesList.length})
            </button>
            <button
                className={activeTab === 'watched' ? 'active' : ''}
                onClick={() => setActiveTab('watched')}
            >
                Watched ({watchedMoviesList.length})
            </button>
            </div>
        </div>

        <div className="sidebar-content">
            {activeTab === 'liked' ? (
            likedMoviesList.length > 0 ? (
                <ul className="movie-list-sidebar">
                {likedMoviesList.map(movie => (
                    <li key={movie.id} className="movie-item">
                    <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-thumbnail"
                    />
                    <div className="movie-details">
                        <h4>{movie.title}</h4>
                        <p>Rating: {movie.vote_average}</p>
                    </div>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="empty-message">No liked movies yet</p>
            )
            ) : (
            watchedMoviesList.length > 0 ? (
                <ul className="movie-list-sidebar">
                {watchedMoviesList.map(movie => (
                    <li key={movie.id} className="movie-item">
                    <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-thumbnail"
                    />
                    <div className="movie-details">
                        <h4>{movie.title}</h4>
                        <p>Rating: {movie.vote_average}</p>
                    </div>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="empty-message">No watched movies yet</p>
            )
            )}
        </div>
        </div>
    );
};

export default SideBar;
