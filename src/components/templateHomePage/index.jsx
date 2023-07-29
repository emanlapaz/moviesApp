import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
  },
  button: {
    marginTop: "10px",
  },
};

function HomePageTemplate({ title }) {
  return (
    <Box sx={styles.container}>
      <Typography variant="h3" sx={styles.heading}>
        {title}
      </Typography>
      <Typography variant="body1" align="center">
        Welcome to our plain home page!
      </Typography>
      <Link to="/movies">
        <Button variant="contained" color="primary" sx={styles.button}>
          Browse Movies
        </Button>
      </Link>
      <Link to="/tv-shows">
        <Button variant="contained" color="primary" sx={styles.button}>
          Browse TV Shows
        </Button>
      </Link>
      <Link to="/casts">
        <Button variant="contained" color="primary" sx={styles.button}>
          Explore Casts
        </Button>
      </Link>
    </Box>
  );
}

export default HomePageTemplate;
