import React from 'react';
import './MovieCard.css';

const MovieCard = ({img, title, rating}) => {
    return (
        <div className='moviecard'>
            <div className='imageholder'>
                <img src={img} alt='movie poster'/>
            </div>
            <div className='movieinfo'>
                <h3 style={{fontSize: title.length > 25? '0.9rem' : '1.2rem'}}>{title}</h3>
                <span>{rating}</span>
            </div>
        </div>
    )
};

export default MovieCard;
