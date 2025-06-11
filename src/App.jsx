import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import Search from './components/Search'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/search" element={<Search />}/>
        <Route path="/" element={<MovieList />}/>
      </Routes>
    </div>
  )
}

export default App
