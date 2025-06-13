import React from "react";
import "./Modal.css";

const Modal = ({title, src, rating, date, overview, genre, trailerKey, handleClose}) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-des">
                    <h1>{title}</h1>
                    <img src={src} alt="" className="modal-image"/>
                    <p>Rating: {rating}</p>
                    <p>Release Date: {date}</p>
                    <p>Overview: {overview}</p>
                    <p>Genres: {genre} </p>
                </div>
                <div className="youtube">
                    {trailerKey ? (
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="YouTube video player"
                            style={{border: 'none'}}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <p>No trailer available</p>
                    )}
                </div>
                <div className="modal-btns">
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    )
};

export default Modal;
