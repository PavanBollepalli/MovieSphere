import React, { useEffect, useState } from "react"
import Search from "./components/Search.jsx"
const API_BASE_URL='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const API_KEY= import.meta.env.VITE_TMDB_API
const API_OPTIONS={
  method:"GET",
  headers:{
    accept:"application/json",
    Authorization:`Bearer ${API_KEY}`
  }
}
const App=()=>{
  const [searchTerm,setSearchTerm]=useState('');
  const [errorMessage,setErrorMessage]=useState('');
  const [movieList,setMovieList]=useState([]);
  
  const fetchMovies=async ()=> {
    try {
      const response=await fetch(API_BASE_URL,API_OPTIONS)
      if(!response.ok){
        throw new Error("Failed to fetch movies")
      }
      
      const data=await response.json()
      
      if(data.results){
        setMovieList(data.results);
      } else {
        setErrorMessage("Failed to fetch movies");
        setMovieList([]);
      }
    } catch (error) {
      setErrorMessage(`Error while fetching movies: ${error.message}`);
    }
  }
  
  useEffect(()=>{
    fetchMovies()
  },[])
  
  return(
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> Without The Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className="all-movies">
          <h2>All Movies</h2>
          <ul>
            {movieList && movieList.length > 0 ? (
              movieList.map((movie) => (
                <li key={movie.id} className="movie-card">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                  />
                  <div className="content">
                    <h3>{movie.original_title}</h3>
                    <div className="rating">
                      <img src="/star.svg" alt="rating" />
                      <p>{movie.vote_average.toFixed(1)}</p>
                    </div>
                    <span className="year">{movie.release_date?.split('-')[0]}</span>
                  </div>
                </li>
              ))
            ) : (
              <p>No movies found</p>
            )}
          </ul>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
      </div>
    </main>
  )
}
export default App