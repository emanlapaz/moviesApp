import React, { useState, useEffect } from "react";
import Header from "../headerTvShowList";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TvShowList from "../tvShowList";
import { getTvShows } from "../../api/tmdb-api";

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

function TvShowListPageTemplate({ title, action }) {
  const [tvShows, setTvShows] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchTvShows();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const fetchTvShows = async () => {
    try {
      const data = await getTvShows(currentPage);
      setTvShows(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  const displayedTvShows = tvShows
    .filter((m) => {
      return m.name?.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      const genreId = Number(genreFilter);
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  return (
    <div style={styles.container}>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header
            title={title} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
        </Grid>
        <Grid item container spacing={5}>
          <TvShowList action={action} tvShows={displayedTvShows} />
        </Grid>
      </Grid>
      <Fab
        color="secondary" variant="extended" onClick={() => setDrawerOpen(true)} sx={styles.fab}>
        Filter
      </Fab>
      <Drawer
        anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <FilterCard onUserInput={handleChange} titleFilter={nameFilter} genreFilter={genreFilter}/>
      </Drawer>
    </div>
  );
}

export default TvShowListPageTemplate;
