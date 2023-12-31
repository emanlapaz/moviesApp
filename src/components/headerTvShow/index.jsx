import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  heartIcon: {
    color: "red",
    marginRight: "8px",
  },
  officialWebsiteButton: {
    fontSize: "18px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "4px",
    textDecoration: "none",
    display: "inline-block",
    cursor: "pointer",
  },
};

const TvShowHeader = (props) => {
  const tvShow = props.tvShow;

  const tvShowFavorites = JSON.parse(localStorage.getItem("tvShowFavourites")) || [];
  
  const isFavorite = tvShowFavorites.some((tvShowFavorite) => tvShowFavorite.id === tvShow.id);

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {isFavorite && (
          <FavoriteIcon
            color="error"
            fontSize="large"
            sx={styles.heartIcon}
          />
        )}
        {tvShow.name}{"   "}
        <br />
        <span>{`${tvShow.tagline}`} </span>
        <br/>
        {tvShow.homepage && (
          <a href={tvShow.homepage}>
            <button style={styles.officialWebsiteButton}>Official Website</button>
          </a>
        )}
      </Typography>

      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default TvShowHeader;
