import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { use } from 'react';
import './MovieList.css'

const MovieList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
        console.log(data);
    }, []);
    return (
        <div className="movie-list">
            <h2>Movie List</h2>
            <div className="movie-list-grid">
                {data.map((movie) => (
                    <MovieCard img={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} title={movie.title} rating={movie.vote_average} />
                ))}
            </div>
        </div>
    );
}

export default MovieList;
