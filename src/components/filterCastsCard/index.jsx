import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { getPopularCasts } from "../../api/tmdb-api"; // Update import here

const styles = {
  root: {
    maxWidth: 345,
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

export default function FilterCastsCard(props) {
  const { data, error, isLoading, isError } = useQuery("popular casts", getPopularCasts); // Use getPopularCasts here

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Handle user input and sorting logic
  const handleUserInput = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleSortChange = (e) => {
    handleUserInput(e, "sort", e.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort by Popularity
          </Typography>
          <FormControl sx={styles.formControl}>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={props.sortFilter}
              onChange={handleSortChange}
            >
              <MenuItem value="popularity.desc">Popularity (Descending)</MenuItem>
              <MenuItem value="popularity.asc">Popularity (Ascending)</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
}
