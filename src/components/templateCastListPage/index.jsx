import React, { useState, useEffect } from "react";
import Header from "../headerCastList";
import FilterCastsCard from "../filterCastsCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import CastList from "../castList";
import { getPopularCasts } from "../../api/tmdb-api";
import Typography from "@mui/material/Typography";

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

function CastListPageTemplate({ title, action }) {
  const [casts, setCasts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchCasts();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const fetchCasts = async () => {
    try {
      const data = await getPopularCasts(currentPage);
      setCasts(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(error.message);
    }
  };
  

  return (
    <div style={styles.container}>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={title} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </Grid>
        <Grid item container spacing={5}>
          <CastList casts={casts} action={action} />
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
      </Drawer>
    </div>
  );
}

export default CastListPageTemplate;
