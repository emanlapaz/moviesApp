import React, { useContext } from "react";
import TvShowListPageTemplate from "../components/templateTvShowListPage";
import { Context } from "../contexts/Context";
import { useQueries } from "react-query";
import { getTvShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveTvShowFromFavourites from "../components/cardIcons/removeTvShowFromFavourites";
import WriteTvShowReview from "../components/cardIcons/writeTvShowReview";

const FavouriteTvShowsPage = (props) => {
  const { tvShowFavourites: tvShowIds } = useContext(Context);

  // Create an array of queries and run them in parallel.
  const favouriteTvShowQueries = useQueries(
    tvShowIds.map((tvShowId) => {
      return {
        queryKey: ["tvShow", { id: tvShowId }],
        queryFn: getTvShow,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTvShowQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const tvShows = favouriteTvShowQueries.map((q) => q.data);

  return (
    <TvShowListPageTemplate
    title="Favourite Tv Shows"
    tvShows={tvShows}
    action={(tvShow) => {
      return (
        <>
          <RemoveTvShowFromFavourites tvShow={tvShow} />
          <WriteTvShowReview tvShow={tvShow} />
        </>
      );
    }}
  />

  );
};

export default FavouriteTvShowsPage;


// favourite TV show page