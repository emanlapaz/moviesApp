import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { Context } from "../contexts/Context";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveMovieFromFavourites from "../components/cardIcons/removeMovieFromFavourites";
import WriteMovieReview from "../components/cardIcons/writeMovieReview";

const FavouriteMoviesPage = (props) => {
  const { movieFavourites: movieIds } = useContext(Context);

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favouriteMovieQueries.map((q) => q.data);

  return (
    <PageTemplate
    title="Favourite Movies"
    movies={movies}
    action={(movie) => {
      return (
        <>
          <RemoveMovieFromFavourites movie={movie} />
          <WriteMovieReview movie={movie} />
        </>
      );
    }}
  />

  );
};

export default FavouriteMoviesPage;
