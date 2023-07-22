import React, { useContext } from "react";
import { TvShowsContext } from "../../contexts/tvShowsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";


const AddTvShowToFavouritesIcon = ({ tvShow }) => {
  const context = useContext(TvShowsContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addTvShowToFavourites(tvShow);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddTvShowToFavouritesIcon;

// added addTvShowToFavourites.jsx