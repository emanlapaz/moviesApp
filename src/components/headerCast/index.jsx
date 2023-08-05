import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

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

const CastHeader = ({ cast }) => {
  return (
    <Grid item xs={12}>
      <div style={styles.header}>
        <Avatar
          alt={cast.name}
          src={
            cast.profile_path
              ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
              : "https://via.placeholder.com/150x150"
          }
          sx={styles.avatar}
        />
        <Typography variant="h4" component="h3">
          {cast.name}
        </Typography>
      </div>
      <Typography variant="h6" component="p">
        {cast.known_for_department}
      </Typography>
      <Typography variant="body1" component="p">
        Popularity: {cast.popularity}
      </Typography>
    </Grid>
  );
};

export default CastHeader;
