import React, { useEffect } from 'react';
import './MovieCard.css';
import { useState } from 'react';


const MovieCard = ({img, title, rating, handleOpen, liked=false, watched = false, onLikeChange, onWatchedChange}) => {
    // function to add liked song to favorites
    const [isLiked, setIsLiked] = useState(liked);

    useEffect(() => {
        setIsLiked(liked);
    }, [liked]);

    const handleLike = (event) => {
        event.stopPropagation();
        setIsLiked(!isLiked);
        if (onLikeChange) {
            onLikeChange(!isLiked);
    };
    };

    //function to add watched song to watched list
    const [isWatched, setIsWatched] = useState(watched);

    useEffect(() => {
        setIsWatched(watched);
    }, [watched]);

    const handleWatched = (event) => {
        event.stopPropagation();
        setIsWatched(!isWatched);
        if (onWatchedChange) {
            onWatchedChange(!isWatched);
    }};


    return (
        <div className='moviecard' onClick={handleOpen}>
            <div className='imageholder'>
                <img src={img} alt='movie poster'/>
            </div>
            <div className='movieinfo'>
                <h3 style={{fontSize: title.length > 25? '0.9rem' : '1.2rem'}}>{title}</h3>
                <span>{rating}</span>
            </div>
            <div className='movieicons'>
                <img
                    src={isLiked ? "heart_red.png" : "heart.png"}
                    alt="like button"
                    className="like"
                    onClick={handleLike}
                />
                <button
                    onClick={handleWatched}
                    className={isWatched ? "watched-button active" : "watched-button"}
                >
                    {isWatched ? "Watched ✓" : "Mark as Watched"}
                </button>

            </div>
        </div>
    )
};

export default MovieCard;
