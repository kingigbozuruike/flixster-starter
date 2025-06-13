import React from "react";
import "./Modal.css";

const Modal = ({title, src, backdropSrc, rating, date, overview, genre, trailerKey, runtime, handleClose}) => {
    // Format runtime from minutes to hours and minutes
    const formatRuntime = (minutes) => {
        if (!minutes) return "Runtime not available";
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };
    return (
        <div className="modal">
            <div className="modal-content">
                {backdropSrc && (
                    <div className="modal-backdrop-container">
                        <img src={backdropSrc} alt="movie backdrop" className="modal-backdrop-image"/>
                        <div className="modal-backdrop-gradient"></div>
                    </div>
                )}

                <button className="modal-close-btn" onClick={handleClose}>×</button>

                <h1 className="modal-title">{title}</h1>

                <div className="modal-layout">
                    <div className="modal-left">
                        <img src={src} alt="" className="modal-image"/>
                    </div>

                    <div className="modal-right">
                        <div className="modal-info">
                            <p><strong>Rating:</strong> {rating}</p>
                            <p><strong>Release Date:</strong> {date}</p>
                            <p><strong>Runtime:</strong> {formatRuntime(runtime)}</p>
                            <p><strong>Genres:</strong> {genre}</p>
                            <p className="modal-overview"><strong>Overview:</strong> {overview}</p>
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
                    </div>
                </div>

            </div>
        </div>
    )
};

export default Modal;
