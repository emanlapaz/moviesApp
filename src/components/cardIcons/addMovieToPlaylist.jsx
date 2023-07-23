import React, { useContext } from "react";
import { Context } from "../../contexts/Context";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";


const AddMovieToPlaylistIcon = ({ movie }) => {
  const context = useContext(Context);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addMovieToPlaylists(movie);
  };
  return (
    <IconButton aria-label="add to playlist" onClick={onUserSelect}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddMovieToPlaylistIcon;
