import React, { useState } from "react";
import MovieBio from "./MovieBio";

const MovieCard = ({ movie }) => {
  const { title, vote_average, poster_path, release_date, original_language } =
    movie;
  const [showBio, setShowBio] = useState(false);

  return (
    <div onClick={() => setShowBio(!showBio)}>
      <p className="movie-card">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
        />
        <div className="mt-4">
          <h3>{title}</h3>
          <div className="rating">
            <img src="star.svg" alt="star" />
            <p>{vote_average ? vote_average.toFixed(1) : "NA"}</p>
            <span className="text-white">◦</span>
            <p className="lang">{original_language}</p>
            <span className="text-white">◦</span>
            <p className="year">
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>
          </div>
        </div>
        {showBio && <MovieBio movie={movie} />}
      </p>
    </div>
  );
};

export default MovieCard;
