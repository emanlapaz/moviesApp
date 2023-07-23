import React, { useState, useEffect } from "react";

export const Context = React.createContext(null); //moviecontext to context

const ContextProvider = (props) => {
  // State variables movies
  const [myMovieReviews, setMyMovieReviews] = useState({});
  const [movieFavourites, setMovieFavourites] = useState([]);
  const [moviePlaylists, setMoviePlaylists] = useState([]);

  //tvshows
  const [myTvShowReviews, setMyTvShowReviews] = useState({});
  const [tvShowFavourites, setTvShowFavourites] = useState([]);
  const [tvShowPlaylists, setTvShowPlaylists] = useState([]);

  // Side effect for logging favourites and playlists
  useEffect(() => {
    console.log("Favourite Movies:", movieFavourites);
    console.log("Movie Playlists:", moviePlaylists);
  }, [movieFavourites, moviePlaylists]);

    // Side effect for logging favourites and playlists
    useEffect(() => {
      console.log("Tv Show Favourites:", tvShowFavourites);
      console.log("TV Show Playlists:", tvShowPlaylists);
    }, [tvShowFavourites, tvShowPlaylists]);

  // Function to add a movie to favourites
  const addMovieToFavourites = (movie) => {
    let updatedMovieFavourites = [...movieFavourites];
    if (!movieFavourites.includes(movie.id)) {
      updatedMovieFavourites.push(movie.id);
    }
    setMovieFavourites(updatedMovieFavourites);
  };

  const addTvShowToFavourites = (tvShow) => {
    let updatedTvShowFavourites = [...tvShowFavourites];
    if (!tvShowFavourites.includes(tvShow.id)) {
      updatedTvShowFavourites.push(tvShow.id);
    }
    setTvShowFavourites(updatedTvShowFavourites);
  };

  // Function to add a movie to playlists
  const addMovieToPlaylists = (movie) => {
    let updatedMoviePlaylists = [...moviePlaylists];
    if (!moviePlaylists.includes(movie.id)) {
      updatedMoviePlaylists.push(movie.id);
    }
    setMoviePlaylists(updatedMoviePlaylists);
  };

  const addTvShowToPlaylists = (tvShow) => {
    let updatedTvShowPlaylists = [...tvShowPlaylists];
    if (!tvShowPlaylists.includes(tvShow.id)) {
      updatedTvShowPlaylists.push(tvShow.id);
    }
    setTvShowPlaylists(updatedTvShowPlaylists);
  };

  // Function to remove a movie from favourites
  const removeMovieFromFavourites = (movie) => {
    setMovieFavourites(movieFavourites.filter((mId) => mId !== movie.id));
  };

  const removeTvShowFromFavourites = (tvShow) => {
    setTvShowFavourites(tvShowFavourites.filter((mId) => mId !== tvShow.id));  // what is mId?
  };

  // Function to add a review for a movie
  const addMovieReview = (movie, movieReview) => {
    setMyMovieReviews({ ...myMovieReviews, [movie.id]: movieReview });
  };

  const addTvShowReview = (tvShow, tvShowReview) => {
    setMyTvShowReviews({ ...myTvShowReviews, [tvShow.id]: tvShowReview });
  };

  // Provide the context value to the child components
  return (
    <Context.Provider
      value={{
        movieFavourites,
        moviePlaylists,
        //
        tvShowFavourites,
        tvShowPlaylists,
        //
        addMovieToFavourites,
        addMovieToPlaylists,
        removeMovieFromFavourites,
        addMovieReview,
       //
        addTvShowToFavourites,
        addTvShowToPlaylists,
        removeTvShowFromFavourites,
        addTvShowReview,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;



//merged TV and Movies Context