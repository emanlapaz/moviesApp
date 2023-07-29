import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddMovieToFavouritesIcon from '../components/cardIcons/addMovieToFavourites'
import { getTvShows } from "../api/tmdb-api";
import AddTvShowToFavouritesIcon from '../components/cardIcons/addTvShowToFavourites'

const HomePage = (props) => {
  const { data, error, isLoading, isError } = useQuery("discover movies", getMovies,"discover TV shows", getTvShows);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];
  const tvShows = data ? data.results : [];

  return (
    <PageTemplate
      title="Home"
      movies={movies}
      tvShows={tvShows}
      action={(movie) => {
        return <AddMovieToFavouritesIcon movie={movie} />
        
      }}

    />
  );
};
export default HomePage;

//mix movies and tv shows