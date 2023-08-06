import React from "react";
import { Link } from "react-router-dom";
import CastHeader from "../headerCast";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { getCastImages, getPersonMovie, getPersonTvShow } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    padding: "15px",
  },
  gridList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "5px", // Reduce the gap between credit cards
  },
  creditCard: {
    width: "200px",
    height: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  creditImage: {
    height: "70%",
    objectFit: "cover",
  },
  creditInfo: {
    padding: "10px",
  },
  creditTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  creditCharacter: {
    fontSize: "14px",
    color: "#555",
  },
};

const TemplateCastPage = ({ cast, children }) => {
  const { data: imagesData, error: imagesError, isLoading: imagesLoading, isError: imagesIsError } = useQuery(
    ["images", { id: cast.id }],
    getCastImages
  );

  const { data: creditsData, error: creditsError, isLoading: creditsLoading, isError: creditsIsError } = useQuery(
    ["credits", { id: cast.id }],
    getPersonMovie
  );

  const { data: tvCreditsData, error: tvCreditsError, isLoading: tvCreditsLoading, isError: tvCreditsIsError } = useQuery(
    ["tvCredits", { id: cast.id }],
    getPersonTvShow
  );

  if (imagesLoading || creditsLoading || tvCreditsLoading) {
    return <Spinner />;
  }

  if (imagesIsError || creditsIsError || tvCreditsIsError) {
    return <h1>{imagesError?.message || creditsError?.message || tvCreditsError?.message}</h1>;
  }

  const images = imagesData?.posters || [];
  const movieCredits = creditsData?.cast || [];
  const tvCredits = tvCreditsData?.cast || [];

  return (
    <div style={styles.root}>
      <CastHeader cast={cast} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={9}>
          <Typography variant="h5" component="h3">
            Overview
          </Typography>

          <Typography variant="h6" component="p">
            {cast.biography}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={3}>
          <div style={styles.gridList}>
            {images.map((image) => (
              <Card key={image.file_path} style={styles.creditCard}>
                <CardMedia
                  style={styles.creditImage}
                  image={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                  alt={image.poster_path}
                />
              </Card>
            ))}
          </div>
        </Grid>

        <Grid item xs={12}>
          <h2>Movie Appearances:</h2>
          <Grid container spacing={2}>
            {movieCredits.map((credit) => (
            <Grid item key={`movie_${credit.id}`} xs={6} sm={4} md={3} lg={2}>
                <Link to={`/movies/${credit.id}`}>
                  <Card style={styles.creditCard}>
                    <CardMedia
                      style={styles.creditImage}
                      image={
                        credit.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${credit.poster_path}`
                          : "https://via.placeholder.com/150x300"
                      }
                      alt={credit.title || credit.name}
                    />
                    <div style={styles.creditInfo}>
                      <p style={styles.creditTitle}>{credit.title || credit.name}</p>
                      <p style={styles.creditCharacter}>Character: {credit.character}</p>
                    </div>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <h2>Tv Show Appearances:</h2>
          <Grid container spacing={2}>
            {tvCredits.map((credit) => (
              <Grid item key={credit.id} xs={6} sm={4} md={3} lg={2}>
                <Link to={`/tvshows/${credit.id}`}>
                  <Card style={styles.creditCard}>
                    <CardMedia
                      style={styles.creditImage}
                      image={
                        credit.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${credit.poster_path}`
                          : "https://via.placeholder.com/150x300"
                      }
                      alt={credit.title || credit.name}
                    />
                    <div style={styles.creditInfo}>
                      <p style={styles.creditTitle}>{credit.title || credit.name}</p>
                      <p style={styles.creditCharacter}>Character: {credit.character}</p>
                    </div>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TemplateCastPage;
