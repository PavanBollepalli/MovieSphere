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
  const[MovieList,setMovieList]=useState('');
  const fetchMovies=async ()=>{
    try {
      const response=await fetch(API_BASE_URL,API_OPTIONS)
      if(!response.ok){
        throw new Error("Failed to fetch movies")
      }
      const data=await response.json()
      if(data.Response ==='False'){
        setErrorMessage(data.error||"Failed to fetch movies");
        setMovieList([]);
        return;
      }
    } catch (error) {
      setErrorMessage(`Error while fetching movies${error}`);
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
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
        <h1 className="text-white">{searchTerm}</h1>
      </div>
    </main>
  )
}
export default App