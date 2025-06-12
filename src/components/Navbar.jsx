import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Dojo Blog</h1>
      <div className="links">
        <button><Link to="/">Now Playing</Link></button>
        <button><Link to="/search">Search</Link></button>
      </div>
    </nav>
)};

export default Navbar;
