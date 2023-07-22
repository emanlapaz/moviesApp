import React, { useState, useEffect } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  // State variables
  const [myMovieReviews, setMyMovieReviews] = useState({});
  const [movieFavourites, setMovieFavourites] = useState([]);
  const [moviePlaylists, setMoviePlaylists] = useState([]);
  // Side effect for logging favourites and playlists
  useEffect(() => {
    console.log("Favourite Movies:", movieFavourites);
    console.log("Movie Playlists:", moviePlaylists);
  }, [movieFavourites, moviePlaylists]);

  // Function to add a movie to favourites
  const addMovieToFavourites = (movie) => {
    let updatedMovieFavourites = [...movieFavourites];
    if (!movieFavourites.includes(movie.id)) {
      updatedMovieFavourites.push(movie.id);
    }
    setMovieFavourites(updatedMovieFavourites);
  };

  // Function to add a movie to playlists
  const addMovieToPlaylists = (movie) => {
    let updatedMoviePlaylists = [...moviePlaylists];
    if (!moviePlaylists.includes(movie.id)) {
      updatedMoviePlaylists.push(movie.id);
    }
    setMoviePlaylists(updatedMoviePlaylists);
  };

  // Function to remove a movie from favourites
  const removeMovieFromFavourites = (movie) => {
    setMovieFavourites(movieFavourites.filter((mId) => mId !== movie.id));
  };

  // Function to add a review for a movie
  const addMovieReview = (movie, movieReview) => {
    setMyMovieReviews({ ...myMovieReviews, [movie.id]: movieReview });
  };

  // Provide the context value to the child components
  return (
    <MoviesContext.Provider
      value={{
        movieFavourites,
        moviePlaylists,
        addMovieToFavourites,
        addMovieToPlaylists,
        removeMovieFromFavourites,
        addMovieReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
