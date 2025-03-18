import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const MovieBio = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { movie_id } = useParams();

  const BASE_URL = `https://api.themoviedb.org/3/movie/${movie_id}`;
  const API_KEY = import.meta.env.VITE_TMDB_API;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const movieData = async () => {
    try {
      const response = await fetch(BASE_URL, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    movieData();
  }, [movie_id]);

  if (loading) return <div>Loading...</div>;
  if (!movieDetails) return <div>No movie details available</div>;

  return (
    <div className="font-sans m-2 p-4 text-white movie-card shadow-md shadow-white font-mono font-extrabold ">
      {/* for the movie bio card which appears on the left side */}

      <h2 className="text-violet-200">{movieDetails.title}</h2>
      <section className="flex justify-between">
        <div className="w-1/2">
          <div className="flex items-start gap-2">
            <p>
              {movieDetails.release_date
                ? movieDetails.release_date.split("-")[0]
                : "N/A"}
            </p>
            <p>·</p>
            <p>{movieDetails.original_language}</p>
          </div>
          <div>
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                  : "/no-movie.png"
              }
              alt="movie-poster"
              className="w-170 h-170 rounded-md mt-4"
            />
          </div>
        </div>
        {/* for rendering the movie details on the other half of the webpage */}
        <div className="w-1/2 m-8 ">
          <h3 className="text-violet-300">Overview</h3>
          <p className="">{movieDetails.overview}</p>
          <div className="flex items-center gap-2">
            <p>Rating:</p>
            <p>{movieDetails.vote_average.toFixed(1)}</p>
          </div>
          <div className="w-10 h-10 flex gap-2 bg-gray-800 rounded-md p-2">
            <img src="../star.svg" alt="rating" />
            <p>{movieDetails.vote_average.toFixed(1)}/10</p>
          </div>
          <div></div>
        </div>
      </section>
      <section></section>
      <section></section>
    </div>
  );
};

export default MovieBio;
