import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TvShowReviews from '../tvShowReviews'
import { getTvShowCredits, getSimilarTvShow } from "../../api/tmdb-api";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useQuery } from "react-query";

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

const TvShowDetails = ({ tvShow }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery(
    ["tvShowCredits", { id: tvShow.id }],
    getTvShowCredits
  );

  const { data: similarData, isLoading: isSimilarLoading, isError: isSimilarError, error: similarError } = useQuery(
    ["similarTvShows", { id: tvShow.id }],
    getSimilarTvShow
  );

  if (isLoading || isSimilarLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isSimilarError) {
    return <div>Error: {error.message || similarError.message}</div>;
  }

  const cast = data.cast || [];
  const similarTvShows = similarData.results || [];

  console.log("cast:", cast);
  console.log("similarTvShows:", similarTvShows);

  return (
    <>
      <Paper>
        <Typography variant="h4" component="h3">
          Overview
        </Typography>
        <Typography variant="h6" component="p">
          {tvShow.overview}
        </Typography>
      </Paper>
      <br />
      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {tvShow.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>
      <br />
      <Paper component="ul" sx={styles.chipSet}>
        <Chip icon={<AccessTimeIcon />} label={`${tvShow.number_of_episodes} episodes`} />
        <Chip icon={<AccessTimeIcon />} label={`${tvShow.number_of_seasons} seasons`} />
        <Chip
          icon={<StarRate />}
          label={`${tvShow.vote_average} (${tvShow.vote_count}`}
        />
        <Chip label={`Aired: ${tvShow.first_air_date}`} />
      </Paper>
      <br />
      <Paper>
        <Typography variant="h4" component="p">
          Casts:
        </Typography>
        <Grid container spacing={2}>
          {cast.map((castMember) => (
            <Grid item key={castMember.id} xs={6} sm={4} md={3} lg={2}>
              <Card style={styles.card}>
                <CardMedia
                  component={Link}
                  to={`/casts/${castMember.id}`}
                  style={styles.cardImage}
                  image={
                    castMember.profile_path
                      ? `https://image.tmdb.org/t/p/w185/${castMember.profile_path}`
                      : "https://via.placeholder.com/150x300"
                  }
                  alt={castMember.name}
                />
                <div style={styles.cardContent}>
                  {castMember.name}
                  <p style={styles.characterName}>Character: {castMember.character}</p>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <br />

      <Paper>
        <Typography variant="h4" component="p">
          Similar Tv Shows:
        </Typography>
        <Grid container spacing={2}>
          {similarTvShows.map((similarTvShow) => (
            <Grid item key={similarTvShow.id} xs={6} sm={4} md={3} lg={2}>
              <Card style={styles.card}>
                <CardMedia
                  component={Link}
                  to={`/tvShows/${similarTvShow.id}`}
                  style={styles.cardImage}
                  image={
                    similarTvShow.poster_path
                      ? `https://image.tmdb.org/t/p/w185/${similarTvShow.poster_path}`
                      : "https://via.placeholder.com/150x300"
                  }
                  alt={similarTvShow.title}
                />
                <div style={styles.cardContent}>
                  {similarTvShow.title}
                  <p style={styles.characterName}>First Aired Date: {similarTvShow.first_air_date}</p>
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
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <TvShowReviews tvShow={tvShow} />
      </Drawer>
    </>
  );
};

export default TvShowDetails;
