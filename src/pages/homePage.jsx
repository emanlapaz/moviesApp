import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";


import backgroundImage from "/src/images/pexels-dziana-hasanbekava-5480827.jpg";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    // Add the background image
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  heading: {
    marginBottom: "20px",
  },
  button: {
    marginTop: "10px",
    minWidth: "200px",
  },
};

const HomePage = () => {
  return (
    <>
      <Box sx={styles.container}>
        <Typography variant="h1" sx={styles.heading}>
          MO-Vision
        </Typography>
        <Typography variant="h3" sx={styles.heading}>
          Welcome to the Movie & TV Show Database!
        </Typography>
        <Typography variant="body1" align="center">
          Explore a vast collection of movies, TV shows, and casts from The Movie Database (TMDb).
        </Typography>
        <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
          <Link to="/movies">
            <Button variant="contained" color="primary" sx={styles.button}>
              Browse Movies
            </Button>
          </Link>
          <Link to="/tvShows">
            <Button variant="contained" color="primary" sx={styles.button}>
              Browse TV Shows
            </Button>
          </Link>
          <Link to="/casts">
            <Button variant="contained" color="primary" sx={styles.button}>
              Explore Casts
            </Button>
          </Link>
        </Stack>
      </Box>
    </>
  );
};

export default HomePage;
