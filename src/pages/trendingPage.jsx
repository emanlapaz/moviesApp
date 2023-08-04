import React from "react";
import { useQuery } from "react-query";
import { getTrendingMovies, getTrendingTvShows } from "../api/tmdb-api";
import MovieListPage from "../pages/trendingMoviesPage";
import TvShowListPage from "../pages/trendingTvShowsPage";

const TrendingMoviePage = () => {
  const { data: moviesData, error: moviesError, isLoading: moviesLoading } = useQuery("trending movies", getTrendingMovies);
  const { data: tvShowsData, error: tvShowsError, isLoading: tvShowsLoading } = useQuery("trending tv shows", getTrendingTvShows);

  return (
    <>
      <MovieListPage moviesData={moviesData} moviesError={moviesError} moviesLoading={moviesLoading} />
      <TvShowListPage tvShowsData={tvShowsData} tvShowsError={tvShowsError} tvShowsLoading={tvShowsLoading} />
    </>
  );
};

export default TrendingMoviePage;
