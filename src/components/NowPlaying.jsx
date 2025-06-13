import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './NowPlaying.css'
import Modal from './Modal';

const NowPlaying = ({ likedMovies, watchedMovies, onLikeChange, onWatchedChange, onAddMovie, isSearching, searchQuery }) => {
    // State for now playing movies
    const [nowPlayingData, setNowPlayingData] = useState([]);
    // State for search results
    const [searchData, setSearchData] = useState([]);

    const [sortMethod, setSortMethod] = useState('none');
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    // Get the active data based on whether we're searching or not
    const data = isSearching ? searchData : nowPlayingData;

    const fetchMovies = async () => {
        if (isSearching) return; // Don't fetch now playing movies if we're searching

        setLoading(true);
        try {
            const apiKey = import.meta.env.VITE_API_KEY;
            const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNowPlayingData(prevData => [...prevData, ...data.results]);
            setHasMore(data.page < data.total_pages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Search function - now triggered by searchQuery prop change
    useEffect(() => {
        const performSearch = async () => {
            if (!searchQuery) return;

            setLoading(true);
            setError(null);
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                const formattedQuery = searchQuery.toLowerCase().replace(/ /g, "+");
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${formattedQuery}&api_key=${apiKey}&page=1`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setSearchData(data.results);
                setHasMore(data.page < data.total_pages);
                setPage(1);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (isSearching && searchQuery) {
            performSearch();
        }
    }, [searchQuery, isSearching]);

    const [genres, setGenres] = useState([]);
    useEffect (() => {
        const fetchGenres = async () => {
            const apiKey = import.meta.env.VITE_API_KEY;
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
            const data = await response.json();
            setGenres(data.genres);
        };
        fetchGenres();
    }, []);

    const getGenreNames = (genreIds) => {
        return genreIds.map(id => genres.find(genre => genre.id === id)?.name).filter(Boolean).join(', ');
    };

    useEffect(() => {
        if (!isSearching) {
            fetchMovies();
        }
    }, [page, isSearching]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };
    //modal for movie details
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const storeMovieData = async (movie) => {
        try {
            const apiKey = import.meta.env.VITE_API_KEY;

            // Fetch movie details to get runtime
            const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`);

            if (!detailsResponse.ok) {
                throw new Error('Failed to fetch movie details');
            }

            const movieDetails = await detailsResponse.json();
            const runtime = movieDetails.runtime;
            const backdropPath = movieDetails.backdrop_path;

            // Fetch movie videos to get the trailer
            const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`);

            if (!videosResponse.ok) {
                throw new Error('Failed to fetch movie trailer');
            }

            const videosData = await videosResponse.json();

            // Find the official trailer or use the first video
            let trailerKey = null;
            if (videosData.results && videosData.results.length > 0) {
                // Try to find an official trailer first
                const trailer = videosData.results.find(
                    video => video.type === 'Trailer' && video.site === 'YouTube' &&
                    (video.name.toLowerCase().includes('official') || video.name.toLowerCase().includes('trailer'))
                );

                // If no official trailer, use any trailer
                if (!trailer) {
                    const anyTrailer = videosData.results.find(
                        video => video.type === 'Trailer' && video.site === 'YouTube'
                    );

                    // If no trailer at all, use any YouTube video
                    if (!anyTrailer) {
                        const anyVideo = videosData.results.find(video => video.site === 'YouTube');
                        if (anyVideo) trailerKey = anyVideo.key;
                    } else {
                        trailerKey = anyTrailer.key;
                    }
                } else {
                    trailerKey = trailer.key;
                }
            }

            setSelectedMovie({
                title: movie.title,
                src: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
                backdropSrc: backdropPath ? `https://image.tmdb.org/t/p/original${backdropPath}` : null,
                rating: movie.vote_average,
                date: movie.release_date,
                overview: movie.overview,
                genre: movie.genre_ids,
                trailerKey: trailerKey,
                runtime: runtime
            });

            openModal();
        } catch (error) {
            console.error('Error fetching movie data:', error);
            // Still show the modal but without a trailer, runtime, and backdrop
            setSelectedMovie({
                title: movie.title,
                src: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
                backdropSrc: null,
                rating: movie.vote_average,
                date: movie.release_date,
                overview: movie.overview,
                genre: movie.genre_ids,
                trailerKey: null,
                runtime: null
            });
            openModal();
        }
    };

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

    const [filterGenre, setFilterGenre] = useState('all');
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
        const count = data.filter(movie => movie.genre_ids.includes(genre.id)).length;
        return { ...genre, count };
    });

    // Add fetched movies to allMovies in App component
    useEffect(() => {
        if (nowPlayingData.length > 0) {
            nowPlayingData.forEach(movie => {
                if (onAddMovie) {
                    onAddMovie(movie);
                }
            });
        }

        if (searchData.length > 0) {
            searchData.forEach(movie => {
                if (onAddMovie) {
                    onAddMovie(movie);
                }
            });
        }
    }, [nowPlayingData, searchData, onAddMovie]);
        return (
        <div className="container">
            <div className="movie-list">
                <h2>{isSearching ? 'Search Results' : 'Now Playing Movies'}</h2>
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
                                    {genre.name} ({genre.count})</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="movie-list-grid">
                    {filterMovies(sortMovies(data)).map((movie) => (
                        <MovieCard
                            key={movie.id}
                            img={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            title={movie.title}
                            rating={movie.vote_average}
                            liked={likedMovies[movie.id] || false}
                            onLikeChange={(isLiked) => onLikeChange(movie.id, isLiked)}
                            watched={watchedMovies[movie.id] || false}
                            onWatchedChange={(isWatched) => onWatchedChange(movie.id, isWatched)}
                            handleOpen={() => storeMovieData(movie)}
                        />
                    ))}
                </div>
                {loading && <p className="loading">Loading...</p>}
                {hasMore && !loading && (
                    <div className="load-more-container">
                        <button className="load-more-btn" onClick={loadMore} disabled={loading}>
                            Load More
                        </button>
                    </div>
                )}
                {!hasMore && !loading && <p className="no-more-movies">No more movies to load</p>}
                {error && <p className="error-message">Error: {error}</p>}
                {showModal && selectedMovie && (
                    <Modal
                        title={selectedMovie.title}
                        src={selectedMovie.src}
                        backdropSrc={selectedMovie.backdropSrc}
                        rating={selectedMovie.rating}
                        date={selectedMovie.date}
                        overview={selectedMovie.overview}
                        genre={getGenreNames(selectedMovie.genre)}
                        trailerKey={selectedMovie.trailerKey}
                        runtime={selectedMovie.runtime}
                        handleClose={closeModal}
                    />
                )}
            </div>
        </div>
    );
}

export default NowPlaying;
