import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
  },
};

const Header = (props) => {
  const { title, currentPage, totalPages, handlePageChange } = props;

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="previous page" onClick={() => handlePageChange(currentPage - 1)}>
        <KeyboardArrowLeftIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {title}
      </Typography>

      <IconButton aria-label="next page" onClick={() => handlePageChange(currentPage + 1)}>
        <KeyboardArrowRightIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;
