import React, { useContext } from "react";
import { Context } from "../../contexts/Context";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";


const AddTvShowToPlaylistIcon = ({ tvShow }) => {
  const context = useContext(Context);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addTvShowToPlaylists(tvShow);
  };
  return (
    <IconButton aria-label="add Tv Show to playlist" onClick={onUserSelect}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddTvShowToPlaylistIcon;
