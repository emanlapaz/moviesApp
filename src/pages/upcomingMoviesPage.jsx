import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";
// import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'
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

  const playlists = movies.filter((m) => m.playlist);
  localStorage.setItem("playlists", JSON.stringify(playlists));
  const addToPlaylists = (movieId) => true;


  return (
    <PageTemplate
      title='Upcoming Movies' 
      movies={movies}
      selectFavourite={addToPlaylists}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
  );
};
export default UpcomingMoviesPage;