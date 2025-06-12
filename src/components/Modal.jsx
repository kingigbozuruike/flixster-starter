import React from "react";
import "./Modal.css";

const Modal = ({title, src, rating, date, overview, genre, handleClose}) => {
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
                <div className="modal-btns">
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    )
};

export default Modal;
