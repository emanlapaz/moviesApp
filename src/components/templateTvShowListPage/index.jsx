import React, { useState, useEffect } from "react";
import Header from "../headerTvShowList";
import FilterTvShowsCard from "../filterTvShowCard";
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
  const [sortFilter, setSortFilter] = useState("popularity.desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchTvShows();
  }, [currentPage, sortFilter]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const fetchTvShows = async () => {
    try {
      const data = await getTvShows(currentPage, sortFilter);
      const sortedTvShows = sortTvShows(data.results, sortFilter);
      setTvShows(sortedTvShows);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(error.message);
    }
  };

  const sortTvShows = (tvShows, sortFilter) => {
    return [...tvShows].sort((a, b) => {
      if (sortFilter === "popularity.desc") {
        return b.popularity - a.popularity;
      } else if (sortFilter === "popularity.asc") {
        return a.popularity - b.popularity;
      }
      return 0;
    });
  };

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "sort") setSortFilter(value);
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
        <FilterTvShowsCard onUserInput={handleChange} titleFilter={nameFilter} genreFilter={genreFilter} sortFilter={sortFilter} />
      </Drawer>
    </div>
  );
}

export default TvShowListPageTemplate;
