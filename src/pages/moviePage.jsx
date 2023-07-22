import React, { useState, useEffect } from "react";
import MovieListPageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddMovieToFavouritesIcon from '../components/cardIcons/addMovieToFavourites'

const MoviePage = (props) => {
  const { data, error, isLoading, isError } = useQuery("discover", getMovies);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  return (
    <MovieListPageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddMovieToFavouritesIcon movie={movie} />
      }}
    />
  );
};
export default MoviePage;