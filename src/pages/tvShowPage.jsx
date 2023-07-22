import React, { useState, useEffect } from "react";
import { getTvShows } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddTvShowToFavouritesIcon from '../components/cardIcons/addTvShowToFavourites'
import TvShowListPageTemplate from "../components/templateTvShowListPage";

const TvShowListPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("discover", getTvShows);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tvShows = data ? data.results : [];

  return (
    <TvShowListPageTemplate
      title="Discover TV shows"
      tvShows={tvShows}
      action={(tvShow) => { // change movie to tvShow ? Tv?
        return <AddTvShowToFavouritesIcon tvShow={tvShow} />
      }}
    />
  );
};
export default TvShowListPage;

// added TvShowPage