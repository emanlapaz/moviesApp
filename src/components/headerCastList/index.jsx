import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
  },
};

const Header = ({ title, currentPage, totalPages, handlePageChange }) => {
  const goToPreviousPage = () => {
    handlePageChange(currentPage - 1);
  };

  const goToNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="previous page" onClick={goToPreviousPage}>
        <KeyboardArrowLeftIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {title}
      </Typography>
      <IconButton aria-label="next page" onClick={goToNextPage}>
        <KeyboardArrowRightIcon color="primary" fontSize="large" />
      </IconButton>
      <Grid item xs={12}>
          <Typography variant="body1" align="center">
            Page {currentPage} of {totalPages}
          </Typography>
        </Grid>
    </Paper>
  );
};

export default Header;
