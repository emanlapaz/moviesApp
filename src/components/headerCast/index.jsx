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
    width: "150px",
    height: "150px",
    marginRight: "10px",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", 
    textAlign: "center", 
  },
};

const CastHeader = (props) => {
  const { cast } = props;

  return (
    <Paper component="div" sx={styles.header}>
      <div style={styles.headerContent}>
        <Avatar
          alt={cast.name}
          src={
            cast.profile_path
              ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
              : "https://via.placeholder.com/150x150"
          }
          sx={styles.avatar}
        />

        <div>
          <Typography variant="h4" component="h3">
            {cast.name}
            <br />
            <span>{`${cast.known_for_department}`}</span>
          </Typography>
          <Typography variant="body1" component="p">
            Popularity: {cast.popularity}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default CastHeader;
