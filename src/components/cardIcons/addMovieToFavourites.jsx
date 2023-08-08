import React, { useContext } from "react";
import { Context } from "../../contexts/Context";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";


const AddMovieToFavouritesIcon = ({ movie }) => {
  const context = useContext(Context);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addMovieToFavourites(movie);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddMovieToFavouritesIcon;

