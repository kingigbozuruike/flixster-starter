import React from 'react';
import MovieCard from './MovieCard';
import './NowPlaying.css'; // Reuse the same styling as NowPlaying

const Watched = ({ likedMovies, watchedMovies, allMovies, onLikeChange, onWatchedChange }) => {
  // Filter movies based on watched status
  const getWatchedMovies = () => {
    if (!allMovies || !watchedMovies) return [];
    return allMovies.filter(movie => watchedMovies[movie.id]);
  };

  const watchedMoviesList = getWatchedMovies();

  return (
    <div className="container">
      <div className="movie-list">
        <h2>My Watched Movies</h2>
        {watchedMoviesList.length > 0 ? (
          <div className="movie-list-grid">
            {watchedMoviesList.map((movie) => (
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
            <p>You haven't marked any movies as watched yet.</p>
            <p>Click the "Mark as Watched" button on any movie to add it to your watched list.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watched;
