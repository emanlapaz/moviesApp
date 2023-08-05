import React from "react";
import { useState, useEffect } from "react";
import { getPopularCasts } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddCastToFavouritesIcon from "../components/cardIcons/addCastToFavourites";
import  CastListPageTemplate from "../components/templateCastListPage";

const PopularCastPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("popular people", getPopularCasts);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const casts = data ? data.results : [];

  return (

      <CastListPageTemplate
        title="Popular People"
        casts={casts}
        action={(cast) => {
          return <AddCastToFavouritesIcon cast={cast} />;
        }}
      />
    
  );
};

export default PopularCastPage;
