import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './NowPlaying.css'; // Reuse the same styling as NowPlaying

const Watched = ({ likedMovies, watchedMovies, allMovies, onLikeChange, onWatchedChange }) => {
  const [sortMethod, setSortMethod] = useState('none');
  const [filterGenre, setFilterGenre] = useState('all');
  const [genres, setGenres] = useState([]);

  // Filter movies based on watched status
  const getWatchedMovies = () => {
    if (!allMovies || !watchedMovies) return [];
    return allMovies.filter(movie => watchedMovies[movie.id]);
  };

  const watchedMoviesList = getWatchedMovies();

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
      const data = await response.json();
      setGenres(data.genres);
    };
    fetchGenres();
  }, []);

  // Sort movies function
  const sortMovies = (movies) => {
    if (!movies) return [];

    const sortedMovies = [...movies];

    switch (sortMethod) {
      case 'title':
        return sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
      case 'date':
        return sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      case 'rating':
        return sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
      default:
        return sortedMovies;
    }
  };

  // Filter movies function
  const filterMovies = (movies) => {
    if (filterGenre === 'all') {
      return movies;
    }

    // Convert filterGenre to number since genre IDs are numbers
    const genreId = Number(filterGenre);
    return movies.filter(movie => movie.genre_ids.includes(genreId));
  };

  // Calculate genre counts
  const genreCounts = genres.map(genre => {
    const count = watchedMoviesList.filter(movie => movie.genre_ids.includes(genre.id)).length;
    return { ...genre, count };
  }).filter(genre => genre.count > 0); // Only show genres that have movies

  return (
    <div className="container">
      <div className="movie-list">
        <h2>My Watched Movies</h2>
        {watchedMoviesList.length > 0 ? (
          <>
            <div className='sort-filter'>
              <div className="sort-container">
                <label htmlFor="sort-select">Sort by: </label>
                <select
                  id="sort-select"
                  value={sortMethod}
                  onChange={(e) => setSortMethod(e.target.value)}
                  className="sort-dropdown"
                >
                  <option value="none">Default</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="date">Release Date (newest first)</option>
                  <option value="rating">Rating (highest first)</option>
                </select>
              </div>
              {genreCounts.length > 1 && (
                <div className="filter-container">
                  <label htmlFor="filter-select">Filter by Genre: </label>
                  <select
                    id="filter-select"
                    value={filterGenre}
                    onChange={(e) => setFilterGenre(e.target.value)}
                    className="filter-dropdown"
                  >
                    <option value="all">All</option>
                    {genreCounts.map(genre => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name} ({genre.count})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="movie-list-grid">
              {filterMovies(sortMovies(watchedMoviesList)).map((movie) => (
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
          </>
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
