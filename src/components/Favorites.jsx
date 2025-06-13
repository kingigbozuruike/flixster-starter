import React from 'react';
import MovieCard from './MovieCard';
import './NowPlaying.css'; // Reuse the same styling as NowPlaying

const Favorites = ({ likedMovies, watchedMovies, allMovies, onLikeChange, onWatchedChange }) => {
  // Filter movies based on liked status
  const getFavoriteMovies = () => {
    if (!allMovies || !likedMovies) return [];
    return allMovies.filter(movie => likedMovies[movie.id]);
  };

  const favoriteMovies = getFavoriteMovies();

  return (
    <div className="container">
      <div className="movie-list">
        <h2>My Favorite Movies</h2>
        {favoriteMovies.length > 0 ? (
          <div className="movie-list-grid">
            {favoriteMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                img={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                title={movie.title}
                rating={movie.vote_average}
                liked={likedMovies[movie.id] || false}
                onLikeChange={(isLiked) => onLikeChange(movie.id, isLiked)}
                watched={watchedMovies[movie.id] || false}
                onWatchedChange={(isWatched) => onWatchedChange(movie.id, isWatched)}
                handleOpen={() => {}} // We can add modal functionality later if needed
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>You haven't added any favorite movies yet.</p>
            <p>Click the heart icon on any movie to add it to your favorites.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
