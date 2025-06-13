import { useState } from 'react'
import './App.css'
import MovieList from './components/NowPlaying'
import Search from './components/Search'
import SideBar from './components/SideBar'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  // Lift state up to App level
  const [likedMovies, setLikedMovies] = useState({});
  const [watchedMovies, setWatchedMovies] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const hasLikedOrWatchedMovies = () => {
    return Object.values(likedMovies).some(isLiked => isLiked) ||
           Object.values(watchedMovies).some(isWatched => isWatched);
  };

  const showSidebar = hasLikedOrWatchedMovies();

  return (
    <div className={`App ${showSidebar ? 'with-sidebar' : ''}`}>
      <Header/>
      <div className="content-container">
        <Routes>
          <Route path="/search" element={
            <Search
              likedMovies={likedMovies}
              watchedMovies={watchedMovies}
              onLikeChange={handleLikeChange}
              onWatchedChange={handleWatchedChange}
              onAddMovie={addToAllMovies}
            />
          }/>
          <Route path="/" element={
            <MovieList
              likedMovies={likedMovies}
              watchedMovies={watchedMovies}
              onLikeChange={handleLikeChange}
              onWatchedChange={handleWatchedChange}
              onAddMovie={addToAllMovies}
            />
          }/>
        </Routes>
      </div>
      {showSidebar && (
        <>
          <SideBar
            likedMovies={likedMovies}
            watchedMovies={watchedMovies}
            allMovies={allMovies}
            className={sidebarOpen ? 'open' : ''}
          />
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? '×' : '☰'}
          </button>
        </>
      )}
      <Footer/>
    </div>
  )
}

export default App
