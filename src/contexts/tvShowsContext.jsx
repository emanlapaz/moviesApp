import React, { useState, useEffect } from "react";

export const TvShowsContext = React.createContext(null);

const TvShowsContextProvider = (props) => {
  // State variables
  const [myTvShowReviews, setMyTvShowReviews] = useState({});
  const [tvShowFavourites, setTvShowFavourites] = useState([]);
  const [tvShowPlaylists, setTvShowPlaylists] = useState([]);

  // Side effect for logging favourites and playlists
  useEffect(() => {
    console.log("Tv Show Favourites:", tvShowFavourites);
    console.log("TV Show Playlists:", tvShowPlaylists);
  }, [tvShowFavourites, tvShowPlaylists]);

  // Function to add a movie to favourites
  const addTvShowToFavourites = (tvShow) => {
    let updatedTvShowFavourites = [...tvShowFavourites];
    if (!tvShowFavourites.includes(tvShow.id)) {
      updatedTvShowFavourites.push(tvShow.id);
    }
    setTvShowFavourites(updatedTvShowFavourites);
  };

  // Function to add a tvShow to playlists
  const addTvShowToPlaylists = (tvShow) => {
    let updatedTvShowPlaylists = [...tvShowPlaylists];
    if (!tvShowPlaylists.includes(tvShow.id)) {
      updatedTvShowPlaylists.push(tvShow.id);
    }
    setTvShowPlaylists(updatedTvShowPlaylists);
  };

  // Function to remove a tvShowfrom favourites
  const removeTvShowFromFavourites = (tvShow) => {
    setTvShowFavourites(tvShowFavourites.filter((mId) => mId !== tvShow.id));  // what is mId?
  };

  // Function to add a review for a movie
  const addTvShowReview = (tvShow, tvShowReview) => {
    setMyTvShowReviews({ ...myTvShowReviews, [tvShow.id]: tvShowReview });
  };

  // Provide the context value to the child components
  return (
    <TvShowsContext.Provider
      value={{
        tvShowFavourites,
        tvShowPlaylists,
        addTvShowToFavourites,
        addTvShowToPlaylists,
        removeTvShowFromFavourites,
        addTvShowReview,
      }}
    >
      {props.children}
    </TvShowsContext.Provider>
  );
};

export default TvShowsContextProvider;

// addedtvShowContext- need to fix playlist and favourites for Tvshows
// edit this page. add tvshow to fav and playlists