import React, { useState } from "react";
import Header from "../headerCastList";
import FilterCastsCard from "../filterCastsCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import CastCard from "../castCard";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundImage: 'url("/src/images/pexels-dziana-hasanbekava-5480827.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  root: {
    padding: "20px",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

function CastListPageTemplate({ casts, title }) {
  const [filteredCasts, setFilteredCasts] = useState(casts);
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFilterChange = (type, value) => {
    if (type === "title") {
      setTitleFilter(value);
    } else {
      setGenreFilter(value);
    }
    filterCasts(value);
  };

  const filterCasts = (genreId) => {
    const filteredCasts = casts.filter((cast) => {
      return (
        cast.name.toLowerCase().includes(titleFilter.toLowerCase()) &&
        (genreId === "0" || cast.gender === parseInt(genreId))
      );
    });
    setFilteredCasts(filteredCasts);
  };

  return (
    <div style={styles.container}>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
          {filteredCasts.map((cast) => (
            <Grid key={cast.id} item xs={12} sm={6} md={4} lg={3}>
              <CastCard cast={cast} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCastsCard onUserInput={handleFilterChange} />
      </Drawer>
    </div>
  );
}

export default CastListPageTemplate;
