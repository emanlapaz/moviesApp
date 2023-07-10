import React, { useState, useEffect } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  // State variables
  const [myReviews, setMyReviews] = useState({});
  const [favourites, setFavourites] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  // Side effect for logging favourites and playlists
  useEffect(() => {
    console.log("Favourites:", favourites);
    console.log("Playlists:", playlists);
  }, [favourites, playlists]);

  // Function to add a movie to favourites
  const addToFavourites = (movie) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavourites(updatedFavourites);
  };

  // Function to add a movie to playlists
  const addToPlaylists = (movie) => {
    let updatedPlaylists = [...playlists];
    if (!playlists.includes(movie.id)) {
      updatedPlaylists.push(movie.id);
    }
    setPlaylists(updatedPlaylists);
  };

  // Function to remove a movie from favourites
  const removeFromFavourites = (movie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
  };

  // Function to add a review for a movie
  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  // Provide the context value to the child components
  return (
    <MoviesContext.Provider
      value={{
        favourites,
        playlists,
        addToFavourites,
        addToPlaylists,
        removeFromFavourites,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
