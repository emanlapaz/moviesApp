import React, { useState, useEffect } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieList from "../movieList";
import { getMovies } from "../../api/tmdb-api";

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


function MovieListPageTemplate({ title, action }) {
  const [movies, setMovies] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const fetchMovies = async () => {
    try {
      const data = await getMovies(currentPage);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (type, value) => {
    if (type === "title") setTitleFilter(value);
    else setGenreFilter(value);
  };

  const displayedMovies = movies
    .filter((m) => {
      return m.title && m.title.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      const genreId = Number(genreFilter);
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  return (
    <div style={styles.container}>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={title} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </Grid>
        <Grid item container spacing={5}>
          <MovieList action={action} movies={displayedMovies} />
        </Grid>
      </Grid>
      <Fab color="secondary" variant="extended" onClick={() => setDrawerOpen(true)} sx={styles.fab}>
        Filter
      </Fab>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <FilterCard onUserInput={handleChange} titleFilter={titleFilter} genreFilter={genreFilter} />
      </Drawer>
    </div>
  );
}

export default MovieListPageTemplate;
