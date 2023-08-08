import React, { useContext } from "react";
import PageTemplate from "../components/templateFavouriteTvShows";
import { Context } from "../contexts/Context";
import { useQueries } from "react-query";
import { getTvShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveTvShowFromFavourites from "../components/cardIcons/removeTvShowFromFavourites";
import WriteTvShowReview from "../components/cardIcons/writeTvShowReview";

const FavouriteTvShowsPage = (props) => {
  const { tvShowFavourites: tvShowIds } = useContext(Context);


  const favouriteTvShowQueries = useQueries(
    tvShowIds.map((tvShowId) => {
      return {
        queryKey: ["tvShow", { id: tvShowId }],
        queryFn: getTvShow,
      };
    })
  );

  const isLoading = favouriteTvShowQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const tvShows = favouriteTvShowQueries.map((q) => q.data);

  return (
    <PageTemplate
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

