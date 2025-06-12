import { useState } from 'react'
import './App.css'
import MovieList from './components/NowPlaying'
import Search from './components/Search'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/search" element={<Search />}/>
        <Route path="/" element={<MovieList />}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
