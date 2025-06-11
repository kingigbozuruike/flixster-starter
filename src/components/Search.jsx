import React, { useEffect } from "react";
import { useState } from "react";
import MovieCard from "./MovieCard";
import "./Search.css";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const api_key = import.meta.env.VITE_API_KEY;
    //call api for search results
    const searchResults = async (isNewSearch = false) => {
        setLoading(true);
        try {
            if (isNewSearch) {
                setPage(1);
                setData([]);
            }
            const query = searchQuery.toLowerCase().replace(/ /g, "+");
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${api_key}&page=${page}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setData(prevData => [...prevData, ...data.results]);
            setHasMore(data.page < data.total_pages);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (page > 1) {
            searchResults();
        }
    }, [page]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
    <div>
        <h1>Search</h1>
        <div className="search">
            <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" />
            <button onClick={searchResults}>Search</button>
            <div className="movie-list-grid">
                {data.map((movie) => (
                    <MovieCard img={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}  title={movie.title} rating={movie.vote_average} />
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {hasMore && !loading && <button onClick={loadMore} disabled={loading}>Load More</button>}
            {!hasMore && !loading && <p>No more movies to load</p>}
        </div>
    </div>
    );
};

export default Search;
