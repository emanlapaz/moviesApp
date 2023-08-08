import React, { useContext } from "react";
import PageTemplate from "../components/templateFavouriteMovie";
import { Context } from "../contexts/Context";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveMovieFromFavourites from "../components/cardIcons/removeMovieFromFavourites";
import WriteMovieReview from "../components/cardIcons/writeMovieReview";

const FavouriteMoviesPage = (props) => {
  const { movieFavourites: movieIds } = useContext(Context);


  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

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
