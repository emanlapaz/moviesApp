import React from "react";
import { useQuery } from "react-query";
import { getTrendingMovies, getTrendingTvShows, getTrendingCasts } from "../api/tmdb-api";
import MovieListPage from "../pages/trendingMoviesPage";
import TvShowListPage from "../pages/trendingTvShowsPage";
import CastsListPage from "../pages/trendingCastPage";

const TrendingPage = () => {
  const { data: moviesData, error: moviesError, isLoading: moviesLoading } = useQuery("trending movies", getTrendingMovies);
  const { data: tvShowsData, error: tvShowsError, isLoading: tvShowsLoading } = useQuery("trending tv shows", getTrendingTvShows);
  const { data: castsData, error: castsError, isLoading: castsLoading } = useQuery("trending casts", getTrendingCasts);
  return (
    <>
      <MovieListPage moviesData={moviesData} moviesError={moviesError} moviesLoading={moviesLoading} />
      <TvShowListPage tvShowsData={tvShowsData} tvShowsError={tvShowsError} tvShowsLoading={tvShowsLoading} />
      <CastsListPage castsData={castsData} castsError={castsError} castsLoading={castsLoading} />
    </>
  );
};

export default TrendingPage;
