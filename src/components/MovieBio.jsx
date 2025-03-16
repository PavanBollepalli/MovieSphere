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
    <div className="text-white m-4 font-mono movie-card">
      <h2>{movieDetails.title}</h2>

      <div className="flex text-white align-center justify-center ">
        {movieDetails.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="movie-poster  w-128 h-128"
          />
        )}

        <div className=" m-2 p-4 font-mono text-lg">
          {movieDetails.tagline && (
            <p className="tagline text-xl text-bold text-orange-200">
              Tag Line:
              {movieDetails.tagline}
            </p>
          )}
          <p className="overview">{movieDetails.overview}</p>

          <div className="meta">
            <p>
              <strong>Rating:</strong> {movieDetails.vote_average?.toFixed(1)}
              /10
            </p>
            <p>
              <strong>Release Date:</strong> {movieDetails.release_date}
            </p>
            {movieDetails.runtime && (
              <p>
                <strong>Runtime:</strong> {movieDetails.runtime} minutes
              </p>
            )}
            {movieDetails.genres && (
              <p>
                <strong>Genres:</strong>{" "}
                {movieDetails.genres.map((g) => g.name).join(", ")}
              </p>
            )}
            <Link
              to="/"
              className="p-1 mt-4 bg-violet-200 text-center text-violet-500"
            >
              <button>Go Back To Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBio;
