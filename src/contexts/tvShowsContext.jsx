import React, { useState, useEffect } from "react";

export const TvShowsContext = React.createContext(null);

const TvShowsContextProvider = (props) => {

  const [myTvShowReviews, setMyTvShowReviews] = useState({});
  const [tvShowFavourites, setTvShowFavourites] = useState([]);
  const [tvShowPlaylists, setTvShowPlaylists] = useState([]);

  useEffect(() => {
    console.log("Tv Show Favourites:", tvShowFavourites);
    console.log("TV Show Playlists:", tvShowPlaylists);
  }, [tvShowFavourites, tvShowPlaylists]);


  const addTvShowToFavourites = (tvShow) => {
    let updatedTvShowFavourites = [...tvShowFavourites];
    if (!tvShowFavourites.includes(tvShow.id)) {
      updatedTvShowFavourites.push(tvShow.id);
    }
    setTvShowFavourites(updatedTvShowFavourites);
  };


  const addTvShowToPlaylists = (tvShow) => {
    let updatedTvShowPlaylists = [...tvShowPlaylists];
    if (!tvShowPlaylists.includes(tvShow.id)) {
      updatedTvShowPlaylists.push(tvShow.id);
    }
    setTvShowPlaylists(updatedTvShowPlaylists);
  };


  const removeTvShowFromFavourites = (tvShow) => {
    setTvShowFavourites(tvShowFavourites.filter((mId) => mId !== tvShow.id));  
  };


  const addTvShowReview = (tvShow, tvShowReview) => {
    setMyTvShowReviews({ ...myTvShowReviews, [tvShow.id]: tvShowReview });
  };

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
