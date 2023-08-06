import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    marginRight: "10px",
  },
};

const CastHeader = (props) => {
  const cast = props.cast;

  return (
    <Paper component="div" sx={styles.root}>
        <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">        
          {cast.name}{"   "}
          <Avatar
          alt={cast.name}
          src={
            cast.profile_path
              ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
              : "https://via.placeholder.com/150x150"
          }
          sx={styles.avatar}
        />
        <br />
        <span>{`${cast.known_for_department}`} </span>
      </Typography>
      <Typography variant="body1" component="p">
        Popularity: {cast.popularity}
      </Typography>
        </Paper>
  );
};

export default CastHeader;
