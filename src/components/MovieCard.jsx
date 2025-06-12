import React, { useEffect } from 'react';
import './MovieCard.css';
import { useState } from 'react';
import { use } from 'react';


const MovieCard = ({img, title, rating, handleOpen, liked=false, onLikeChange}) => {
    // function to add liked song to favorites
    const [isLiked, setIsLiked] = useState(liked);

    const heart = document.querySelector('.like');
    const button = document.querySelector('.movieicons button');

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
                <button>Watched</button>
            </div>
        </div>
    )
};

export default MovieCard;
