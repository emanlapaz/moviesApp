import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";

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
};

const CastDetails = ({ cast }) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // New

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>
  
      <Typography variant="h6" component="p">
        {cast.biography}
      </Typography>
  
      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Popularity" sx={styles.chipLabel} color="primary" />
        </li>
        <li>
          <Chip label={`Popularity: ${cast.popularity}`} />
        </li>
        <li>
          <Chip label={`Known for: ${cast.known_for_department}`} />
        </li>
      </Paper>
      {cast.credits && cast.credits.length > 0 && (
        <>
          <Typography variant="h6" component="p">
            Appearances in Movies/TV Shows:
          </Typography>
          <ul>
            {cast.credits.map((credit) => (
              <li key={credit.id}>
                <Link to={`/movies/${credit.id}`}>{credit.title || credit.name}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
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
      </Drawer>
    </>
  );
};

export default CastDetails;
