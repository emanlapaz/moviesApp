import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";
import AddMovieToPlaylistIcon from '../components/cardIcons/addMovieToPlaylist'
import { useQuery } from "react-query";
import Spinner from "../components/spinner";


const UpcomingMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("upcoming", getUpcomingMovies);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  const moviePlaylists = movies.filter((m) => m.moviePlaylist);
  localStorage.setItem("moviePlaylists", JSON.stringify(moviePlaylists));
  const addMovieToPlaylists = (movieId) => true;

  return (
    <PageTemplate
      title='Upcoming Movies' 
      movies={movies}
      selectMovieFavourite={addMovieToPlaylists}
      action={(movie) => {
        return <AddMovieToPlaylistIcon movie={movie} />
      }}
    />
  );
  
};
export default UpcomingMoviesPage;
