import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { useQuery } from "react-query";
import { getMovieCredits, getSimilarMovie } from "../../api/tmdb-api"; // Import getSimilarMovie
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  fab: {
    position: "fixed",
    top: 50,
    right: 2,
  },
  card: {
    width: "200px",
    height: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  cardImage: {
    height: "70%",
    objectFit: "cover",
  },
  cardContent: {
    padding: "10px",
  },
  characterName: {
    fontSize: "14px",
    color: "#555",
  },
  actorLink: {
    textDecoration: "none",
    color: "#000",
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
};

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data, isLoading, isError, error } = useQuery(
    ["movieCredits", { id: movie.id }],
    getMovieCredits
  );

  const { data: similarData, isLoading: isSimilarLoading, isError: isSimilarError, error: similarError } = useQuery(
    ["similarMovies", { id: movie.id }],
    getSimilarMovie
  );

  if (isLoading || isSimilarLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isSimilarError) {
    return <div>Error: {error.message || similarError.message}</div>;
  }

  const credits = data.cast || [];
  const similarMovies = similarData.results || [];

  return (
    <>
    <Paper>
    <Typography variant="h4" component="h3">
        Overview
      </Typography>
      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>
    </Paper>
 <br/>
      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
                <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <br/>
      <Paper>
        <Typography variant="h4" component="p">
          Casts:
        </Typography>
        <Grid container spacing={2}>
          {credits.map((cast) => (
            <Grid item key={cast.id} xs={6} sm={4} md={3} lg={2}>
              <Card style={styles.card}>
                <CardMedia
                  component={Link}
                  to={`/casts/${cast.id}`}
                  style={styles.cardImage}
                  image={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w185/${cast.profile_path}`
                      : "https://via.placeholder.com/150x300"
                  }
                  alt={cast.name}
                />
                <div style={styles.cardContent}>
                  {cast.name}
                  <p style={styles.characterName}>Character: {cast.character}</p>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <br/>
      <Paper>
        <Typography variant="h4" component="p">
          Similar Movies:
        </Typography>
        <Grid container spacing={2}>
          {similarMovies.map((similarMovie) => (
            <Grid item key={similarMovie.id} xs={6} sm={4} md={3} lg={2}>
              <Card style={styles.card}>
                <CardMedia
                  component={Link}
                  to={`/movies/${similarMovie.id}`}
                  style={styles.cardImage}
                  image={
                    similarMovie.poster_path
                      ? `https://image.tmdb.org/t/p/w185/${similarMovie.poster_path}`
                      : "https://via.placeholder.com/150x300"
                  }
                  alt={similarMovie.title}
                />
                <div style={styles.cardContent}>
                  {similarMovie.title}
                  <p style={styles.characterName}>Release Date: {similarMovie.release_date}</p>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
  
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
