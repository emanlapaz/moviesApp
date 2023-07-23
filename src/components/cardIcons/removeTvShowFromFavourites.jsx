import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Context } from "../../contexts/Context";

const RemoveTvShowFromFavouritesIcon = ({ tvShow }) => {
  const context = useContext(Context);

  const onUserRequest = (e) => {
    e.preventDefault();
    context.removeTvShowFromFavourites(tvShow);
  };

return (
  <IconButton
    aria-label="remove from favorites"
    onClick={onUserRequest}
  >
    <DeleteIcon color="primary" fontSize="large" />
  </IconButton>
);
};

export default RemoveTvShowFromFavouritesIcon;
