import { useState } from 'react'
import './App.css'
import MovieList from './components/NowPlaying'
import SideBar from './components/SideBar'
import Favorites from './components/Favorites'
import Watched from './components/Watched'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Banner from './components/Banner'

const App = () => {
  // Lift state up to App level
  const [likedMovies, setLikedMovies] = useState({});
  const [watchedMovies, setWatchedMovies] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handlers for liked and watched movies
  const handleLikeChange = (movieId, isLiked) => {
    setLikedMovies(prev => ({ ...prev, [movieId]: isLiked }));
  };

  const handleWatchedChange = (movieId, isWatched) => {
    setWatchedMovies(prev => ({ ...prev, [movieId]: isWatched }));
  };


  // Add movie to allMovies if it's not already there
  const addToAllMovies = (movie) => {
    setAllMovies(prev => {
      const exists = prev.some(m => m.id === movie.id);
      if (!exists) {
        return [...prev, movie];
      }
      return prev;
    });
  };


  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
  };

  const handleClear = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <div className="App">
      <Navbar
        onSearch={handleSearch}
        onClear={handleClear}
        onToggleSidebar={toggleSidebar}
      />
      <Banner />
      <div className="content-container">
        <Routes>
          <Route path="/" element={
            <MovieList
              likedMovies={likedMovies}
              watchedMovies={watchedMovies}
              onLikeChange={handleLikeChange}
              onWatchedChange={handleWatchedChange}
              onAddMovie={addToAllMovies}
              isSearching={isSearching}
              searchQuery={searchQuery}
            />
          }/>
          <Route path="/favorites" element={
            <Favorites
              likedMovies={likedMovies}
              watchedMovies={watchedMovies}
              allMovies={allMovies}
              onLikeChange={handleLikeChange}
              onWatchedChange={handleWatchedChange}
            />
          }/>
          <Route path="/watched" element={
            <Watched
              likedMovies={likedMovies}
              watchedMovies={watchedMovies}
              allMovies={allMovies}
              onLikeChange={handleLikeChange}
              onWatchedChange={handleWatchedChange}
            />
          }/>
        </Routes>
      </div>

      {/* Sidebar */}
      <SideBar
        likedMovies={likedMovies}
        watchedMovies={watchedMovies}
        className={sidebarOpen ? 'open' : ''}
        onClose={closeSidebar}
      />

      {/* Overlay when sidebar is open */}
      {sidebarOpen && (
        <div className="sidebar-overlay active" onClick={closeSidebar}></div>
      )}
      <Footer/>
    </div>
  )
}

export default App
