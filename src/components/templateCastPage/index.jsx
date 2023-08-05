import React from "react";
import CastHeader from "../headerCast";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { getCastImages, getCombinedCredits } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 450,
    height: "100vh",
  },
  credits: {
    padding: "15px",
    backgroundColor: "#f0f0f0",
  },
  creditCard: {
    width: "150px",
    height: "300px",
    margin: "10px",
  },
  creditImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
};

const TemplateCastPage = ({ cast, children }) => {
  const { data: imagesData, error: imagesError, isLoading: imagesLoading, isError: imagesIsError } = useQuery(
    ["images", { id: cast.id }],
    getCastImages
  );

  const { data: creditsData, error: creditsError, isLoading: creditsLoading, isError: creditsIsError } = useQuery(
    ["credits", { id: cast.id }],
    getCombinedCredits
  );

  if (imagesLoading || creditsLoading) {
    return <Spinner />;
  }

  if (imagesIsError || creditsIsError) {
    return <h1>{imagesError?.message || creditsError?.message}</h1>;
  }

  // Check if data is available and images array exists
  const images = imagesData?.posters || [];
  const credits = creditsData?.cast || [];

  return (
    <>
      <CastHeader cast={cast} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={12} sm={9}>
          {children}
        </Grid>

        <Grid item xs={12} sm={3}>
          <div sx={styles.gridListRoot}>
            <ImageList cols={1}>
              {images.map((image) => (
                <ImageListItem key={image.file_path} sx={styles.gridListTile} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={image.poster_path}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={12} sx={styles.credits}>
          <h2>Credits:</h2>
          <Grid container spacing={2}>
            {credits.map((credit) => (
              <Grid item key={credit.id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={styles.creditCard}>
                  <CardMedia
                    sx={styles.creditImage}
                    image={
                      credit.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${credit.poster_path}`
                        : "https://via.placeholder.com/150x300"
                    }
                    alt={credit.title || credit.name}
                  />
                  <div style={{ padding: "10px" }}>
                    <p>{credit.title || credit.name}</p>
                    <p>Character: {credit.character}</p>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateCastPage;
