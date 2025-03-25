import React, { useEffect, useState, useCallback } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { updateSearchCount, getTrendingMovies } from "./appwrite.js";
import ChatIcon from "./components/ChatIcon.jsx";
import ChatBox from "./components/ChatBox.jsx";
import TestBox from "./components/TestBox.jsx";
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingMoviesError, setTrendingMoviesError] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Fix the useCallback to include isChatOpen in dependency array
  const toggleChat = useCallback(() => {
    console.log("Toggle chat called, current state:", isChatOpen);
    setIsChatOpen(!isChatOpen); // Use direct value instead of function form
  }, [isChatOpen]); // Add isChatOpen to dependencies

  // Add effect to track chat state changes
  useEffect(() => {
    console.log("Chat state is now:", isChatOpen);
  }, [isChatOpen]);

  const fetchMovies = async (query) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data.results);
      console.log(data.results);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      setErrorMessage(`Error while fetching movies: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (err) {
      setTrendingMoviesError("Failed to fetch trending movies");
    }
  };

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useDebounce(
    () => {
      fetchMovies(searchTerm);
    },
    2000,
    [searchTerm],
  );

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> Without The
            Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {(trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )) || <p className="text-red-500">{trendingMoviesError}</p>}

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Place chat components outside of other containers */}0 bg-black text-white p-2 z-[9999]">
      <ChatIcon onClick={toggleChat} />
      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />>
      <TestBox isOpen={isChatOpen} />
    </main>    {/* Place chat components outside of everything else */}
  );e="fixed z-[9999]">
};        <ChatIcon onClick={toggleChat} />


export default App;        {/* Force render with && instead of passing isOpen prop */}
        {isChatOpen && <ChatBox isOpen={true} onClose={() => setIsChatOpen(false)} />}
      </div>
    </main>
  );
};
export default App;
