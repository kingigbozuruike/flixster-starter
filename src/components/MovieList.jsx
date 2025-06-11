import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { use } from 'react';
import './MovieList.css'

const MovieList = () => {
    const [data, setData] = useState([]);
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
    useEffect(() => {
        fetchMovies();
        console.log(page);
    }, [page]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="movie-list">
            <h2>Movie List</h2>
            <div className="movie-list-grid">
                {data.map((movie) => (
                    <MovieCard img={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} title={movie.title} rating={movie.vote_average} />
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {hasMore && !loading && <button onClick={loadMore} disabled={loading}>Load More</button>}
            {!hasMore && !loading && <p>No more movies to load</p>}
        </div>
    );
}

export default MovieList;
