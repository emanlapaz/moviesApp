import React from "react";
import { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddMovieToFavouritesIcon from "../components/cardIcons/addMovieToFavourites";

const MoviePage = (props) => {
  const { data, error, isLoading, isError } = useQuery("discover movies", getMovies);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  return (
    <div
      style={{
        backgroundImage: 'url("/src/images/pexels-dziana-hasanbekava-5480827.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddMovieToFavouritesIcon movie={movie} />;
        }}
      />
    </div>
  );
};

export default MoviePage;
