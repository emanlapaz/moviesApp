import React from "react";
import { useState, useEffect } from "react";
import { getMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddMovieToFavouritesIcon from "../components/cardIcons/addMovieToFavourites";
import PageTemplate from "../components/templateMovieListPage";

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
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddMovieToFavouritesIcon movie={movie} />;
        }}
      />
  );
};

export default MoviePage;
