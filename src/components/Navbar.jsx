import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

const Navbar = ({ onSearch, onClear, onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    onClear();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="hamburger-menu" onClick={onToggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="navbar-brand">
          <Link to="/">
            <img src="movie.png" alt="" />
            <h1>Flixster</h1>
          </Link>
        </div>
      </div>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          placeholder="Search for movies..."
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
        <button className="clear-button" onClick={handleClear}>Clear</button>
      </div>
    </nav>
  );
};

export default Navbar;
