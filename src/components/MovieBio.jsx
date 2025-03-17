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
    <div className="font-sans m-2 p-4 text-white movie-card shadow-md shadow-white">
      <section className="flex items-center justify-between">
        <div>
          <h1>{movieDetails.title}</h1>
          <div className="flex items-start gap-2">
            <p>
              {movieDetails.release_date
                ? movieDetails.release_date.split("-")[0]
                : "N/A"}
            </p>
            <p>·</p>
            <p>{movieDetails.original_language}</p>
          </div>
        </div>
      </section>
      <section></section>
      <section></section>
    </div>
  );
};

export default MovieBio;
