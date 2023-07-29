import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateTvShowListPage'
import { getOnTheAirTvShows } from "../api/tmdb-api";
// import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import AddTvShowToPlaylistIcon from '../components/cardIcons/addTvShowToPlaylist'
import { useQuery } from "react-query";
import Spinner from "../components/spinner";


const OnTheAirTvShowPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("onTheAir", getOnTheAirTvShows);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tvShows = data ? data.results : [];

  const tvShowPlaylists = tvShows.filter((m) => m.tvShowPlaylist);
  localStorage.setItem("tvShowPlaylists", JSON.stringify(tvShowPlaylists));
  const addTvShowToPlaylists = (tvShowId) => true;


  return (
    <PageTemplate
      title='On the Air Tv Shows' 
      tvShows={tvShows}
      selectTvShowFavourite={addTvShowToPlaylists}
      action={(tvShow) => {
        return <AddTvShowToPlaylistIcon tvShow={tvShow} />
      }}
    />
  );
};
export default OnTheAirTvShowPage;

//change pagetemplate