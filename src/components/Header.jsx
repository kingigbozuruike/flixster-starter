import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div className="header">
      <div className="header__logo-box">
        <Link to={"/"}>
            <img src="img/logo-white.png" alt="Logo" className="header__logo" />
            <h1>Flixster</h1>
        </Link>
      </div>
    </div>
)
};

export default Header;
