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
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("popularity.desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [currentPage, sortFilter]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const fetchMovies = async () => {
    try {
      const data = await getMovies(currentPage);
      const sortedMovies = sortMovies(data.results, sortFilter);
      setMovies(sortedMovies);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(error.message);
    }
  };


  const sortMovies = (movies, sortFilter) => {
    return [...movies].sort((a, b) => {
      if (sortFilter === "popularity.desc") {
        return b.popularity - a.popularity;
      } else if (sortFilter === "popularity.asc") {
        return a.popularity - b.popularity;
      } else if (sortFilter === "vote_average.desc") {
        return b.vote_average - a.vote_average;
      } else if (sortFilter === "vote_average.asc") {
        return a.vote_average - b.vote_average;
      } else if (sortFilter === "release_date.desc") {
        return new Date(b.release_date) - new Date(a.release_date);
      } else if (sortFilter === "release_date.asc") {
        return new Date(a.release_date) - new Date(b.release_date);
      }
      return 0;
    });
  };


  const handleChange = (type, value) => {
    if (type === "title") {
      setTitleFilter(value);
    } else if (type === "genre") {
      setGenreFilter(value);
    } else if (type === "releaseYear") {
      setReleaseYearFilter(value);
    } else if (type === "rating") {
      setRatingFilter(value);
    } else if (type === "sort") {
      setSortFilter(value);
    }
  };

  const displayedMovies = movies
    .filter((m) => {
      return m.title && m.title.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      const genreId = Number(genreFilter);
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return !releaseYearFilter || (m.release_date && m.release_date.includes(releaseYearFilter));
    })
    .filter((m) => {
      const rating = Number(ratingFilter);
      return !ratingFilter || (m.vote_average && m.vote_average >= rating);
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
        <FilterCard
          onUserInput={handleChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          releaseYearFilter={releaseYearFilter}
          ratingFilter={ratingFilter}
          sortFilter={sortFilter}
        />
      </Drawer>
    </div>
  );
}

export default MovieListPageTemplate;
