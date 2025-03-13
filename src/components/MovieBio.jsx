import React from "react";

export default function MovieBio({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) {
  console.log("Title:", title);
  console.log("Rating:", vote_average);
  console.log("Language:", original_language);
  console.log("Release Date:", release_date);
  console.log("Poster Path:", `https://image.tmdb.org/t/p/w500/${poster_path}`);
  return null;
}
