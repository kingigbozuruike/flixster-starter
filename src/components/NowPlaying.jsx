import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './NowPlaying.css'
import Navbar from './Navbar';
import Modal from './Modal';

const NowPlaying = () => {
    const [data, setData] = useState([]);
    const [sortMethod, setSortMethod] = useState('none');
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const apiKey = import.meta.env.VITE_API_KEY;
            const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(prevData => [...prevData, ...data.results]);
            setHasMore(data.page < data.total_pages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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
        fetchMovies();
        console.log(page);
    }, [page]);

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

    const storeMovieData = (movie) => {
        setSelectedMovie ({
            title: movie.title,
            src: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
            rating: movie.vote_average,
            date: movie.release_date,
            overview: movie.overview,
            genre: movie.genre_ids, // Assuming genre_ids are numbers, you might need to map them to genre names
    });
    openModal();};

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

    return (
        <div className="container">
            <Navbar/>
            <div className="movie-list">
                <h2>Movie List</h2>
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
                        <MovieCard key={movie.id} img={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} title={movie.title} rating={movie.vote_average} handleOpen={() => storeMovieData(movie)}/>
                    ))}
                </div>
                {loading && <p>Loading...</p>}
                {hasMore && !loading && <button onClick={loadMore} disabled={loading}>Load More</button>}
                {!hasMore && !loading && <p>No more movies to load</p>}
                {error && <p className="error-message">Error: {error}</p>}
                {showModal && selectedMovie && (
                    <Modal
                    title={selectedMovie.title}
                    src={selectedMovie.src}
                    rating={selectedMovie.rating}
                    date={selectedMovie.date}
                    overview={selectedMovie.overview}
                    genre={getGenreNames(selectedMovie.genre)}
                    handleClose={closeModal}
                />)}
            </div>
        </div>
    );
}

export default NowPlaying;
