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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );

  if (!movieDetails)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <h2 className="text-2xl font-bold mb-4">No movie details available</h2>
        <Link
          to="/"
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </Link>
      </div>
    );

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="font-sans max-w-6xl mx-auto p-6 text-white">
      <Link
        to="/"
        className="flex items-center text-violet-300 hover:text-violet-100 mb-6 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Movies
      </Link>

      <h1 className="text-4xl font-bold text-violet-200 mb-2">
        {movieDetails.title}
      </h1>

      {movieDetails.tagline && (
        <p className="text-lg text-gray-400 italic mb-6">
          {movieDetails.tagline}
        </p>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Movie Poster */}
        <div className="md:w-1/3">
          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-violet-500/50 transition-shadow duration-300">
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                  : "/no-movie.png"
              }
              alt={`${movieDetails.title} poster`}
              className="w-full h-auto"
            />
          </div>

          {/* Rating Card */}
          <div className="mt-6 bg-gray-800 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-violet-300">
              Rating
            </h3>
            <div className="flex items-center">
              <div className="bg-violet-900 rounded-full p-3 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {movieDetails.vote_average.toFixed(1)}
                  <span className="text-sm text-gray-400">/10</span>
                </p>
                <p className="text-sm text-gray-400">
                  {movieDetails.vote_count.toLocaleString()} votes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Details */}
        <div className="md:w-2/3">
          <div className="bg-gray-800/60 rounded-lg p-6 shadow-lg mb-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="px-3 py-1 bg-violet-900/60 rounded-full text-sm">
                {movieDetails.release_date
                  ? movieDetails.release_date.split("-")[0]
                  : "N/A"}
              </div>
              {movieDetails.genres &&
                movieDetails.genres.map((genre) => (
                  <div
                    key={genre.id}
                    className="px-3 py-1 bg-violet-800/60 rounded-full text-sm"
                  >
                    {genre.name}
                  </div>
                ))}
              <div className="px-3 py-1 bg-violet-900/60 rounded-full text-sm">
                {formatRuntime(movieDetails.runtime)}
              </div>
              <div className="px-3 py-1 bg-violet-900/60 rounded-full text-sm uppercase">
                {movieDetails.original_language}
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-violet-300">
              Overview
            </h3>
            <p className="text-gray-200 leading-relaxed mb-6">
              {movieDetails.overview || "No overview available"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {movieDetails.production_companies &&
                movieDetails.production_companies.length > 0 && (
                  <div>
                    <h4 className="text-violet-300 font-semibold mb-1">
                      Studios
                    </h4>
                    <p>
                      {movieDetails.production_companies
                        .map((company) => company.name)
                        .join(", ")}
                    </p>
                  </div>
                )}

              {movieDetails.production_countries &&
                movieDetails.production_countries.length > 0 && (
                  <div>
                    <h4 className="text-violet-300 font-semibold mb-1">
                      Countries
                    </h4>
                    <p>
                      {movieDetails.production_countries
                        .map((country) => country.name)
                        .join(", ")}
                    </p>
                  </div>
                )}

              {movieDetails.budget > 0 && (
                <div>
                  <h4 className="text-violet-300 font-semibold mb-1">Budget</h4>
                  <p>${movieDetails.budget.toLocaleString()}</p>
                </div>
              )}

              {movieDetails.revenue > 0 && (
                <div>
                  <h4 className="text-violet-300 font-semibold mb-1">
                    Revenue
                  </h4>
                  <p>${movieDetails.revenue.toLocaleString()}</p>
                </div>
              )}

              {movieDetails.status && (
                <div>
                  <h4 className="text-violet-300 font-semibold mb-1">Status</h4>
                  <p>{movieDetails.status}</p>
                </div>
              )}
            </div>
          </div>

          {movieDetails.homepage && (
            <Link
              to="/"
              className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              Official Website
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieBio;
