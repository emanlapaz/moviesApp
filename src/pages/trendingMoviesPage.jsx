import React from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddMovieToFavouritesIcon from "../components/cardIcons/addMovieToFavourites";
import PageTemplate from "../components/templateMovieListPage";

const MovieListPage = ({ moviesData, moviesError, moviesLoading }) => {
  if (moviesLoading) {
    return <Spinner />;
  }
  if (moviesError) {
    return <h1>{moviesError.message}</h1>;
  }

  const movies = moviesData ? moviesData.results : [];

  return (
    <div
      style={{
        backgroundImage: 'url("/src/images/pexels-dziana-hasanbekava-5480827.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <PageTemplate
        title="Trending Movies this week!"
        movies={movies}
        action={(item) => {
          return <AddMovieToFavouritesIcon item={item} />;
        }}
      />
    </div>
  );
};

export default MovieListPage;
