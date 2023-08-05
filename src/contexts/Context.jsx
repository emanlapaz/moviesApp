import React, { useState, useEffect } from "react";

export const Context = React.createContext(null); 

const ContextProvider = (props) => {

  const [myMovieReviews, setMyMovieReviews] = useState({});
  const [movieFavourites, setMovieFavourites] = useState([]);
  const [moviePlaylists, setMoviePlaylists] = useState([]);

  const [myTvShowReviews, setMyTvShowReviews] = useState({});
  const [tvShowFavourites, setTvShowFavourites] = useState([]);
  const [tvShowPlaylists, setTvShowPlaylists] = useState([]);

  const [myCastReviews, setMyCastReviews] = useState({});
  const [castFavourites, setCastFavourites] = useState([]);
  const [castPlaylists, setCastPlaylists] = useState([]);


  useEffect(() => {
    console.log("Favourite Movies:", movieFavourites);
    console.log("Movie Playlists:", moviePlaylists);
  }, [movieFavourites, moviePlaylists]);

   
    useEffect(() => {
      console.log("Tv Show Favourites:", tvShowFavourites);
      console.log("TV Show Playlists:", tvShowPlaylists);
    }, [tvShowFavourites, tvShowPlaylists]);

    useEffect(() => {
      console.log("Favourite Casts:", castFavourites);
      console.log("Cast Playlists:", castPlaylists);
    }, [castFavourites, castPlaylists]);


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

  const addCastToFavourites = (cast) => {
    let updatedCastFavourites = [...castFavourites];
    if (!castFavourites.includes(cast.id)) {
      updatedCastFavourites.push(cast.id);
    }
    setCastFavourites(updatedCastFavourites);
  };

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

  const addCastToPlaylists = (cast) => {
    let updatedCastPlaylists = [...castPlaylists];
    if (!castPlaylists.includes(cast.id)) {
      updatedCastPlaylists.push(cast.id);
    }
    setCastPlaylists(updatedCastPlaylists);
  };

  const removeMovieFromFavourites = (movie) => {
    setMovieFavourites(movieFavourites.filter((mId) => mId !== movie.id));
  };

  const removeTvShowFromFavourites = (tvShow) => {
    setTvShowFavourites(tvShowFavourites.filter((mId) => mId !== tvShow.id));  // what is mId?
  };

  const removeCastFromFavourites = (cast) => {
    setCastFavourites(castFavourites.filter((mId) => mId !== cast.id));
  };


  const addMovieReview = (movie, movieReview) => {
    setMyMovieReviews({ ...myMovieReviews, [movie.id]: movieReview });
  };

  const addTvShowReview = (tvShow, tvShowReview) => {
    setMyTvShowReviews({ ...myTvShowReviews, [tvShow.id]: tvShowReview });
  };

  const addCastReview = (cast, castReview) => {
    setMyCastReviews({ ...myCastReviews, [cast.id]: castReview });
  };


  return (
    <Context.Provider
      value={{
        movieFavourites,
        moviePlaylists,
        
        tvShowFavourites,
        tvShowPlaylists,
        
        castFavourites,
        castPlaylists,
        
        addMovieToFavourites,
        addMovieToPlaylists,
        removeMovieFromFavourites,
        addMovieReview,
       //
        addTvShowToFavourites,
        addTvShowToPlaylists,
        removeTvShowFromFavourites,
        addTvShowReview,

        addCastToFavourites,
        addCastToPlaylists,
        removeCastFromFavourites,
        addCastReview,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
